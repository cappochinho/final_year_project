from django.urls import path
from rest_framework import routers

from students.api.views import (
    ExamViewSet,
    ProgrammeViewSet,
    RoomViewSet,
    StudentViewSet,
)


app_name = "students"

router = routers.DefaultRouter()
router.register("exams", ExamViewSet)
router.register("rooms", RoomViewSet)
router.register("programmes", ProgrammeViewSet)
router.register("students", StudentViewSet)
urlpatterns = []

urlpatterns += router.urls
