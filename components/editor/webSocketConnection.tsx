import { useState, useEffect } from 'react';

interface UseWebSocketReturnType {
  socket: WebSocket | null;
  sendMessage: (message: string) => void;
  onMessage: (callback: (event: MessageEvent) => void) => void;
}

function useWebSocket(): UseWebSocketReturnType {
  const [socket, setSocket] = useState<WebSocket | null>(null);

  useEffect(() => {
    const newSocket = new WebSocket('ws://localhost:8000/ws');
    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, []);

  const sendMessage = (message: string) => {
    if (socket) {
      socket.send(message);
    }
  };

  const onMessage = (callback: (event: MessageEvent) => void) => {
    if (socket) {
      socket.addEventListener('message', callback);
    }
  };

  return { socket, sendMessage, onMessage };
}

export default useWebSocket;
