from rest_framework import serializers
from store.models import Product, ProductReview

class ProductReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductReview
        fields = ["id", "product", "content", "vote", "like_count"]
class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ["id", "name", "price", "avatar", "vote", 'public_id_avatar']

class ProductRetrieveSerializer(serializers.ModelSerializer):
    reviews = ProductReviewSerializer(many=True, read_only=True)
    class Meta:
        model = Product
        fields = ["id", "name", "price", "avatar", "detail", "vote", "reviews"]
