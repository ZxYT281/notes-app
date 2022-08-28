from datetime import datetime, timedelta
from logging import exception
from django.shortcuts import get_object_or_404
from rest_framework import exceptions
from .models import User
from django.conf import settings
import jwt


def decode_access_token(token):
    try:
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=["HS256"])
        return payload['id']
    except jwt.ExpiredSignatureError:
        raise exceptions.AuthenticationFailed(
            "Invalid Authentication token or has been expired")


def decode_refresh_token(token):
    try:
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=["HS256"])
        return payload['id']
    except jwt.ExpiredSignatureError:
        raise exceptions.AuthenticationFailed(
            "Invalid Refresh token or has been expired")


def create_access_token(id):
    return jwt.encode({
        "id": id,
        "exp": datetime.utcnow() + timedelta(minutes=60),
        "iat": datetime.utcnow()
    }, settings.SECRET_KEY, algorithm="HS256")


def create_refresh_token(id):
    return jwt.encode({
        "id": id,
        "exp": datetime.utcnow() + timedelta(days=7),
        "iat": datetime.utcnow()
    }, settings.SECRET_KEY, algorithm="HS256")
