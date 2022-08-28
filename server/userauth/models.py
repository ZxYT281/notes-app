from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    first_name = None
    last_name = None

    email = models.EmailField(null=False)
    name = models.CharField(max_length=128)
    access_token = models.CharField(max_length=256, default=None, null=True)
