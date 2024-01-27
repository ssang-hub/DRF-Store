from django.db import models
from django.contrib.auth.base_user import AbstractBaseUser
from django.contrib.auth.models import PermissionsMixin
from store.modules.auth.manager import CustomUserManager
from django.conf import settings
from cloudinary.models import CloudinaryField

import jwt

from datetime import datetime, timedelta


class User(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(max_length=255, unique=True)
    fullname = models.CharField(max_length=255)
    password = models.CharField(max_length=255)
    avatar = models.CharField(max_length=100, null=False, default="")
    created_time = models.DateTimeField(auto_now_add=True)
    updated_time = models.DateTimeField(auto_now=True)
    deleted_time = models.DateField(null=True)

    is_staff = models.BooleanField(
        default=False,
    )

    is_active = models.BooleanField(
        default=True,
    )

    USERNAME_FIELD = "email"

    REQUIRED_FIELDS = []
    objects = CustomUserManager()

    def genarate_token(self, dt):
        return jwt.encode(
            {"id": self.pk, "fullname": self.fullname, "avatar": self.avatar,"is_superuser": self.is_superuser, "exp": int(dt.timestamp())},
            settings.SECRET_KEY,
            algorithm="HS256",
        )

    @property
    def token(self):
        dt = datetime.now() + timedelta(minutes=settings.JWT_EXPIRE_TIME)
        """Generates a JSON Web Token that stores this user's ID"""
        return self.genarate_token(dt)

    @property
    def refresh_token(self):
        dt = datetime.now() + timedelta(days=settings.REFRESH_TOKEN_TIME)
        return self.genarate_token(dt)


class Product(models.Model):
    name = models.CharField(max_length=250, null=False)
    price = models.IntegerField(null=False)
    avatar = models.CharField(max_length=100, null=False, default=settings.DEFAULT_IMAGE_PRODUCT)
    public_id_avatar = models.CharField(max_length=50, null=False, default="")
    detail = models.CharField(max_length=5000, default="")
    category = models.CharField(max_length=500, default="")
    sold = models.IntegerField(default=0, null=False)
    vote = models.DecimalField(max_digits=5, decimal_places=2, null=False, default=5)
    created_time = models.DateTimeField(auto_now_add=True)
    updated_time = models.DateTimeField(auto_now=True)
    deleted_time = models.DateField(null=True)


    def __str__(self) -> str:
        return self.id

    @property
    def get_price(self):
        return self.price
    
class Category(models.Model):
    category_name = models.CharField(max_length=500, default="")
    created_time = models.DateTimeField(auto_now_add=True)


class Order(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=False)
    total_price = models.IntegerField(null=False, default=0)
    order_status = models.CharField(max_length=100, default="pending")
    payment_status = models.CharField(max_length=100, default="to pay")
    payment_id = models.CharField(max_length=100, default="")
    note = models.CharField(max_length=5000, default="")
    created_time = models.DateTimeField(auto_now_add=True)
    updated_time = models.DateTimeField(auto_now=True)
    deleted_time = models.DateField(null=True)
    
 


class OrderItem(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE, null=False, related_name='order_items')
    product = models.ForeignKey(Product, on_delete=models.CASCADE, null=False)
    quantity = models.IntegerField(null=False)

    @property
    def caculate_price(self):
        return self.product.get_price * self.quantity


class ProductReview(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    content = models.CharField(max_length=5000, null=False)
    vote = models.IntegerField(null=False)
    like_count = models.IntegerField(default=0)

    created_time = models.DateTimeField(auto_now_add=True)
    updated_time = models.DateTimeField(auto_now=True)
    deleted_time = models.DateField(null=True)

    def __str__(self) -> str:
        return self.id


class ImageProduct(models.Model):
    image_URL = models.CharField(max_length=100, null=False, default="")
    product = models.ForeignKey(Product, on_delete=models.CASCADE, null=False)

    def __str__(self) -> str:
        return self.id


class CartItem(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=False)
    product = models.ForeignKey(Product, on_delete=models.CASCADE, null=False)
    quantity = models.IntegerField(null=False)

    @property
    def caculate_price(self):
        return self.product.get_price * self.quantity
