import useServiceWorker from 'hooks/useServiceWorker'
import useFingerprint from 'hooks/useFingerprint'

import { useRoutes } from 'hookrouter'

import Home from 'pages/Home'
import Lobby from 'pages/Lobby'
import FindLobbies from 'pages/FindLobbies'
import CreateLobby from 'pages/CreateLobby'
import Background from 'components/Background'

const routes = {
  '/lobbies': () => <FindLobbies />,
  '/createLobby': () => <CreateLobby />,
  '/lobbies/:name': ({ name }) => <Lobby name={name} />
}

function App () {
  const routeResult = useRoutes(routes)

  useServiceWorker()
  useFingerprint()

  return (
    <Background hideText={window.location.pathname.startsWith('/lobbies/')}>
      {routeResult || <Home />}
    </Background>
  )
}

export default App

/* HOME - /: CREATE ROOM or FIND ROOM
   CREATE ROOM - INPUT username input, room name, limit, pin, ...etc and redirect to GAME ROOM
   FIND ROOMS - /lobbies:  list all active lobbies and let user to join one and redirect to GAME ROOM
   GAME ROOM - /lobbies/<name>
      - case 1: if user is not in this room - JOIN ROOM asking username
      - case 2: user already in room
      - MICHAM ...
*/
