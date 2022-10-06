# type: ignore
import factory
from faker import Factory

import random
from students.models import Exam, Programme, Room, Student, Course

faker = Factory.create()


class ProgrammeFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = Programme

    name = faker.random_element(
        elements=(
            "Electrical Engineering",
            "Mechanical Engineering",
            "Civil Engineering",
            "Aerospace Engineering",
        )
    )
    college = "College of Engineering"


class StudentFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = Student

    first_name = faker.first_name()
    last_name = faker.last_name()
    other_names = faker.last_name() if random.choice([True, False]) else ""
    student_id = faker.random_number(digits=8)
    index_number = faker.random_number(digits=8)
    level = "400"  # TODO: make this random
    programme_of_study = factory.SubFactory(ProgrammeFactory)


class CourseFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = Course

    name = faker.random_element(elements=("Differential", "Motors", "Calculus"))
    code = faker.lexify(text="?????", letters="EMCSIFADFFD")
    level = "400"  # TODO: make this random


class RoomFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = Room

    name = faker.random_element(elements=("PB 208", "VSLA", "PB 001"))


class ExamFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = Exam

    course = factory.SubFactory(CourseFactory)
    start = faker.past_datetime(start_date="-2h")
    end = faker.future_datetime(end_date="+2h")
