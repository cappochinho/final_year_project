import {
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Flex,
  Button,
  Text,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  useDisclosure,
} from '@chakra-ui/react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import FormInput from '../../components/forms/FormInput';

export default function FingerPrint() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialValues = {
    student: '',
    file: '',
  };

  const enrollFingerprintValidationSchema = Yup.object().shape({
    student: Yup.string().required('Student is required'),
  });

  const handleSubmit = (values, { setSubmitting, setErrors }) => {
    console.log(values);
  };
  return (
    <>
      {/* Top Bar */}
      <Flex justify="space-between">
        <Text fontWeight="bold" fontSize={'3xl'}>
          Fingerprints
        </Text>
        <Button onClick={onOpen} colorScheme="yellow">
          Enroll Student Fingerprint
        </Button>
      </Flex>

      {/* Modal for add fingerprint form */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontWeight="bold">
            Enroll Student Fingerprint
          </ModalHeader>

          <ModalCloseButton />
          <ModalBody mb={4}>
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
                <form method="POST">
                  <FormInput
                    name="student"
                    label="Student"
                    type="text"
                    list="data"
                    errors={errors}
                    touched={touched}
                    values={values}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                  />
                  <datalist id="data">
                    <option value="Gabriel Rockson - level (400) - Electrical Engineering">
                      Gabriel Rockson
                    </option>
                    <option value="Gideon Asante - level (400) - Computer Engineering">
                      Gideon Asante
                    </option>
                  </datalist>
                  <FormInput
                    name="file"
                    label="Template File"
                    type="file"
                    errors={errors}
                    touched={touched}
                    values={values}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                  />

                  <Button
                    mt={5}
                    colorScheme="green"
                    type="submit"
                    disabled={isSubmitting}
                    onClick={handleSubmit}
                  >
                    Enroll Fingerprint
                  </Button>
                </form>
              )}
            </Formik>
          </ModalBody>
        </ModalContent>
      </Modal>

      {/* Main content */}
      <Flex></Flex>
    </>
  );
}
