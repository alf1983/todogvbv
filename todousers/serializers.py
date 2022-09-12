from rest_framework.serializers import HyperlinkedModelSerializer, ModelSerializer
from .models import Users


class UserModelSerializer(HyperlinkedModelSerializer):
    class Meta:
        model = Users
        fields = ('id', 'username', 'first_name', 'last_name', 'email')
        # print(fields)


class UserModelStaffInfoSerializer(ModelSerializer):
    class Meta:
        model = Users
        fields = ('id', 'username', 'first_name', 'last_name', 'email', 'is_superuser', 'is_staff')
