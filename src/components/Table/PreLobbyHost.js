import { useLobby } from 'context/LobbyContext'

import { Text, Flex, Button } from '@chakra-ui/react'

import LoadingInline from 'components/LoadingInline'

export default function PreLobbyHost () {
  const lobby = useLobby()

  const playersCount = lobby.countAllPlayers()

  const onStartGame = lobby.startDealing

  return (
    <Flex
      width='100%'
      height='100%'
      bg='rgba(0, 0, 0, 0.5)'
      placeItems='center'
      overflow='hidden'
      borderRadius='200px'
      flexDirection='column'
      justifyContent='center'
      fontWeight='bold'
      position='absolute'
    >
      <Text
        fontSize='24px'
        lineHeight='24px'
        width='69px'
        textAlign='center'
      >
        Waiting <br /> For <br /> Players <br /> {playersCount} / {lobby.settings.maxPlayers}
      </Text>
      <LoadingInline />
      <Button
        mt='50px'
        color='black'
        zIndex='1'
        width='80px'
        height='40px'
        fontSize='18px'
        lineHeight='18px'
        fontWeight='bold'
        background='linear-gradient(180deg, #45DB54 0%, #197027 100%)'
        boxShadow='0px 5px 6px rgba(0, 0, 0, 0.25)'
        borderRadius='25px'
        _active={{ bg: '' }}
        _hover={{ bg: '' }}
        isDisabled={playersCount < 2}
        onClick={onStartGame}
      >
        Start Game
      </Button>
    </Flex>
  )
}
