import {
  useDisclosure,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Container,
} from "@chakra-ui/react";
import { AiFillCloseCircle, AiFillCheckCircle } from "react-icons/ai";
import { MdFingerprint } from "react-icons/md";
import "../../styles/pulse.css";
import {useState} from 'react';
import FingerprintService from "../../utils/fingerprints.util";
import { useEffect } from "react";


const FingerprintCheck = ({ isOpen, onClose,setPrintResult,fingerprintResultOnClose,fingerprintResultOnOpen,setModal,setStudent }) => {
  const [latestFingerprint,setLatestFingerprint] = useState(null);

  async function wait(){
    setTimeout(fingerprintResultOnClose,2000)
  }

  const verifyFingerprint = async () => {
    const latestFingerprintData = await FingerprintService.getLatestFingerprint()
    if(latestFingerprint === null){
      console.log(latestFingerprintData.data)
      setLatestFingerprint(latestFingerprintData.data);
      setStudent(latestFingerprintData.data.student.full_name)
      if(latestFingerprintData.data.state === true){
        setPrintResult(true);
        fingerprintResultOnOpen()
        await wait()
      }else{
        setPrintResult(false);
        fingerprintResultOnOpen()
        await wait()
      }
      }else if(latestFingerprint.id !== latestFingerprintData.data.id){
        console.log(latestFingerprintData.data)
        setLatestFingerprint(latestFingerprintData.data);
        setStudent(latestFingerprintData.data.student.full_name)
        if(latestFingerprintData.data.state === true){
          console.log(latestFingerprintData.data.student)
          setPrintResult(true);
          fingerprintResultOnOpen()
          await wait()
        }else{
          console.log(latestFingerprintData.data.student)
          setPrintResult(false);
          fingerprintResultOnOpen()
          await wait()
        }
      }
  }

  useEffect(()=>{
    const interval = setInterval(async ()=>{
      await verifyFingerprint()
    },2000)
    return () => clearInterval(interval);
  },[latestFingerprint])
  return (
    <>
      <Modal isOpen={isOpen} onClose={()=>{onClose();setModal(false)}} closeOnOverlayClick={false}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Checking Fingerprint</ModalHeader>
          <ModalBody>
            <Container centerContent>
              <MdFingerprint size="10em" className="fingerprint" />
            </Container>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={()=>{
              onClose();
              setModal(false)}}>
              Stop
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

const FingerprintResult = ({ state, isOpen, onClose,student }) => {
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Student Room Allocation</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Container centerContent>
              {state ? (
                <AiFillCheckCircle color="green" size="10em" />
              ) : (
                <AiFillCloseCircle color="red" size="10em" />
              )}
              {state
                ? `${student} has been allocated to this room`
                : `${student} has not been allocated to this room`}
            </Container>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export { FingerprintCheck, FingerprintResult };
