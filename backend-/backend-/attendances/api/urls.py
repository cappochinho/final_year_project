from rest_framework import routers

from attendances.api.views import ExamAttendanceViewSet, StudentAttendanceViewSet

router = routers.DefaultRouter()

router.register("attendances/exams", ExamAttendanceViewSet)
router.register("attendances/students", StudentAttendanceViewSet)

app_name = "attendances"
urlpatterns = router.urls
