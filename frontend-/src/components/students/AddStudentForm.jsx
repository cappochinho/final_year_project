import { useToast, VStack, Button } from '@chakra-ui/react';

import { Formik } from 'formik';
import * as Yup from 'yup';
import FormInput from '../forms/FormInput';
import FormSelect from '../forms/FormSelect';
import { useProgrammes } from '../../hooks/programme';
import StudentService from '../../utils/students.util';

const level_options = [
  {
    id: 1,
    value: '100',
    label: '100',
  },
  {
    id: 2,
    value: '200',
    label: '200',
  },
  {
    id: 3,
    value: '300',
    label: '300',
  },
  {
    id: 4,
    value: '400',
    label: '400',
  },
];

const AddStudentForm = ({ onClose }) => {
  const { isFetching, programmes } = useProgrammes();
  const toast = useToast();

  const initialValues = {
    first_name: '',
    other_names: '',
    last_name: '',
    student_id: '',
    index_number: '',
    level: '',
    programme_of_study: '',
  };

  const enrollStudentValidationSchema = Yup.object().shape({
    first_name: Yup.string().required('First Name is required'),
    other_names: Yup.string(),
    last_name: Yup.string().required('Last Name is required'),
    student_id: Yup.string().required('Last Name is required'),
    index_number: Yup.string().required('Index Number is required'),
    level: Yup.string().required('Level is required'),
    programme_of_study: Yup.string().required('Programme of study is required'),
  });

  const handleSubmit = (values, { setSubmitting, setErrors, resetForm }) => {
    StudentService.addStudent(values)
      .then((res) => {
        if (res.status == 201) {
          toast({
            title: 'Student Created Successfully',
            description: `Student with ID: ${values.student_id} and Index Number: ${values.index_number} has been created`,
            status: 'success',
            duration: 9000,
            isClosable: true,
            position: 'top',
          });
          resetForm();
        }
        // Close the popup modal when the submission is a success
      })
      .catch((errors) => {
        setErrors(errors.response?.data);
      })
      .finally(console.log('Done'));

    setSubmitting(false);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={enrollStudentValidationSchema}
      onSubmit={handleSubmit}
    >
      {({
        errors,
        touched,
        values,
        handleSubmit,
        handleChange,
        handleBlur,
        isSubmitting,
      }) => (
        <form method="POST">
          <VStack spacing={5}>
            <FormInput
              name="first_name"
              label="First Name"
              type="text"
              errors={errors}
              touched={touched}
              values={values}
              handleChange={handleChange}
              handleBlur={handleBlur}
              isRequired={true}
            />
            <FormInput
              name="other_names"
              label="Other Names"
              type="text"
              errors={errors}
              touched={touched}
              values={values}
              handleChange={handleChange}
              handleBlur={handleBlur}
            />
            <FormInput
              name="last_name"
              label="Last Name"
              type="text"
              errors={errors}
              touched={touched}
              values={values}
              handleChange={handleChange}
              handleBlur={handleBlur}
              isRequired={true}
            />
            <FormInput
              name="student_id"
              label="Student ID"
              type="text"
              errors={errors}
              touched={touched}
              values={values}
              handleChange={handleChange}
              handleBlur={handleBlur}
              isRequired={true}
            />
            <FormInput
              name="index_number"
              label="Index Number"
              type="text"
              errors={errors}
              touched={touched}
              values={values}
              handleChange={handleChange}
              handleBlur={handleBlur}
              isRequired={true}
            />
            <FormSelect
              name="level"
              label="Level"
              errors={errors}
              touched={touched}
              values={values}
              handleChange={handleChange}
              handleBlur={handleBlur}
              isRequired={true}
              options={level_options}
              option_value="value"
              option_label="label"
            />
            <FormSelect
              name="programme_of_study"
              label="Programme"
              errors={errors}
              touched={touched}
              values={values}
              handleChange={handleChange}
              handleBlur={handleBlur}
              isRequired={true}
              options={programmes}
              option_value="id"
              option_label="name"
            />
          </VStack>{' '}
          <Button
            mt={5}
            colorScheme="green"
            type="submit"
            disabled={isSubmitting}
            onClick={handleSubmit}
          >
            Add Student Data
          </Button>
        </form>
      )}
    </Formik>
  );
};

export default AddStudentForm;
