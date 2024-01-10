from django.urls import path, include
from .views import CartView
from rest_framework import routers

router = routers.DefaultRouter(trailing_slash=False)

router.register(r'', CartView, basename='cart')

urlpatterns = [
    path('', include(router.urls)),
]

