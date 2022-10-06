# type: ignore
import pytest
from . import factories
from students.models import Programme, Student, Course, Room


@pytest.mark.django_db
def test_create_student():
    """
    Test to ensure that creating a student works.
    """

    student = factories.StudentFactory()

    db_object = Student.objects.first()
    programme_of_study = Programme.objects.first()

    assert Student.objects.count() == 1
    assert str(db_object) == student.get_full_name()
    assert db_object.programme_of_study == programme_of_study


@pytest.mark.django_db
def test_create_programme():
    """
    Test to ensure that creting a programme object works
    """

    programme = factories.ProgrammeFactory()

    db_object = Programme.objects.first()

    assert Programme.objects.count() == 1
    assert str(db_object) == programme.name
    assert db_object.name == programme.name
    assert db_object.college == programme.college


@pytest.mark.django_db
def test_create_course():
    """
    Test to ensure that creating a course object works
    """
    course = factories.CourseFactory()

    db_object = Course.objects.first()

    assert Course.objects.count() == 1
    assert str(db_object) == course.name
    assert db_object.name == course.name
    assert db_object.code == course.code
    assert db_object.level == course.level


@pytest.mark.django_db
def test_create_room():
    """
    Test to ensure that creating a room object works
    """
    room = factories.RoomFactory()

    db_object = Room.objects.first()

    assert Room.objects.count() == 1
    assert str(db_object) == room.name
