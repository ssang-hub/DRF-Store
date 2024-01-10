from rest_framework.serializers import ModelSerializer, ReadOnlyField
from store.models import Order, OrderItem, Product

class ProductItemSerializer(ModelSerializer):

    class Meta:
        model = Product
        fields = ['id', 'name', 'price', 'avatar']

class OrderItemSerializer(ModelSerializer):
    product = ProductItemSerializer()

    class Meta:
        model = OrderItem
        fields = ["id", "product", "quantity", "caculate_price"]


class OrderItemSummarySerializer(ModelSerializer):
    class Meta:
        model = OrderItem
        fields = ["id", "product", "quantity", "caculate_price"]

class OrderSerializer(ModelSerializer):
    order_items = OrderItemSerializer(many=True, read_only=True)

    class Meta:
        model = Order
        fields = ['id', 'total_price', 'order_status', 'note', 'created_time', 'order_items']
