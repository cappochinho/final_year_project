import { Flex, Box } from '@chakra-ui/react';
import SideBar from '../../components/dashboard/SideBar';
import TopNavBar from '../../components/dashboard/TopNavBar';
import { Outlet } from 'react-router-dom';

export default function Dashboard() {
  return (
    <Flex flexDirection={'row'}>
      <SideBar />

      <Box w="calc(100% - 250px)">
        <TopNavBar />
        <Box px={5} py={5}>
          <Outlet />
        </Box>
      </Box>
    </Flex>
  );
}
