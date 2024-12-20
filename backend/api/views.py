from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import BusinessUser
from .serializers import BusinessUserSerializer
from .serializers import RegisterSerializer, SystemUserSerializer
from django.contrib.auth import get_user_model

@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def business_user_list(request):
    if request.method == 'GET':
        business_users = BusinessUser.objects.all() # Pobiera wszystkich użytkowników z bazy danych.
        serializer = BusinessUserSerializer(business_users, many=True) # Tworzy instancję `BusinessUserSerializer`, przekazując listę użytkowników (`many=True` wskazuje na wiele obiektów).
        return Response(serializer.data)   # Zwraca odpowiedź HTTP z danymi użytkowników w formacie JSON.

    elif request.method == 'POST':
        serializer = BusinessUserSerializer(data=request.data) # Tworzy instancję `BusinessUserSerializer`, przekazując dane z żądania (`request.data`).
        if serializer.is_valid():
            serializer.save()   # Zapisuje nowego użytkownika do bazy danych.
            return Response(serializer.data, status=status.HTTP_201_CREATED) # Zwraca odpowiedź HTTP z utworzonym użytkownikiem i kodem statusu 201 (Created).
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'POST', 'DELETE'])
@permission_classes([IsAuthenticated])
def business_user_detail(request, pk):
    try:
        business_user = BusinessUser.objects.get(pk=pk)
    except BusinessUser.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    if request.method == 'GET':
        serializer = BusinessUserSerializer(business_user)
        return Response(serializer.data)
    elif request.method == 'POST':
        serializer = BusinessUserSerializer(business_user, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        business_user.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)



SystemUser = get_user_model()

@api_view(['POST'])
@permission_classes([AllowAny])
def register(request):
    serializer = RegisterSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(
                serializer.data, 
                status=status.HTTP_201_CREATED
        )
    return Response(
                serializer.errors,
                status=status.HTTP_400_BAD_REQUEST
        )


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def system_user_detail(request):
    user = request.user
    serializer = SystemUserSerializer(user)
    return Response(serializer.data)