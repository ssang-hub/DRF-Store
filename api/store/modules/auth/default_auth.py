from rest_framework import authentication
from rest_framework import exceptions
import jwt
from django.conf import settings
from store.models import User

class JWTAuthentication(authentication.BaseAuthentication):
    authentication_header_prefix = 'Bearer'
    
    def authenticate(self, request):
        """ The `authenticate` method is called on every request, regardless of
        whether the endpoint requires authentication."""
        request.user = None
        auth_header = authentication.get_authorization_header(request).split()
        auth_header_prefix = self.authentication_header_prefix.lower()
        
        if not auth_header:
            return None
        if len(auth_header)==1:
            return None
        if len(auth_header)>2:
            return None
        
        prefix = auth_header[0].decode('utf-8')
        token = auth_header[1].decode('utf-8')
        if prefix.lower() != auth_header_prefix:
            return None
        
        try:
            payload = jwt.decode(token, settings.SECRET_KEY, algorithms=["HS256"])
        except:
            msg = 'Invalid authentication. Could not decode token.'
            raise exceptions.AuthenticationFailed(msg)
        """
        Try to authenticate the given credentials. If authentication is
        successful, return the user and token. If not, throw an error.
        """
        try:
            user = User.objects.get(pk=payload['id'])
        except User.DoesNotExist:
            msg = 'No user matching this token was found.'
            raise exceptions.AuthenticationFailed(msg)

        if not user.is_active:
            msg = 'This user has been deactivated.'
            raise exceptions.AuthenticationFailed(msg)

        return (user, token)

