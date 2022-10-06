from rest_framework import serializers

from attendances.models import ExamAttendance, StudentAttendance
from students.api.serializers import (
    ExamSerializerMinimal,
    RoomSerializerMinimal,
    StudentSerializerMinimal,
)


class StudentAttendanceCreateUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = ExamAttendance
        fields = ["student", "exam", "room", "exam_attendance"]


class StudentAttendanceReadSerializer(serializers.ModelSerializer):
    student = StudentSerializerMinimal(read_only=True)
    exam = ExamSerializerMinimal(read_only=True)
    room = RoomSerializerMinimal(read_only=True)

    class Meta:
        model = StudentAttendance
        fields = [
            "id",
            "created",
            "student",
            "exam",
            "room",
            "exam_attendance",
        ]


class ExamAttendanceCreateUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = ExamAttendance
        fields = ["exam", "room"]


class ExamAttendanceReadSerializer(serializers.ModelSerializer):
    exam = ExamSerializerMinimal(read_only=True)
    room = RoomSerializerMinimal(read_only=True)
    student_attendances = StudentAttendanceReadSerializer(many=True, read_only=True)

    class Meta:
        model = ExamAttendance
        fields = ["id", "created", "exam", "room", "student_attendances"]
