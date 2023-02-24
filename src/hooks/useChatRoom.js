import { useEffect } from 'react';
import { createConnection, Connection  } from './Connection';
// import { showNotification } from './notifications';
import { Notifier } from './Notifier';

export default function useChatRoom({ serverUrl, roomId }) {
  const notifier = new Notifier()
  useEffect(() => {
    const options = {
      serverUrl: serverUrl,
      roomId: roomId
    };

    const connection = new Connection(options)

    connection.connect();
    connection.on('message', (msg) => {
      notifier.showNotification('New message: ' + msg);
    });
    return () => connection.disconnect();
  }, [roomId, serverUrl]);

}
