from django.db import models

from todousers.models import Users


class Project(models.Model):
    name = models.CharField(verbose_name='название проекта', max_length=128)
    repo_link = models.URLField(verbose_name='линк на репоситорий')
    users = models.ManyToManyField(Users)

    def __str__(self):
        return self.name


class ToDo(models.Model):
    project = models.OneToOneField(Project, on_delete=models.CASCADE)
    text_note = models.TextField(verbose_name='текст заметки')
    created = models.DateTimeField(auto_now_add=True, auto_now=False)
    updated = models.DateTimeField(auto_now_add=False, auto_now=True)
    user_author = models.OneToOneField(Users, on_delete=models.CASCADE, verbose_name='создатель')
    is_active = models.BooleanField(verbose_name='активно', default=True)
