import graphene
from graphene_django import DjangoObjectType
from todo.models import ToDo, Project
from todousers.models import Users

# class Query(graphene.ObjectType):
#     hello = graphene.String(default_value="Hi!")


class ToDoType(DjangoObjectType):
    class Meta:
        model = ToDo
        fields = '__all__'


class ProjectType(DjangoObjectType):
    class Meta:
        model = Project
        fields = '__all__'


class UsersType(DjangoObjectType):
    class Meta:
        model = Users
        fields = '__all__'


class Query(graphene.ObjectType):
    all_todos = graphene.List(ToDoType)
    users_by_todo = graphene.List(UsersType, id=graphene.Int(required=True))

    def resolve_all_todos(root, info):
        return ToDo.objects.all()

    def resolve_users_by_todo(self, info, id=None):
        try:
            todo = ToDo.objects.get(id=id)
            users = todo.project.users.all()
            # print(users)
            return users
        except ToDo.DoesNotExist:
            return None



schema = graphene.Schema(query=Query)
