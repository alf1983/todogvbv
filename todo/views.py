# from django.db.migrations import serializer
# from djangorestframework_camel_case.render import CamelCaseJSONRenderer
from rest_framework.generics import get_object_or_404
from rest_framework.pagination import LimitOffsetPagination
# from rest_framework.renderers import BrowsableAPIRenderer
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

from .filters import ToDoFilter
from .models import Project, ToDo
from .serializers import ProjectModelSerializer, TodoModelSerializer


class ProjectLimitOffsetPagination(LimitOffsetPagination):
    default_limit = 10


class ProjectParamFilterModelViewSet(ModelViewSet):
    # queryset = Project.objects.all()
    # renderer_classes = [CamelCaseJSONRenderer]
    serializer_class = ProjectModelSerializer
    pagination_class = ProjectLimitOffsetPagination

    def get_queryset(self):
        name = self.request.query_params.get('name', '')
        if name:
            projects = Project.objects.filter(name__contains=name)
        else:
            projects = Project.objects.all()
        return projects


class ToDoLimitOffsetPagination(LimitOffsetPagination):
    default_limit = 20


class ToDoModelViewSet(ModelViewSet):
    queryset = ToDo.objects.all()
    # renderer_classes = [BrowsableAPIRenderer]
    serializer_class = TodoModelSerializer
    pagination_class = ToDoLimitOffsetPagination
    filterset_class = ToDoFilter

    def destroy(self, request, pk):
        todo = get_object_or_404(ToDo, pk=pk)
        todo.is_active = False
        todo.save()
        serializer = self.serializer_class(todo)
        return Response(serializer.data)

