import { Heading, Link } from '@chakra-ui/react';
import { Link as ReactLink } from 'react-router-dom';

const LabelLogo = () => {
  return (
    <Link
      as={ReactLink}
      to="/"
      style={{ textDecoration: 'none' }}
      fontSize="2xl"
      fontWeight="bold"
    >
      <Heading fontSize="2xl">Attendly</Heading>
    </Link>
  );
};

export default LabelLogo;
