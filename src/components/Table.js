import { useLobby } from 'context/LobbyContext'

import { Flex, useBreakpointValue } from '@chakra-ui/react'

import Players from 'components/Players'
import CutAnimation from 'components/TableContent/CutAnimation'
import PreLobbyHost from 'components/TableContent/PreLobbyHost'
import PreLobbyGuest from 'components/TableContent/PreLobbyGuest'
import DealingAnimation from 'components/TableContent/DealingAnimation'
import LobbyHostOffline from 'components/TableContent/LobbyHostOffline'
import EndGameAnimation from 'components/TableContent/EndGameAnimation'
import DiscardPile from 'components/TableContent/DiscardPile'
import DiscardAnimation from 'components/TableContent/DiscardAnimation'

import { motion } from 'framer-motion'

const MotionFlex = motion(Flex)

export default function Table () {
  const lobby = useLobby()

  const scale = useBreakpointValue({ base: 0.6, iphone5: 0.7, iphone6: 0.9, iphone8: 1, ipad: 1.5 })

  return (
    <MotionFlex
      width='242px'
      height='470px'
      justifyContent='center'
      alignItems='center'
      background='linear-gradient(180deg, #363C67 0%, #2A2E54 100%)'
      boxShadow='0px 5px 6px 5px rgba(0, 0, 0, 0.25)'
      borderRadius='200px'
      position='relative'
      mt='-50px'
      initial={{ scale: 0 }}
      animate={{ scale, transition: { duration: 0.5 } }}
    >
      <Flex
        width='215px'
        height='440px'
        justifyContent='center'
        alignItems='center'
        position='absolute'
        background='linear-gradient(180deg, #464D86 0%, #2A2E54 100%)'
        boxShadow='0px 4px 4px rgba(0, 0, 0, 0.25)'
        borderRadius='200px'
      >
        <Flex
          w='100%'
          height='100%'
          justifyContent='center'
          alignItems='center'
          position='relative'
        >
          {!lobby.isHostOnline() && <LobbyHostOffline />}
          {lobby.isHostOnline() && lobby.table.state === 'PREGAME' && lobby.amIHost() && <PreLobbyHost />}
          {lobby.isHostOnline() && lobby.table.state === 'PREGAME' && !lobby.amIHost() && <PreLobbyGuest />}
          {lobby.isHostOnline() && lobby.table.state === 'DEALING' && <DealingAnimation />}
          {lobby.isHostOnline() && lobby.table.state === 'GAME' && lobby.hasDiscard() && <DiscardPile />}
          {lobby.isHostOnline() && lobby.table.tableCardsFull && !lobby.gotCut && <DiscardAnimation />}
          {lobby.isHostOnline() && lobby.table.gotCut && <CutAnimation />}
          {lobby.isHostOnline() && lobby.table.donkey && <EndGameAnimation />}
        </Flex>
        <Players />
      </Flex>
    </MotionFlex>
  )
}

/*
  TODO LIST:
  - BUG: Fix My hand cards scroll
  - SHOW 1 2 3 BADGES
  -  CUT ANIMATION
    - REFACTOR CUT ANIMATION WITH MOTION CONTROLS
    - MAKE TABLE CARDS TRANSITION TO GOT CUT PLAYER's TABLE CARD
  - Optimize images
*/
