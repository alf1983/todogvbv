import json

# from django.contrib.auth import authenticate
from django.test import TestCase
from rest_framework import status
from rest_framework.test import APIRequestFactory, force_authenticate, APIClient, APISimpleTestCase, APITestCase, \
    CoreAPIClient
from mixer.backend.django import mixer
from todousers.models import Users
from .views import ProjectParamFilterModelViewSet
from .models import Project, ToDo


class TestProjectsViewSet(TestCase):
    def setUp(self) -> None:
        self.url = '/api/projects/'
        # self.admin = Users.objects.crate(
        #     name='admin',
        #     email='admin@todo.site',
        #     password='123_hello_admin',
        # )
        self.project = Project.objects.create(
            name="Новый Супер Проект",
            repo_link='https://github.com/s',
            # users=self.admin,
        )

    def test_factory_project_list(self):
        factory = APIRequestFactory()
        request = factory.get(self.url)
        view = ProjectParamFilterModelViewSet.as_view({'get': 'list'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_api_client_project_create(self):
        client = APIClient()
        response = client.put(f'{self.url}{self.project.id}/', {'name': 'просто проект', 'repo_link': ''})
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def tearDown(self) -> None:
        pass


class TestProjectToDo(APITestCase):
    def setUp(self) -> None:
        self.url = '/api/ToDo/'
        self.format = 'json'
        self.admin = Users.objects.create_superuser(
            username='admin',
            email='admin@todo.site',
            is_staff=True,
            # password='123_hello_admin',
        )
        self.admin.set_password('123_hello_admin')
        self.admin_pass = '123_hello_admin'
        self.project = Project.objects.create(
            name="Новый Супер Проект",
            repo_link='https://github.com/s',
        )
        self.project.users.add(self.admin)
        todo_project = Project.objects.get(id=self.project.id)
        self.todo = ToDo.objects.create(
            project=todo_project,
            text_note='Изменить этот текст',
            # user_author=self.admin
        )
        self.todo_mixer = mixer.blend(ToDo)
        self.todo.user_author.add(self.admin)
        self.updated_note = {
            'project': self.todo.project.id,
            'text_note': 'Текст поменяли на это',
            'user_author': [1]
        }
        self.updated_note_mixer = {
            'project': self.todo_mixer.project.id,
            'text_note': 'Текст поменяли на это',
            'user_author': [1]
        }

    def test_todo_admin_update(self):
        self.admin.refresh_from_db()
        self.client.force_authenticate(user=self.admin)
        response = self.client.put(
            f'{self.url}{self.todo.id}/',
            self.updated_note,
            format=self.format
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.todo.refresh_from_db()
        self.assertEqual(self.todo.text_note, self.updated_note.get('text_note'))

    def test_todo_admin_update_mixer(self):
        self.admin.refresh_from_db()
        self.client.force_authenticate(user=self.admin)
        response_mixer = self.client.put(
            f'{self.url}{self.todo_mixer.id}/',
            self.updated_note_mixer,
            format=self.format
        )
        self.assertEqual(response_mixer.status_code, status.HTTP_200_OK)
        self.todo_mixer.refresh_from_db()
        self.assertEqual(self.todo_mixer.text_note, self.updated_note_mixer.get('text_note'))

    def tearDown(self) -> None:
        pass


def test_todousers_livetest():
    url = 'http://127.0.0.1:7000/api/todousers/'
    client = CoreAPIClient()
    schema = client.get(url)
    new_user = {
        "username": "admin7",
        "email": "admin7@todobv.site",
        'password': "123"
    }
    client.action(schema, ['todousers', 'create'], new_user)
    response = client.action(schema, ['todousers', 'list'])
    assert (len(response) == 1)
