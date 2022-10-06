import { useState, useEffect } from 'react';

import { ButtonGroup, useToast, VStack, Button } from '@chakra-ui/react';

import { Formik } from 'formik';
import * as Yup from 'yup';

import FormSelect from '../forms/FormSelect';

import StudentService from '../../utils/students.util';
import FingerprintService from '../../utils/fingerprints.util';

// TODO: fetch all the fingerprints when the modal is opened.

const EnrollFingerprintForm = ({ onClose, id }) => {
  const [fingerprints, setFingerprints] = useState([]);
  const toast = useToast();

  // load the fingerprints when this popup modal is opened
  const fetchFingerprintData = () => {
    FingerprintService.getFingerprintList()
      .then((res) => {
        if (res.status == 200) {
          setFingerprints((prevFingerprints) => res?.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    fetchFingerprintData();
  }, []);

  const initialValues = {
    fingerprint: '',
  };

  const enrollFingerprintValidationSchema = Yup.object().shape({
    fingerprint: Yup.string().required('Fingerprint is required'),
  });

  const handleRefresh = () => {
    fetchFingerprintData();
  };

  const handleSubmit = (values, { setSubmitting, setErrors, resetForm }) => {
    values['id'] = id;
    console.log('worked');
    StudentService.updateStudent(values)
      .then((res) => {
        if (res.status == 200) {
          toast({
            title: 'Fingerprint enrollment successful',
            description: `Fingerprint has been attached to ${res?.data.first_name} ${res?.data.last_name}`,
            status: 'success',
            duration: 5000,
            isClosable: true,
            position: 'top',
          });
        }
      })
      .catch((error) => {
        if (error.response.status == 400) {
          setErrors(error.response?.data);
        }
      })
      .finally(() => {});
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={enrollFingerprintValidationSchema}
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
        <>
          <form method="POST">
            <VStack spacing={5}>
              <FormSelect
                name="fingerprint"
                label="Fingerprint"
                errors={errors}
                touched={touched}
                values={values}
                handleChange={handleChange}
                handleBlur={handleBlur}
                isRequired={true}
                options={fingerprints}
                option_value="id"
                option_label="id"
              />
            </VStack>{' '}
            <ButtonGroup mt={5} w={'full'}>
              <Button
                w={'full'}
                colorScheme="green"
                type="submit"
                disabled={isSubmitting}
                onClick={handleSubmit}
              >
                Enroll Fingerprint
              </Button>
            </ButtonGroup>
          </form>
          <Button
            mt={5}
            colorScheme="yellow"
            type="button"
            onClick={handleRefresh}
            variant={'outline'}
            w={'full'}
          >
            Refresh Fingerprints
          </Button>
        </>
      )}
    </Formik>
  );
};

export default EnrollFingerprintForm;
