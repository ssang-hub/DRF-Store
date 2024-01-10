from django.urls import path, include
from .views import ProductViewUser, ProductViewAdmin, ProductReviewView
from rest_framework import routers


router = routers.DefaultRouter(trailing_slash=False)

router.register('product_admin/', ProductViewAdmin, basename='product_management')
router.register('product_review/', ProductReviewView, basename='product_management')
router.register(r"", ProductViewUser, basename="product")
urlpatterns = [
    path("", include(router.urls)),
]
