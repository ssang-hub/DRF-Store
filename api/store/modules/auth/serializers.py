from rest_framework import serializers
from store.models import User

# User Serializer
class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    token = serializers.ReadOnlyField()

    class Meta:
        model = User
        fields = ['id', 'email', 'password', 'avatar', 'fullname', 'token', 'refresh_token', 'is_superuser']

    def create(self, validated_data):
        return User.objects.create_user(**validated_data)


class UserInfoSerializer(serializers.ModelSerializer):
    class Meta: 
        model = User
        fields = ('id', 'email', 'fullname', 'avatar', 'is_superuser')
