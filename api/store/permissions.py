from rest_framework.permissions import BasePermission
from store.models import Order, CartItem, ProductReview


class OrderPermission(BasePermission):
    def has_permission(self, request, view):
        if request.user.is_authenticated:
            return True
        return False

    def has_object_permission(self, request, view, obj):
        if request.user.is_superuser or obj.user == request.user:
            return True
        return False

#complete
class ProductReviewPermission(BasePermission):
    def has_permission(self, request, view):
        if request.method in ["GET"] or request.user.is_authenticated:
            return True
        return False

    def has_object_permission(self, request, view, obj):
        if request.user.is_superuser or obj.user == request.user:
            return True
        return False


class CartPermission(BasePermission):
    def has_permission(self, request, view):
        if request.user.is_authenticated:
            return True
        return False

    def has_object_permission(self, request, view, obj):
        return obj.user == request.user

# class PaymentPermission(BasePermission):
#     def has_permission(self, request, view):
#         if request.user.is_authenticated:
#             return True
#     def has_object_permission(self, request, view, obj):
#         return True
