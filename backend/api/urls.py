from django.urls import path
from .views import (
    business_user_list, business_user_detail,
    register, system_user_detail
)
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    # Business Users
    path('users/', business_user_list, name='business_user_list'),
    path('users/<int:pk>/', business_user_detail, name='business_user_detail'),

    # System User
    path('register/', register, name='register'),
    path('login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('login/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    # endpoint do pobrania danych zalogowanego użytkownika
    path('me/', system_user_detail, name='system_user_detail'),
]
