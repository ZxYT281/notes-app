from django.db import models
from userauth.models import User


class Note(models.Model):

    title = models.CharField(max_length=50)
    content = models.TextField()
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    category = models.CharField(max_length=10, default="todos")
    is_public = models.BooleanField(default=False)

    timestamp = models.DateTimeField(auto_now=True, serialize=True)
