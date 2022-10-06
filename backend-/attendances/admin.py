# -*- coding: utf-8 -*-
from django.contrib import admin

from .models import ExamAttendance, StudentAttendance


class StudentAttendanceInline(admin.TabularInline):
    model = StudentAttendance


@admin.register(ExamAttendance)
class ExamAttendanceAdmin(admin.ModelAdmin):
    list_display = ("id", "created", "exam", "room")
    list_filter = ("created", "exam", "room")
    inlines = [StudentAttendanceInline]


@admin.register(StudentAttendance)
class StudentAttendanceAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "created",
        "student",
        "exam",
        "room",
        "exam_attendance",
    )
    list_filter = ("created", "student", "exam", "room", "exam_attendance")
