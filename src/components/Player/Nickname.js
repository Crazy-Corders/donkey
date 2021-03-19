import { useRef, useState } from 'react'

import { useLobby } from 'context/LobbyContext'

import {
  Box,
  Input,
  InputGroup,
  InputRightAddon
} from '@chakra-ui/react'

import { motion } from 'framer-motion'
const MotionBox = motion(Box)

export default function Nickname ({ playerID, position }) {
  const lobby = useLobby()

  const inputRef = useRef()

  const [value, setValue] = useState(lobby.getPlayer(playerID).nickname)

  const [isEditing, setIsEditing] = useState(false)

  const onEdit = () => {
    setIsEditing(true)
  }

  const onChange = (e) => {
    // disallow white spaces
    // force to uppercase
    // limit characters to 9
    setValue(e.target.value.trim().toUpperCase().slice(0, 9))
  }

  const handleBlur = () => {
    lobby.setMyNickname(value)
    setIsEditing(false)
    inputRef.current.blur()
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleBlur()
    }
  }

  const remainingCards = lobby.countPlayerCards(playerID)

  return (
    <MotionBox
      position='absolute'
      left={`${parseInt(position.left) - (['PREGAME', 'ENDGAME'].includes(lobby.table.state) ? 10 : 20)}px`}
      right={`${parseInt(position.right) - (['PREGAME', 'ENDGAME'].includes(lobby.table.state) ? 10 : 20)}px`}
      top={`${parseInt(position.top) - 26}px`}
      bottom={`${parseInt(position.bottom) - 23}px`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { delay: 2, duration: 0.8 } }}
    >
      <InputGroup alignItems='center'>
        <Input
          ref={inputRef}
          value={value}
          width='9ch'
          height='18px'
          minWidth='0px'
          minHeight='0px'
          display='grid'
          color='black'
          bg='linear-gradient(180deg, #E3E3E3 0%, #C2C2C2 100%)'
          boxShadow='0px 5px 6px rgba(0, 0, 0, 0.25)'
          borderRadius='25px'
          fontSize='16px'
          lineHeight='16px'
          fontWeight='bold'
          textAlign='center'
          m='3px'
          mb={isEditing ? '60px' : 0}
          p='0px 3px'
          _active={{ bg: '' }}
          _hover={{ bg: '' }}
          onFocus={onEdit}
          onChange={onChange}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          isDisabled={playerID !== lobby.getMyself().playerID}
          _disabled={{ bg: '' }}
        />
        {['DEALING', 'GAME', 'ENDGAME'].includes(lobby.table.state) && remainingCards !== 0 && !isEditing && (
          <InputRightAddon
            height='18px'
            width='17px'
            color='black'
            fontSize='16px'
            fontWeight='bold'
            p='0px'
            borderRadius='25px'
            bg='linear-gradient(180deg, #E3E3E3 0%, #C2C2C2 100%)'
            mt='3px'
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0, transition: { duration: 0.3 } }}
          >
            <Box textAlign='center' w='17px'>
              {remainingCards}
            </Box>
          </InputRightAddon>
        )}
      </InputGroup>
    </MotionBox>
  )
}
