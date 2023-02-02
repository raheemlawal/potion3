import React from 'react';
import {
  ChakraProvider,
  Box,
  Text,
  VStack,
  Grid,
  theme,
  Heading,
  Input,
  Button,
  Badge,
  HStack,
  PinInput,PinInputField
} from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Box textAlign="center" fontSize="xl">
        <Grid minH="100vh" p={2}>
          <ColorModeSwitcher justifySelf="flex-end" />
          <VStack spacing={4}>
            <Heading
              fontWeight={600}
              fontSize={{ base: '4xl', sm: '5xl', lg: '7xl' }}>
              <Text as={'span'} position={'relative'}>potion</Text>
              <Badge colorScheme='purple' position={'absolute'}>3</Badge>
            </Heading>
            <Input placeholder='' width={'sm'}></Input>
            <HStack>
            <PinInput placeholder=''>
              <PinInputField />
              <PinInputField />
              <PinInputField />
              <PinInputField />
              <PinInputField />
              <PinInputField />
              <PinInputField />
              <PinInputField />
            </PinInput>
            </HStack>
            <Button width={'sm'}>Unlock</Button>
          </VStack>
        </Grid>
      </Box>
    </ChakraProvider>
  );
}

export default App;
