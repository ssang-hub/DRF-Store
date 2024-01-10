from django.urls import path, include
from .views import OrderView
from rest_framework import routers


router = routers.DefaultRouter(trailing_slash=False)

router.register(r"", OrderView, basename="order")

urlpatterns = [
    path("", include(router.urls)),
]
