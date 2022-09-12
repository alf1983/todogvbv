from django_filters import rest_framework as filters
from .models import ToDo


class ToDoFilter(filters.FilterSet):
    from_time = filters.DateTimeFilter(field_name="created", lookup_expr='gte')
    to_time = filters.DateTimeFilter(field_name="created", lookup_expr='lte')

    class Meta:
        model = ToDo
        fields = ['created']
