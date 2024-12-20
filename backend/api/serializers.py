from rest_framework import serializers
from .models import BusinessUser, SystemUser

class BusinessUserSerializer(serializers.ModelSerializer):
    # Definiuje klasę `BusinessUserSerializer`, dziedziczącą z `serializers.ModelSerializer`.
    # `ModelSerializer` automatycznie mapuje pola modelu na pola serializera.
    class Meta: # Klasa `Meta` definiuje konfigurację dla `BusinessUserSerializer`.
        model = BusinessUser
        fields = ['id', 'first_name', 'last_name', 'role']


# Serializery dla SystemUser
class RegisterSerializer(serializers.ModelSerializer):
    """
    Serializer do rejestracji użytkownika systemowego.
    """
    
    password = serializers.CharField(write_only=True)

    class Meta:
        model = SystemUser
        fields = ['username', 'email', 'password']


    def create(self, validated_data):
        user = SystemUser.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password']
        )
        return user


class SystemUserSerializer(serializers.ModelSerializer):
    """
    Serializer do odczytu danych użytkownika systemowego.
    """
    class Meta:
        model = SystemUser
        fields = ['id', 'username', 'email']