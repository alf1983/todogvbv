
from django.core.management import BaseCommand

from todousers.models import Users


class Command(BaseCommand):
    def handle(self, *args, **options):
        username = 'admin1'
        password = '123'
        email = "admin1@tobvae.site"
        firstname = ""
        lastname = ""

        user = Users(
            username=username,
            email=email,
            first_name=firstname,
            last_name=lastname,
        )
        user.set_password(password)
        user.is_superuser = True
        user.is_staff = True
        user.save()
        for i in range(3):
            username = 'user' + str(i)
            email = username + '@todobv.site'
            user = Users(
                username=username,
                email=email,
                first_name=firstname,
                last_name=lastname,
            )
            user.set_password(password)
            user.is_superuser = False
            user.is_staff = False
            user.save()
