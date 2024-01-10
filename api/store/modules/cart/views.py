from rest_framework import status
from rest_framework import viewsets
from rest_framework.response import Response
from .serializers import CartItemSerializer, CartItemOverviewSerializer
from store.models import CartItem
from store.permissions import CartPermission
from rest_framework.decorators import action
from store.pagination import StandardResultsSetPagination

#commplete
class CartView(viewsets.ModelViewSet):
    permission_classes = [CartPermission]
    serializer_class = CartItemSerializer
    queryset = CartItem.objects.all()
    pagination_class = StandardResultsSetPagination

    def list(self, request, *args, **kwargs):
        items = CartItem.objects.filter(
            user=request.user.id
        ).order_by('id')

        queryset = self.filter_queryset(items)
        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data) 
            
        serializer = self.serializer_class(items, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def create(self, request, *args, **kwargs):

        try:
            item_intance = CartItem.objects.get(user=request.user, product=request.data.get('product'))
            item_intance.quantity += int(request.data.get('quantity'))
            item_intance.save()
        except:
            serializer = CartItemOverviewSerializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            serializer.save(user=request.user)
           
        return Response("add product success")

    def update(self, request, *args, **kwargs):
        cart_item = self.get_object()
        cart_item.quantity = request.data.get('quantity')
        cart_item.save()
        return Response("update success")
    
    @action(methods=['get'], detail=False)
    def get_count_cart_items(self, request):
        count = CartItem.objects.filter(user=request.user).count()
        return Response(count, status=status.HTTP_200_OK)
