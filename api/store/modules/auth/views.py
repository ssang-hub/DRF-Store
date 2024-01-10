from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.permissions import AllowAny, IsAuthenticated
from django.contrib.auth import authenticate
from .serializers import UserSerializer, UserInfoSerializer
from store.models import User
from django.core.mail import send_mail, BadHeaderError
from django.conf import settings
import jwt
from datetime import datetime, timedelta

class RegisterAPI(APIView):
    permission_classes = [AllowAny]
    serializer_class = UserSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
        
class LoginAPI(APIView):
    permission_classes = [AllowAny]
    serializer_class = UserSerializer
    
    def post(self, request, *args, **kwargs):
        email = request.data.get('email')
        password = request.data.get('password')
        user = authenticate(email=email, password=password)
        if not user: 
            return Response('email or password is incorrect', status=status.HTTP_403_FORBIDDEN)
        return Response(self.serializer_class(user).data)
        

class UserInfo(APIView):
    permission_classes = [IsAuthenticated]
    serializer_class = UserInfoSerializer

    def get(self, request):
        user = User.objects.get(pk=request.user.id)
        serializer = self.serializer_class(user)
        return Response(serializer.data)

    def put(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)

class ResetPasswordAPI(APIView):
    permission_classes = [AllowAny]

    """token_check method used to check params from link reset password"""
    def token_check(self, token):
        try:
            payload = jwt.decode(token, settings.SECRET_KEY, algorithms=["HS256"])
            return payload['email']
        except:
            return False

    def get(self, request):
        token = request.query_params.get('token')
        if(self.token_check(token)):
            return Response('', status=status.HTTP_200_OK)
        return Response('link expire time', status=status.HTTP_400_BAD_REQUEST)

    def post(self, request):
        user_email = request.data.get('email')
        user = User.objects.filter(email__icontains=user_email)
        if not user:
            return Response('Email not found', status=status.HTTP_404_NOT_FOUND)
        try:
            token = jwt.encode(
            {"email": user_email, "exp": int((datetime.now() + timedelta(days=settings.REFRESH_TOKEN_TIME)).timestamp())},
            settings.SECRET_KEY,
            algorithm="HS256",
            )
            send_mail('RESET YOUR PASSWORD',
                      f'Click the link to reset your password: {settings.RESET_PASSWORD_URL}/{token}/',
                      settings.EMAIL_HOST_USER, [user_email])
            return Response('Password reset link sent to your email.')
        except:
            return Response('send mail failure', status=status.HTTP_400_BAD_REQUEST)

    def put(self, request):
        user_email = self.token_check(request.query_params.get('token'))
        if (user_email):
            user = User.objects.get(email__icontains=user_email)
            user.set_password(request.data.get('new_password'))
            user.save()
            return Response('reset password completed', status=status.HTTP_200_OK)
        return Response('link expire time', status=status.HTTP_400_BAD_REQUEST)

class ChangePassword(APIView):
    permission_classes = [IsAuthenticated]
    serializer_class = UserSerializer

    def put(self, request):
        old_password = request.data.get('old_password')
        new_password = request.data.get('new_password')

        user = request.user
        if not user.check_password(old_password):
            return Response('old password is not incorrect', status=status.HTTP_400_BAD_REQUEST)
        user.set_password(new_password)
        user.save()

        #upadte new token
        return Response(self.serializer_class(user).data)


class RefreshTokenAPI(APIView):
    """a request send refresh token from client"""
    permission_classes = [IsAuthenticated]
    serializer_class = UserSerializer

    def get(self, request):
        user_instance = User.objects.get(pk=request.user.id)
        serializer = self.serializer_class(user_instance)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
