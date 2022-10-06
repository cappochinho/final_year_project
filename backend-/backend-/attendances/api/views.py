from rest_framework import viewsets

from attendances.api.serializers import (
    ExamAttendanceCreateUpdateSerializer,
    ExamAttendanceReadSerializer,
    StudentAttendanceCreateUpdateSerializer,
    StudentAttendanceReadSerializer,
)
from attendances.models import ExamAttendance, StudentAttendance


class ExamAttendanceViewSet(viewsets.ModelViewSet):
    queryset = ExamAttendance.objects.all()  # type: ignore

    def get_serializer_class(self):
        if self.action in ["list", "retrieve", "destroy"]:
            return ExamAttendanceReadSerializer
        elif self.action in ["create", "update", "partial_update"]:
            return ExamAttendanceCreateUpdateSerializer


class StudentAttendanceViewSet(viewsets.ModelViewSet):
    queryset = StudentAttendance.objects.all()  # type: ignore

    def get_serializer_class(self):
        if self.action in ["list", "retrieve", "destroy"]:
            return StudentAttendanceReadSerializer
        elif self.action in ["create", "update", "partial_update"]:
            return StudentAttendanceCreateUpdateSerializer
