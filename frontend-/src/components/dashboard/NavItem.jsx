import { Link, Flex, Icon, Text, MenuButton, Menu } from '@chakra-ui/react';
import { Link as ReactLink } from 'react-router-dom';

const NavItem = ({ icon, title, to }) => {
  return (
    <Flex flexDirection={'column'} w="100%" alignItems="flex-start">
      <Menu>
        <Link
          as={ReactLink}
          to={to}
          _hover={{ textDecoration: 'none', color: 'blue.600' }}
        >
          <MenuButton>
            <Flex>
              <Icon mr={2} as={icon} fontSize="4xl"></Icon>
              <Text fontWeight="semibold" alignSelf="center">
                {title}
              </Text>
            </Flex>
          </MenuButton>
        </Link>
      </Menu>
    </Flex>
  );
};

export default NavItem;
