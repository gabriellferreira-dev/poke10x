import { extendTheme } from '@chakra-ui/react';

import '@fontsource/poppins';
import '@fontsource/josefin-sans';

const theme = extendTheme({
  fonts: {
    heading: 'Josefin Sans, sans-serif',
    body: 'Poppins, sans-serif',
  },
});

export default theme;
