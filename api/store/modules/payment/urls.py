from django.urls import path, include
from .views import PaymentView
from rest_framework import routers


router = routers.DefaultRouter(trailing_slash=False)

router.register(r"", PaymentView, basename="payment")

urlpatterns = [
    path("", include(router.urls)),
]
