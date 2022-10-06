from django.contrib.auth import get_user_model
from django.core.exceptions import ObjectDoesNotExist
from rest_framework import serializers

User = get_user_model()


class RegisterUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            "id",
            "username",
            "first_name",
            "last_name",
            "password",
            "email",
            "invigilator",
        ]

    # TODO: make the password write only
    extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        try:
            user = User.objects.get(username=validated_data["username"])
        except ObjectDoesNotExist:
            user = User.objects.create_user(**validated_data)
        return user


class UserReadSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            "id",
            "username",
            "first_name",
            "email",
            "is_staff",
            "invigilator",
        ]


class InvigilatorSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "first_name", "last_name"]
