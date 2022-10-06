from enum import unique
from django.conf import settings
from django.db import models
from django.db.models.fields import uuid
from django.utils.translation import gettext_lazy as _

from fingerprints.models import Fingerprint

User = settings.AUTH_USER_MODEL


class Student(models.Model):
    """
    Model representing the data on a student.
    """

    class YearInSchool(models.TextChoices):
        """
        Level choices for a student
        """

        LEVEL_100 = "100", "100"
        LEVEL_200 = "200", "200"
        LEVEL_300 = "300", "300"
        LEVEL_400 = "400", "400"

    id = models.UUIDField(
        default=uuid.uuid4,
        editable=False,
        primary_key=True,
    )
    created = models.DateTimeField(auto_now_add=True)
    first_name = models.CharField(
        verbose_name=_("First Name"),
        max_length=50,
        null=False,
        blank=False,
    )
    last_name = models.CharField(
        verbose_name=_("Last Name"),
        max_length=50,
        null=False,
        blank=False,
    )
    other_names = models.CharField(
        verbose_name=_("Other Names"),
        max_length=100,
        null=True,
        blank=True,
    )
    student_id = models.CharField(
        verbose_name=_("Student ID Number"),
        max_length=8,
        null=False,
        blank=False,
        unique=True,
    )
    index_number = models.CharField(
        verbose_name=_("Student Index Number"),
        max_length=8,
        null=False,
        blank=False,
        unique=True,
    )
    fingerprint = models.OneToOneField(
        unique=True,
        verbose_name=_("Fingerprint"),
        to=Fingerprint,
        on_delete=models.CASCADE,
        blank=True,
        null=True,
    )
    level = models.CharField(
        verbose_name=_("Level of Student"),
        max_length=3,
        choices=YearInSchool.choices,
        default=YearInSchool.LEVEL_100,
    )
    programme_of_study = models.ForeignKey(
        "students.Programme",
        on_delete=models.CASCADE,
        null=False,
        blank=False,
        related_name="students",
        related_query_name="student",
        default="",
    )
    registered_exams = models.ManyToManyField(
        "students.Exam",
        related_name="students",
        related_query_name="student",
        blank=True,
    )
    # fingerprint

    def get_full_name(self) -> str:
        """
        Return the full name of the student by combining the first name, other names and last name
        """
        if self.other_names:
            return f"{self.first_name} {self.other_names} {self.last_name}"
        return f"{self.first_name} {self.last_name}"

    def __str__(self):
        return self.get_full_name()


class Programme(models.Model):
    """
    Model for the programme the student reads
    """

    id = models.UUIDField(
        default=uuid.uuid4,
        editable=False,
        primary_key=True,
    )
    name = models.CharField(
        verbose_name=_("Programme Name"),
        null=False,
        blank=False,
        max_length=100,
    )
    college = models.CharField(
        verbose_name=_("College"),
        null=False,
        blank=False,
        max_length=100,
    )  # TODO: User choice field for this field

    def __str__(self):
        return self.name


# TODO: the room model is not clear
class Room(models.Model):
    """
    Model for rooms that will be allocated to students.
    """

    id = models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True)
    name = models.CharField(
        verbose_name=_("Name"), max_length=10, blank=False, null=False
    )
    capacity = models.IntegerField(
        verbose_name=_("Room Capacity"), null=False, blank=False
    )
    students = models.ManyToManyField(
        "students.Student",
        related_name="allocated_rooms",
        related_query_name="allocated_room",
    )
    invigilators = models.ManyToManyField(
        User,
        limit_choices_to={"invigilator": True},
        related_name="assigned_exams",
        related_query_name="assigned_exam",
    )

    def __str__(self):
        return self.name


class Exam(models.Model):
    """
    Model to represent exams
    """

    id = models.UUIDField(
        default=uuid.uuid4,
        editable=False,
        primary_key=True,
    )
    course_name = models.CharField(
        verbose_name=_("Course Name"),
        max_length=100,
        blank=False,
        null=False,
    )
    course_code = models.CharField(
        verbose_name=_("Course Code"),
        max_length=10,
        blank=False,
        null=False,
    )
    level = models.CharField(
        verbose_name=_("Level"),
        max_length=3,
        choices=Student.YearInSchool.choices,
        default=Student.YearInSchool.LEVEL_100,
    )
    active = models.BooleanField(
        verbose_name=_("Active"),
        default=False,
        null=False
    )
    rooms = models.ManyToManyField(Room)
    start = models.DateTimeField(
        verbose_name=_("Start Date and Time"),
        null=False,
        blank=False,
    )
    end = models.DateTimeField(
        verbose_name=_("End Date and Time"),
        null=False,
        blank=False,
    )

    def __str__(self):
        return self.course_name
