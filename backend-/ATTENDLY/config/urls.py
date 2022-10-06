from django.contrib import admin
from django.urls import include, path
from django.conf import settings
from django.conf.urls.static import static

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api-auth/", include("rest_framework.urls")),
    # ---- Token
    path("api/v1/token/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("api/v1/token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    # ---- App urls
    path("api/v1/", include("users.api.urls", namespace="users")),
    path("api/v1/", include("students.api.urls", namespace="students")),
    path("api/v1/", include("fingerprints.api.urls", namespace="fingerprints")),
    path("api/v1/", include("attendances.api.urls", namespace="attendances")),
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
