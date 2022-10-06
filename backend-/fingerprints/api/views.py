from rest_framework import viewsets
from rest_framework.status import HTTP_200_OK, HTTP_404_NOT_FOUND
from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response


from fingerprints.api.serializers import (
    FingerprintReadSerializer,
    FingerprintWriteSerializer,
    FingerprintVerificationSerializer,
    FingerprintReadVerificationSerializer
)

from fingerprints.models import Fingerprint, FingerprintVerification
from students.models import Student
from attendances.models import ExamAttendance, StudentAttendance


@api_view(["POST"])
def verify_fingerprint(request):
    """
    Get the reqest data which is a fingerprint id, and
    verify if that student associated with that id is
    supposed to be seated in the room for the exams being
    conducted.

    # Fingerprint ID <-> Student
    # Get registered exams
    # Check exam field (active == True)
    # Add active to model and serializer
    # Access students on the exam 
    # Check if the student is among the ids
    # check the room

    """
    if request.method == "POST":
        # print(request.data)
    
        #  Get student associated with the given fingerprint id
        fingerprint_id = request.data["fingerprint_id"]
        student = Student.objects.filter(fingerprint__fingerprint_id=int(fingerprint_id)).first()
        # print(student)
        if student:
            # Get registered exams and check for the active one
            student_active_exam = None
            for exam in student.registered_exams.all():
                if exam.active:
                    student_active_exam = exam
                    break
            # print(student_active_exam)
            
            # Check if student is among the exam registered student
            student_is_registered_for_active_exam = False
            for exam_student in student_active_exam.students.all():
                if student == exam_student:
                    student_is_registered_for_active_exam = True
                    break
            
            ## CHECKING FOR THE ALLOCATED ROOM
            # Get latest exam attendance instance
            student_is_rightly_allocated = False
            if student_is_registered_for_active_exam:
                latest_exam_attendance = ExamAttendance.objects.first()
                for attendance_student in latest_exam_attendance.room.students.all():
                    if attendance_student == student:
                        student_is_rightly_allocated = True
            print(student_is_rightly_allocated)
            FingerprintVerification.objects.create(state=student_is_rightly_allocated, student=student)

            if student_is_rightly_allocated:
                StudentAttendance.objects.create(student=student, exam=student_active_exam, room=latest_exam_attendance.room, exam_attendance=latest_exam_attendance)
            
            return Response(status=HTTP_200_OK)
        return Response(status=HTTP_404_NOT_FOUND)

@api_view(["GET"])
def get_latest_fingerprint_verification(request):
    if request.method == "GET":
        latest = FingerprintVerification.objects.first()
        serializer = FingerprintReadVerificationSerializer(latest)
        
        return Response(serializer.data, HTTP_200_OK)



class FingerprintVerificationViewSet(viewsets.ModelViewSet):
    queryset = FingerprintVerification.objects.all()





class FingerprintViewSet(viewsets.ModelViewSet):
    queryset = Fingerprint.objects.all()  # type: ignore

    def get_serializer_class(self):
        if self.action in ["list", "retrieve", "destroy"]:
            return FingerprintReadSerializer
        elif self.action in ["create", "update", "partial_update"]:
            return FingerprintWriteSerializer
