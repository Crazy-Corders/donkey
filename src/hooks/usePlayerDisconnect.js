import { useEffect } from 'react'

import database from 'utils/firebase'

export default function usePlayerDisconnect (settings) {
  const myPlayerID = window.localStorage.getItem('playerID')

  useEffect(() => {
    if (settings && settings.name) {
      // offline presence check

      // stores the timestamp of my last disconnect (the last time I was seen online)
      const playerLastOnlineRef = database().ref(`${settings.name}/players/${myPlayerID}/lastOnline`)

      // stores the timestamp of host's last disconnect (the last time host was seen online)
      const hostLastOnlineRef = database().ref(`${settings.name}/settings/host/lastOnline`)

      // listen for connected event
      database().ref('.info/connected').on('value', (snap) => {
        if (snap.val() === true) {
          // we're connected (or reconnected)! remove my lastOnline
          playerLastOnlineRef.remove()

          // when I disconnect, update the last time I was seen online
          playerLastOnlineRef.onDisconnect().set(database.ServerValue.TIMESTAMP)

          // if I am the lobby host
          if (myPlayerID === settings.host.playerID) {
            // on connect (or reconnect), remove host lastOnline
            hostLastOnlineRef.remove()
            // on disconnect, update the last time host was online
            hostLastOnlineRef.onDisconnect().set(database.ServerValue.TIMESTAMP)
          }
        }
      })
    } // eslint-disable-next-line
  }, [settings?.name])
}
