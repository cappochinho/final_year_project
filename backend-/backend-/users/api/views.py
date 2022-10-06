from django.contrib.auth import get_user_model
from rest_framework import viewsets

from users.api.serializers import RegisterUserSerializer, UserReadSerializer


User = get_user_model()


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()  # type: ignore

    def get_serializer_class(self):
        if self.action in ["create"]:
            return RegisterUserSerializer
        elif self.action in ["list", "retrieve", "destroy"]:
            return UserReadSerializer
