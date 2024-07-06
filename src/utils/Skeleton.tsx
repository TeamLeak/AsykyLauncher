import React from 'react';
import { Box, Spinner } from '@chakra-ui/react';

const Skeleton: React.FC = () => (
  <Box display="flex" justifyContent="center" alignItems="center" height="100%">
    <Spinner size="xl" />
  </Box>
);

export default Skeleton;
