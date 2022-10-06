import { useNavigate } from 'react-router-dom';
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
import ExamAttendanceService from '../../utils/exam-attendance.utils';

import AddStudentForm from '../../components/students/AddStudentForm';
import ExamAttendanceList from '../../components/attendances/ExamAttendanceList.jsx';

export default function ExamAttendancePage() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [examAttendances, setExamAttendances] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsFetching(true);

    ExamAttendanceService.getExamAttendanceList()
      .then((response) => {
        setExamAttendances(response?.data);
      })
      .catch((error) => console.log(error))
      .finally(() => {
        setIsFetching(false);
      });
  }, []);

  return (
    <>
      {/* Top Bar */}
      <Flex justify="space-between">
        <Text fontWeight="bold" fontSize={'3xl'}>
          All Exam Attendance Records
        </Text>
        <Button
          onClick={() => navigate('/dashboard/record-attendance')}
          colorScheme="yellow"
        >
          Record New Attendance
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
        <ExamAttendanceList examAttendances={examAttendances} />
      </Box>
    </>
  );
}
