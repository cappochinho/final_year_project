import {
  Box,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Flex,
  Button,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import StudentService from '../../utils/students.util';

import AddStudentForm from '../../components/students/AddStudentForm';
import StudentsList from '../../components/students/StudentsList';

export default function StudentsPage() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [students, setStudents] = useState(null);
  const [isFetching, setIsFetching] = useState(false);

  const showToastError = () => {
    toast.error('Error Message', {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  useEffect(() => {
    setIsFetching(true);

    StudentService.getStudentList()
      .then((response) => {
        setStudents(response.data);
      })
      .catch((error) => showToastError())
      .finally(() => {
        setIsFetching(false);
      });
  }, []);

  return (
    <>
      {/* Top Bar */}
      <Flex justify="space-between">
        <Text fontWeight="bold" fontSize={'3xl'}>
          Students
        </Text>
        <Button onClick={onOpen} colorScheme="yellow">
          Enroll Student
        </Button>
      </Flex>

      <Modal isOpen={isOpen} onClose={onClose} scrollBehavior="inside">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontWeight="bold">Enroll Student</ModalHeader>

          <ModalCloseButton />
          <ModalBody mb={4}>
            <AddStudentForm onClose={onclose} />
          </ModalBody>
        </ModalContent>
      </Modal>

      {/* Main content */}
      <Box mt={10}>
        <StudentsList students={students} />
      </Box>
    </>
  );
}
