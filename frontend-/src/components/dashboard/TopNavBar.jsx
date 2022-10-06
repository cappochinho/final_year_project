import { Text, Flex, Avatar } from '@chakra-ui/react';
import LabelLogo from '../LabelLogo';

const TopNavBar = () => {
  return (
    <Flex
      pos="sticky"
      top={0}
      right={0}
      py={5}
      px={5}
      justify="space-between"
      boxShadow="lg"
      bg={'white'}
    >
      <LabelLogo />

      <Flex>
        <Avatar size="sm" colorScheme="yellow" />
        <Text alignSelf="center" fontWeight={'bold'} ml={2}>
          Joshua Asuman
        </Text>{' '}
        {/* TODO: add lecturer's name here */}
        {/* FIXME: The buttons pass over me */}
      </Flex>
    </Flex>
  );
};

export default TopNavBar;
