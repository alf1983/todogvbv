from django.shortcuts import render
from rest_framework import mixins, viewsets, permissions
from .models import Users
from .serializers import UserModelSerializer, UserModelStaffInfoSerializer


class UsersCustomViewSet(viewsets.GenericViewSet, mixins.ListModelMixin, mixins.RetrieveModelMixin, mixins.UpdateModelMixin, mixins.CreateModelMixin):
    queryset = Users.objects.all()
    serializer_class = UserModelSerializer
    # permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get_serializer_class(self):
        if self.request.version == '1.1':
            return UserModelStaffInfoSerializer
        return UserModelSerializer
