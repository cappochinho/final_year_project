import { Flex, Heading, Box } from '@chakra-ui/react';
import LabelLogo from '../components/LabelLogo';
import LoginForm from '../components/login/LoginForm';

export default function LoginPage() {
  return (
    <Box px="10rem">
      <Flex pt="2rem">
        <LabelLogo />{' '}
      </Flex>
      <Flex justify="center" pt={20}>
        <Box w={400} p={5} boxShadow="md">
          <LoginForm />
        </Box>
      </Flex>
    </Box>
  );
}
