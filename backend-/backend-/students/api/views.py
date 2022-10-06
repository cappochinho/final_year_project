from rest_framework.viewsets import ModelViewSet

from students.api.serializers import (
    ExamCreateSerializer,
    ExamReadSerializer,
    ProgrammeCreateUpdateSerializer,
    ProgrammeReadSerializer,
    RoomCreateSerializer,
    RoomReadSerializer,
    StudentCreateUpdateSerializer,
    StudentReadSerializer,
)
from students.models import Exam, Programme, Room, Student


# --------------------------------- Student Related views
class StudentViewSet(ModelViewSet):
    queryset = Student.objects.all()  # type: ignore

    def get_serializer_class(self):
        if self.action in ["list", "retrieve", "destroy"]:
            return StudentReadSerializer
        elif self.action in ["create", "update", "partial_update"]:
            return StudentCreateUpdateSerializer


# --------------------------------- Programme Related views
class ProgrammeViewSet(ModelViewSet):
    queryset = Programme.objects.all()  # type: ignore

    def get_serializer_class(self):
        if self.action in ["list", "retrieve", "destroy"]:
            return ProgrammeReadSerializer
        elif self.action in ["create", "update", "partial_update"]:
            return ProgrammeCreateUpdateSerializer


# ---------------------------------- Room Related views
class RoomViewSet(ModelViewSet):
    queryset = Room.objects.all()  # type: ignore

    def get_serializer_class(self):
        if self.action in ["list", "retrieve", "destroy"]:
            return RoomReadSerializer
        elif self.action in ["create", "update", "partial_update"]:
            return RoomCreateSerializer


# ----------------------------------- Exam related views


class ExamViewSet(ModelViewSet):
    queryset = Exam.objects.all()  # type: ignore

    def get_serializer_class(self):
        if self.action in ["list", "retrieve", "destroy"]:
            return ExamReadSerializer
        elif self.action in ["create", "update", "partial_update"]:
            return ExamCreateSerializer
