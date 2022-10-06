# -*- coding: utf-8 -*-
from django.contrib import admin

from .models import Fingerprint, FingerprintVerification


@admin.register(Fingerprint)
class FingerprintAdmin(admin.ModelAdmin):
    list_display = ("id", "created", "fingerprint_id")
    list_filter = ("created",)

@admin.register(FingerprintVerification)
class FingerprintVerificationAdmin(admin.ModelAdmin):
    list_display = ("id", "created", "state", "student", )
    list_filter = ("created", )