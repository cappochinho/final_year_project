from .base import *

DEBUG = True

ALLOWED_HOSTS = ["*"]

SECRET_KEY = "e$ky9h*wr2dpxfr(4n#@eb5td%+%fv=s(@yxu62uf20@a%=7gr"

INSTALLED_APPS.extend(["django_extensions"])

DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.postgresql",
        "NAME": "attendly_db",
        "USER": "attendly_user",
        "PASSWORD": "testpass1234",
        "HOST": "localhost",
        "PORT": 5432,
    }
}

# Media files settings
MEDIA_ROOT = BASE_DIR / "media"
MEDIA_URL = "/media/"
