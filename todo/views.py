from djangorestframework_camel_case.render import CamelCaseJSONRenderer
from rest_framework.viewsets import ModelViewSet
from .models import Project, ToDo
from .serializers import ProjectModelSerializer, TodoHyperlinkedModelSerializer


class ProjectModelViewSet(ModelViewSet):
    queryset = Project.objects.all()
    renderer_classes = [CamelCaseJSONRenderer]
    serializer_class = ProjectModelSerializer


class ToDoModelViewSet(ModelViewSet):
    queryset = ToDo.objects.all()
    # renderer_classes = [CamelCaseJSONRenderer]
    serializer_class = TodoHyperlinkedModelSerializer
