from rest_framework import serializers
from store.models import CartItem, Product


class ProductOverviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ["id", "name", "price", "avatar"]

class CartItemSerializer(serializers.ModelSerializer):
    product = ProductOverviewSerializer()
    class Meta:
        model = CartItem
        fields = ["id", "product", "quantity", "caculate_price"]

class CartItemOverviewSerializer(serializers.ModelSerializer):
     class Meta:
        model = CartItem
        fields = ["product", "quantity"]

