from rest_framework import generics
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
import stripe
from store.models import Order
from .serializers import PaymentSerializer

class PaymentView(viewsets.GenericViewSet, generics.CreateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = PaymentSerializer

    def create(self, request, *args, **kwargs):
        order = Order.objects.get(pk=request.data.get('order_id'), user=request.user)
        serializer = self.serializer_class(order)
        intent = stripe.PaymentIntent.create(
                amount=serializer.data['total_price'],
                currency="vnd",
                automatic_payment_methods={"enabled": True},
            )
        order.payment_id = intent.client_secret.split('_secret_')[0]
        order.save()
        return Response(intent.client_secret, status=status.HTTP_200_OK)
    
    @action(methods=['post'], detail=False)
    def check_payment_intent(self, request, pk=None):
        try:
            order = Order.objects.get(pk=request.data.get('order_id'))
            
            if not order.payment_id:
                return Response(status=status.HTTP_404_NOT_FOUND)
            
            payment = stripe.PaymentIntent.retrieve(order.payment_id)
            if payment['status'] == "succeeded" and order.order_status == "pending":
                order.order_status = 'delevery'
                order.payment_status = 'paid'
                order.save()
                return Response(status=status.HTTP_204_NO_CONTENT) 
        except:
            return Response('cannot find order', status=status.HTTP_400_BAD_REQUEST)
        
