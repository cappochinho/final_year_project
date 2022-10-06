from rest_framework import routers, urlpatterns

from users.api.views import UserViewSet

router = routers.DefaultRouter()

router.register("users", UserViewSet)

app_name = "users"
urlpatterns = []

urlpatterns += router.urls
