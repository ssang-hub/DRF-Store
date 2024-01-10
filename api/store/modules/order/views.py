from rest_framework import status
from rest_framework import viewsets, generics
from rest_framework.response import Response
from rest_framework.decorators import action
from store.permissions import OrderPermission
from .serializers import OrderSerializer, OrderItemSerializer, OrderItemSummarySerializer
from store.models import Order, OrderItem, CartItem
from store.modules.cart.serializers import CartItemSerializer
from store.pagination import SmallResultsSetPagination

class OrderView(viewsets.GenericViewSet, generics.ListCreateAPIView, generics.DestroyAPIView):
    permission_classes = [OrderPermission]
    serializer_class = OrderSerializer
    queryset = Order.objects.all()
    pagination_class = SmallResultsSetPagination
    def list(self, request, *args, **kwargs):
        orders = Order.objects.filter(order_status=(request.query_params.get('status') if (request.query_params) else "pending") ,
                                      user=request.user.id).order_by('created_time')
        queryset = self.filter_queryset(orders)
        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)
        serializer = self.serializer_class(data=orders, many=True)
        return Response(serializer.data)

    def create(self, request, *args, **kwargs):

        """get all item in your cart"""
        cart_items = CartItem.objects.filter(pk__in=request.data.get('cart_items'), user=request.user)
        if cart_items:
            cart_serializer = CartItemSerializer(cart_items, many=True)

            total_price = sum(item.get('caculate_price') for item in cart_serializer.data)
            request.data.update({'total_price': total_price})
            serializer = self.serializer_class(data=request.data)
            serializer.is_valid(raise_exception=True)
            new_order = serializer.save(user=request.user)

            order_items = [{"product": cart_items[i].product.id,
                            "quantity": cart_items[i].quantity} for i in range(len(cart_items))]
            order_items_serializer = OrderItemSummarySerializer(data=order_items, many=True)
            order_items_serializer.is_valid(raise_exception=True)
            order_items_serializer.save(order=new_order)
            #
            """after an order created, delete all cart items"""
            cart_items.delete()
            return Response('order created', status=status.HTTP_201_CREATED)

        return Response('cannot create order', status=status.HTTP_400_BAD_REQUEST)
    
    def destroy(self, request, *args, **kwargs):
        order = self.get_object()
        order.order_status = 'destroyed'
        order.save()
        return Response(status=status.HTTP_204_NO_CONTENT)

    @action(methods=['put'], detail=True)
    def confirm_complete(self, request, pk=None):
        order = self.get_object()
        order.order_status = 'completed'
        order.save()
        return Response(status=status.HTTP_204_NO_CONTENT)
    
    @action(methods=['get'], detail=True)
    def get_order_status(self, request, pk=None):
        order = self.get_object()
        
        return Response()

