import { useState } from 'react';

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

const StudentsList = ({ students }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [id, setId] = useState(null);

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
          <TableCaption>All enrolled students</TableCaption>
          <Thead>
            <Tr>
              <Th>Full Name</Th>
              <Th>Student ID</Th>
              <Th>Index Number</Th>
              <Th>Programme</Th>
            </Tr>
          </Thead>
          <Tbody>
            {students?.map((student) => (
              <Tr key={student.id}>
                <Td>{student.full_name}</Td>
                <Td>{student.student_id}</Td>
                <Td>{student.index_number}</Td>
                <Td>{student.programme_name}</Td>
                <Td>
                  {student.fingerprint ? (
                    <Text>Fingerprint Enrolled</Text>
                  ) : (
                    <Button
                      colorScheme="orange"
                      onClick={() => openModal(student.id)}
                    >
                      Enroll Fingerprint
                    </Button>
                  )}
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
};
// TODO: Add filter so a student can be searched
export default StudentsList;
