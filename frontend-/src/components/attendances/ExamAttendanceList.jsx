import { useState } from 'react';
import Moment from 'moment';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Text,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from '@chakra-ui/react';

import EnrollFingerprintForm from '../students/EnrollFingerprintForm';

const StudentsList = ({ examAttendances }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [id, setId] = useState(null);
  const format1 = 'dddd, MMMM Do YYYY, h:mm:ss a';
  const openModal = (id) => {
    setId((prevId) => id);
    onOpen();
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} scrollBehavior="inside">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontWeight="bold">
            Enroll Student Fingerprint
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody mb={4}>
            <EnrollFingerprintForm id={id} />
          </ModalBody>
        </ModalContent>
      </Modal>

      <TableContainer>
        <Table variant="simple">
          <TableCaption>All Examination Attendances</TableCaption>
          <Thead>
            <Tr>
              <Th>Exam Name</Th>
              <Th>Course Code</Th>
              <Th>Level</Th>
              <Th>Exam Start Date</Th>
              <Th>Exam End Date</Th>
              <Th>Exam Room</Th>
            </Tr>
          </Thead>
          <Tbody>
            {examAttendances?.map((examAttendance) => {
              const start_time = Moment(examAttendance.exam['start']).format(
                format1
              );
              const end_time = Moment(examAttendance.exam['end']).format(
                format1
              );

              return (
                <Tr key={examAttendance.id}>
                  <Td>{examAttendance.exam['course_name']}</Td>
                  <Td>{examAttendance.exam['course_code']}</Td>
                  <Td>{examAttendance.exam['level']}</Td>
                  <Td>{start_time}</Td>
                  <Td>{end_time}</Td>
                  <Td>{examAttendance.room['name']} </Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
};
// TODO: Add filter so a student can be searched
export default StudentsList;
