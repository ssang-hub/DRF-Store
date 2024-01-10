from django.urls import path
from .views import RegisterAPI, LoginAPI, UserInfo, ResetPasswordAPI, ChangePassword, RefreshTokenAPI

urlpatterns = [
    path("register/", RegisterAPI.as_view(), name="register"),
    path("login/", LoginAPI.as_view(), name="login"),
    path('my_info/', UserInfo.as_view(), name="my_info"),
    path('reset_password/', ResetPasswordAPI.as_view(), name='reset_passwrod'),
    path('change_password/', ChangePassword.as_view(), name='change_password'),
    path('refresh_token/', RefreshTokenAPI.as_view(), name='refresh_token')
]
