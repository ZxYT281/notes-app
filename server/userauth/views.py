from datetime import datetime
from django.http import HttpRequest
from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import AuthenticationFailed, ParseError, NotAuthenticated
from rest_framework.authentication import get_authorization_header
from userauth.tokens import create_access_token, create_refresh_token, decode_access_token, decode_refresh_token
from .models import User
from .serializers import UserSerializer


def get_user_from_token(request) -> User:
    auth = get_authorization_header(request).split()
    if auth and len(auth) == 2:
        token = auth[1].decode('utf-8')

        id = decode_access_token(token)
        user = get_object_or_404(User, id=id)
        if user.access_token is None or user.access_token != token:
            raise NotAuthenticated()
        return user

    raise AuthenticationFailed("No Token Present")


class LoginView(APIView):

    def post(self, request):
        email = request.data.get('email')
        username = request.data.get('username')
        password = request.data.get('password')
        if not password:
            raise ParseError("Missing feilds")

        if email is None and username is None:
            raise ParseError("Username or Email must pe present")

        user: User = None
        if email is not None:
            user = User.objects.filter(email=email).first()
        elif username is not None:
            user = User.objects.filter(username=username).first()
        else:
            raise ParseError("Username and Email both passed")

        if user is None:
            raise AuthenticationFailed("User Not Found")

        if not user.check_password(password):
            raise AuthenticationFailed("Incorrect Password")

        access_token = create_access_token(user.id)
        refresh_token = create_refresh_token(user.id)

        resp = Response()
        serializer = UserSerializer(user)
        data = serializer.data
        data['accessToken'] = access_token
        data['message'] = "success"
        resp.data = data
        resp.set_cookie(key='refreshToken', value=refresh_token, httponly=True)
        user.last_login = datetime.now()
        user.access_token = access_token
        user.save()
        return resp


class Register(APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(serializer.data)


class RefreshToken(APIView):

    def post(self, request):
        refresh_token = request.COOKIE.get('refreshToken')
        id = decode_refresh_token(refresh_token)
        user = User.objects.filter(id=id).first()
        access_token = create_access_token(id)
        user.access_token = access_token
        user.save()

        return Response({"access_token": access_token})


class Logout(APIView):

    def post(self, request):
        user = get_user_from_token(request)
        user.access_token = None
        user.save()
        response = Response()
        response.delete_cookie(key="refreshToken")
        response.data = {
            "message": "done!"
        }

        return response


class UserView(APIView):
    def get(self, request):

        user = get_user_from_token(request)

        return Response(UserSerializer(user).data)
