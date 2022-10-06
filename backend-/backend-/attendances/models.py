import uuid
from django.db import models
from django.utils.translation import gettext_lazy as _
from students.models import Exam, Room, Student


class ExamAttendance(models.Model):
    id = models.UUIDField(
        editable=False,
        unique=True,
        blank=False,
        null=False,
        default=uuid.uuid4,
        primary_key=True,
    )
    created = models.DateTimeField(
        verbose_name=_("Created"),
        blank=False,
        null=False,
        auto_now_add=True,
    )
    exam = models.ForeignKey(
        verbose_name=_("Examination"),
        to=Exam,
        blank=False,
        null=False,
        on_delete=models.CASCADE,
        related_name="exam_attendance",
    )
    room = models.ForeignKey(
        verbose_name=_("Room"),
        to=Room,
        blank=False,
        null=False,
        on_delete=models.CASCADE,
        related_name="exam_attendances",
    )

    class Meta:
        ordering = ("-created", )

    def __str__(self):
        return f"{self.exam.course_name} {self.room.name}"


class StudentAttendance(models.Model):
    id = models.UUIDField(
        editable=False,
        unique=True,
        primary_key=True,
        blank=False,
        null=False,
        default=uuid.uuid4,
    )
    created = models.DateTimeField(
        auto_now_add=True,
        blank=False,
        null=False,
    )
    student = models.ForeignKey(
        to=Student,
        on_delete=models.CASCADE,
        blank=False,
        null=False,
        related_name="student_attendances",
    )
    exam = models.ForeignKey(
        to=Exam,
        on_delete=models.CASCADE,
        blank=False,
        null=False,
        related_name="exam_student_attendances",
    )
    room = models.ForeignKey(
        to=Room,
        on_delete=models.CASCADE,
        blank=False,
        null=False,
        related_name="room_student_attendances",
    )
    exam_attendance = models.ForeignKey(
        to=ExamAttendance,
        on_delete=models.CASCADE,
        blank=False,
        null=False,
        related_name="student_attendances",
    )

    def __str__(self):
        return f"{self.student.get_full_name()} {self.exam.course_name}"
