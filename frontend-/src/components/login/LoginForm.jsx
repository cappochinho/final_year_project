import { Formik } from 'formik';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { Button, Text, VStack, Spinner, useToast } from '@chakra-ui/react';
import FormInput from '../forms/FormInput';

import AuthService from '../../utils/auth.util';

const LoginForm = () => {
  const navigate = useNavigate();
  const toast = useToast();

  const initialValues = {
    username: '',
    password: '',
  };

  const loginValidationSchema = Yup.object().shape({
    username: Yup.string().required('Lectuer ID is required'),
    password: Yup.string().required('Password is required'),
  });

  const handleSubmit = (values, { setSubmitting, setErrors }) => {
    setSubmitting(true);
    AuthService.login(values.username, values.password)
      .then((res) => {
        console.log(res);
        if (res.status == 200) {
          console.log('It works');
          toast({
            title: 'Login Sucessful',
            description: 'Your login was successful, Welcome to Attedly.',
            status: 'success',
            duration: 5000,
            isClosable: true,
            position: 'top',
          });
          navigate('/dashboard', { replace: true });
        }
      })
      .catch((err) => console.log(err))
      .finally(() => setSubmitting(false));
  };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={loginValidationSchema}
      onSubmit={handleSubmit}
    >
      {({
        errors,
        touched,
        values,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
      }) => (
        <form>
          <Text pt={4} pb={6} fontSize="4xl" fontWeight="bold">
            Invigilator Login
          </Text>
          <VStack spacing={5}>
            <FormInput
              isRequired={true}
              label="Lecturer ID"
              handleChange={handleChange}
              handleBlur={handleBlur}
              values={values}
              touched={touched}
              errors={errors}
              name="username"
              type="username"
            />
            <FormInput
              isRequired={true}
              label="Password"
              handleChange={handleChange}
              handleBlur={handleBlur}
              values={values}
              touched={touched}
              errors={errors}
              name="password"
              type="password"
            />
          </VStack>
          <Button
            mt={5}
            colorScheme="yellow"
            type="submit"
            disabled={isSubmitting}
            onClick={handleSubmit}
          >
            Login {isSubmitting ? <Spinner ml={2} color="black" /> : null}
          </Button>
        </form>
      )}
    </Formik>
  );
};

export default LoginForm;
