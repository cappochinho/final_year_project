import os

from django.core.asgi import get_asgi_application

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "ATTENDLY.config.settings.prod")

application = get_asgi_application()
