from rest_framework import serializers

from students.models import Programme, Student, Room, Exam
from users.api.serializers import InvigilatorSerializer
from fingerprints.api.serializers import FingerprintSerializerMinimal


class ProgrammeCreateUpdateSerializer(serializers.ModelSerializer):
    class Meta:

        model = Programme
        fields = ["id", "name", "college"]


class ProgrammeSerializerMinimal(serializers.ModelSerializer):
    class Meta:
        model = Programme
        fields = ["id", "name"]


class RoomSerializerMinimal(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = ["id", "name", "capacity"]


class ExamSerializerMinimal(serializers.ModelSerializer):
    rooms = RoomSerializerMinimal(many=True, read_only=True)

    class Meta:
        model = Exam
        fields = ["id", "course_name", "course_code", "start", "end", "rooms", "level", "active", ]


class StudentReadSerializer(serializers.ModelSerializer):
    programme_name = serializers.ReadOnlyField(source="programme_of_study.name")
    registered_exams = ExamSerializerMinimal(many=True, read_only=True)
    fingerprint = FingerprintSerializerMinimal()
    full_name = serializers.ReadOnlyField(source="get_full_name")

    class Meta:
        model = Student
        fields = [
            "id",
            "created",
            "first_name",
            "last_name",
            "other_names",
            "full_name",
            "student_id",
            "index_number",
            "level",
            "programme_name",
            "programme_of_study",
            "fingerprint",
            "registered_exams",
        ]


class StudentCreateUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = [
            "id",
            "created",
            "first_name",
            "last_name",
            "other_names",
            "student_id",
            "index_number",
            "level",
            "fingerprint",
            "programme_of_study",
            "registered_exams",
        ]


class StudentSerializerMinimal(serializers.ModelSerializer):
    programme_name = serializers.ReadOnlyField(source="programme_of_study.name")
    full_name = serializers.ReadOnlyField(source="get_full_name")

    class Meta:
        model = Student
        fields = [
            "id",
            "full_name",
            "student_id",
            "index_number",
            "level",
            "programme_name",
        ]


class ProgrammeReadSerializer(serializers.ModelSerializer):
    students = StudentSerializerMinimal(many=True, read_only=True)

    class Meta:
        model = Programme
        fields = ["id", "name", "college", "students"]


class RoomReadSerializer(serializers.ModelSerializer):
    students = StudentSerializerMinimal(many=True, read_only=True)
    invigilators = InvigilatorSerializer(many=True, read_only=True)

    class Meta:
        model = Room
        fields = ["id", "name", "capacity", "students", "invigilators"]


class RoomCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = ["id", "name", "capacity", "students", "invigilators"]


class ExamReadSerializer(serializers.ModelSerializer):
    students = StudentSerializerMinimal(many=True, read_only=True)
    rooms = RoomSerializerMinimal(many=True, read_only=True)

    class Meta:
        model = Exam
        fields = [
            "id",
            "course_name",
            "course_code",
            "level",
            "start",
            "end",
            "students",
            "rooms",
        ]


class ExamCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Exam
        fields = [
            "id",
            "course_name",
            "course_code",
            "level",
            "start",
            "end",
            "students",
            "rooms",
        ]
