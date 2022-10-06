from .base import *

DEBUG = False

ALLOWED_HOSTS = []

SECRET_KEY = "o^oibsg&4mls+4utax)85ik)keqajd1b*x*_pfb!=zny3-q&z_"

INSTALLED_APPS.extend([])

DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.postgresql",
        "NAME": "attendly_db_prod",
        "USER": "attendly_user",
        "PASSWORD": "testpass1234",
        "HOST": "localhost",
        "PORT": 5432,
    }
}
