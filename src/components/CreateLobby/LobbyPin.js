import {
  Box,
  Grid,
  Flex,
  Text,
  PinInput,
  PinInputField
} from '@chakra-ui/react'

export default function LobbyPin ({ pin, onSubmit }) {
  return (
    <>
      <Text mt={4}>
        Pin (optional)
      </Text>
      <Grid
        width='100px'
        height='39px'
        mt='12px'
        placeItems='center'
        bg='linear-gradient(180deg, #E3E3E3 0%, #C2C2C2 100%)'
        boxShadow='0px 5px 6px rgba(0, 0, 0, 0.25)'
        borderRadius='25px'
      >
        <Flex
          width='92px'
          color='black'
        >
          <PinInput
            size='l'
            variant='unstyled'
            defaultValue={pin}
            onComplete={onSubmit}
          >
            <PinInputField
              fontSize='23px'
              lineHeight='23px'
              fontWeight='bold'
            />
            <Box w='1px' h='38px' bg='#9C9C9C' />
            <PinInputField
              fontSize='23px'
              lineHeight='23px'
              fontWeight='bold'
            />
            <Box w='1px' h='38px' bg='#9C9C9C' />
            <PinInputField
              fontSize='23px'
              lineHeight='23px'
              fontWeight='bold'
            />
            <Box w='1px' h='38px' bg='#9C9C9C' />
            <PinInputField
              fontSize='23px'
              lineHeight='23px'
              fontWeight='bold'
            />
          </PinInput>
        </Flex>
      </Grid>
    </>
  )
}
