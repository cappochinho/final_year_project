from rest_framework import serializers
from students.models import Student
from fingerprints.models import Fingerprint, FingerprintVerification


class FingerprintReadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Fingerprint
        fields = ["id", "created", "fingerprint_id"]


class FingerprintWriteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Fingerprint
        fields = ["id", "created", "fingerprint_id"]


class FingerprintSerializerMinimal(serializers.ModelSerializer):
    class Meta:
        model = Fingerprint
        fields = ["id", "fingerprint_id"]

class FingerprintVerificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = FingerprintVerification
        fields = ["id", "created", "state", "student"]

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

class FingerprintReadVerificationSerializer(serializers.ModelSerializer):
    student = StudentSerializerMinimal(read_only=True)

    class Meta:
        model = FingerprintVerification
        fields = ["id", "created", "state", "student"]


class FingerPrintWriteVerificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = FingerprintVerification
        fields = ["id", "created", "state", "student"]