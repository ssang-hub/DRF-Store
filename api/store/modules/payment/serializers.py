from rest_framework import serializers
from store.models import Order

class PaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = ['id', 'total_price']