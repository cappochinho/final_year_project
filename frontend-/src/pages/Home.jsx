import {
  Box,
  Text,
  Button,
  Flex,
  Heading,
  Spacer,
  ButtonGroup,
} from '@chakra-ui/react';
import LabelLogo from '../components/LabelLogo';
import { Player, Controls } from '@lottiefiles/react-lottie-player';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();

  return (
    <Box px="10rem">
      <Flex py={4}>
        <LabelLogo /> <Spacer />
        <ButtonGroup gap={1}>
          <Button
            colorScheme="twitter"
            fontSize="lg"
            variant="ghost"
            onClick={() => navigate('/login')}
          >
            login
          </Button>
          <Button
            colorScheme="yellow"
            fontSize="lg"
            onClick={() => navigate('/dashboard/students/')}
          >
            Start Recording Attendance
          </Button>{' '}
          {/* TODO: make the button navigate to the dashboard */}
        </ButtonGroup>{' '}
      </Flex>

      <Box py={5}>
        <Text fontWeight="extrabold" Align="center" fontSize="5xl">
          KNUST EXAM ATTENDANCE SOFTWARE
        </Text>
        <Flex alignContent="center" height="70vh" justify="center">
          <Player
            autoplay
            loop
            src="https://assets9.lottiefiles.com/packages/lf20_crwpngvr.json"
            style={{ height: '100%', width: '100%' }}
          >
            <Controls
              visible={false}
              buttons={['play', 'repeat', 'frame', 'debug']}
            />
          </Player>
        </Flex>
      </Box>
    </Box>
  );
}
