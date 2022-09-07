from django.shortcuts import render
from rest_framework import mixins, viewsets, permissions
from .models import Users
from .serializers import UserModelSerializer


class UsersCustomViewSet(viewsets.GenericViewSet, mixins.ListModelMixin, mixins.RetrieveModelMixin, mixins.UpdateModelMixin):
    queryset = Users.objects.all()
    serializer_class = UserModelSerializer
    permission_classes = [permissions.IsAuthenticated]
