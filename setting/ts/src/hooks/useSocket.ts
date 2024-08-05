import io from 'socket.io-client';
import { useCallback } from 'react';

const sockets: { [key: string]: SocketIOClient.Socket } = {};
const useSocket = (workspace?: string) => {
  const disconnect = () => {
    if (workspace) {
      sockets[workspace].disconnect();
      delete sockets[workspace];
    }
  };
  if (!workspace) {
    return [undefined, disconnect];
  }
  return [sockets[workspace], disconnect];
};

export default useSocket;
