from django.shortcuts import render

from rest_framework.permissions import AllowAny
from rest_framework import status
from rest_framework import viewsets
from rest_framework import generics
from rest_framework.response import Response

from store.pagination import LargeResultsSetPagination
from store.models import Product, ProductReview, Category
from .serializers import ProductSerializer, ProductRetrieveSerializer, ProductReviewSerializer, CategorySerializer
from rest_framework.permissions import IsAdminUser
from store.permissions import ProductReviewPermission
from rest_framework.decorators import action
from django.conf import settings

# Create your views here.
import cloudinary

class ProductViewAdmin(viewsets.ModelViewSet):
    permission_classes = [IsAdminUser]
    serializer_class = ProductSerializer
    queryset = Product.objects.all()

    @staticmethod
    def upload_file(file):
        try:
            upload_result = cloudinary.uploader.upload(file)
            result = {
                'avatar': upload_result['url'],
                'public_id_avatar': upload_result['public_id']
            }
            return result
        except:
            return False

    def create(self, request, *args, **kwargs):
        file = request.data.get('file')
        if not file:
            return Response('No file provided', status=status.HTTP_400_BAD_REQUEST)

        file_type = file.content_type.split('/')[0]

        if file_type not in ['image']:
            return Response('This file type is not supported', status=status.HTTP_400_BAD_REQUEST)

        result_upload = self.upload_file(file)
        if not result_upload:
           return Response('cannot create product', status=status.HTTP_400_BAD_REQUEST)

        request.data.update(result_upload)
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response('a product created', status=status.HTTP_201_CREATED)

    def update(self, request, *args, **kwargs):
        images = request.data.get('images')
        avatar = request.data.get('file')

        self.upload_file(self, request)
        return Response()

    def destroy(self, request, *args, **kwargs):
        product = self.get_object()

        #delete image in clodinary
        cloudinary.uploader.destroy(product.public_id_avatar, resource_type="image", type="upload")
        product.delete()
        return Response('delete success', status=status.HTTP_204_NO_CONTENT)

    @action(methods=['post'], detail=False)
    def create_category(self, request, *args, **kwargs):
        serializer = CategorySerializer(data=request.data)
        serializer.is_valid()
        serializer.save()
        return Response('create category success', status=status.HTTP_201_CREATED)

    @action(methods=['put'], detail=True)
    def delete_avatar(self, request, *args, **kwargs):
        product = self.get_object()
        cloudinary.uploader.destroy(product.public_id_avatar, resource_type="image", type="upload")
        product.public_id_avatar=""
        product.avatar=settings.DEFAULT_IMAGE_PRODUCT
        product.save()
        return Response('delete avatar success')


class ProductViewUser(viewsets.GenericViewSet, generics.ListAPIView, generics.RetrieveAPIView):
    permission_classes = [AllowAny]
    serializer_class = ProductSerializer
    queryset = Product.objects.all().order_by('id')
    pagination_class = LargeResultsSetPagination

    def retrieve(self, request, *args, **kwargs):
        product = self.get_object()
        serializer = ProductRetrieveSerializer(product)
        return Response(serializer.data)
    
    @action(methods=['get'], detail=False)
    def search_products(self, request, *args, **kwargs):
        search_key = request.query_params.get('key')
        if search_key:
            products = Product.objects.filter(name__icontains=search_key).order_by('id')
            queryset = self.filter_queryset(products)
            page = self.paginate_queryset(queryset)
            if page is not None:
                serializer = self.get_serializer(page, many=True)
                return self.get_paginated_response(serializer.data) 
            
            prduct_serializer = self.serializer_class(queryset, many=True)
            return Response(prduct_serializer.data)
        else:
            return Response("No query provided", status=status.HTTP_400_BAD_REQUEST)
   
    @action(methods=['get'], detail=False)
    def get_all_categories(self, request, *args, **kwargs):
        categories = Category.objects.all()
        serializer = CategorySerializer(categories, many=True)
        return Response(serializer.data)
        
class ProductReviewView(viewsets.GenericViewSet,generics.ListCreateAPIView, generics.DestroyAPIView, generics.UpdateAPIView):
    permission_classes = [ProductReviewPermission]
    serializer_class = ProductReviewSerializer
    queryset = ProductReview.objects.all()
    pagination_class = LargeResultsSetPagination
    
    def list(self, request, *args, **kwargs):
        reviews = ProductReview.objects.filter(product=int(request.query_params.get('product_id'))).order_by('created_time')
        queryset = self.filter_queryset(reviews)
        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data) 
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data)

    def create(self, request, *args, **kwargs):
        if ProductReview.objects.filter(user=request.user, product=request.data.get('product')):
            return Response("Cannot create new review",
                            status=status.HTTP_405_METHOD_NOT_ALLOWED)
        else:
            serializer = self.serializer_class(data=request.data)
            serializer.is_valid(raise_exception=True)
            serializer.save(user=request.user)
            return Response("a review created", status=status.HTTP_201_CREATED)

    @action(methods=['get'], detail=False)
    def get_my_review(self, request):
        product_id = int(request.query_params.get('product_id'))
        
        try:
            my_review = ProductReview.objects.get(user=request.user, product=product_id)
            serializer = self.serializer_class(my_review)
            return Response(serializer.data)
        except:
            return Response('you have not commendted on the product',status=status.HTTP_404_NOT_FOUND)
    
    @action(methods=['put'], detail=True, permission_classes=[AllowAny])
    def like_review(self, request, pk=None):
        review = self.get_object()
        review.like_count += 1
        review.save()
        return Response("You have liked on this product")

       