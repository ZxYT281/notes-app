from django.urls import path
from .views import LoginView, Logout, RefreshToken, Register, UserView

urlpatterns = [
    path("login/", LoginView.as_view()),
    path("register/", Register.as_view()),
    path("logout/", Logout.as_view()),
    path("logout/", Logout.as_view()),
    path("refresh/", RefreshToken.as_view()),
    path("user/", UserView.as_view()),
]
