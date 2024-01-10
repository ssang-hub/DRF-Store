from django.urls import path, include

urlpatterns = [
    path(r"product/", include("store.modules.product.urls")),
    path(r"auth/", include("store.modules.auth.urls")),
    path(r"cart/", include("store.modules.cart.urls")),
    path(r"order/", include("store.modules.order.urls")),
    path(r"payment/", include("store.modules.payment.urls"))
]
