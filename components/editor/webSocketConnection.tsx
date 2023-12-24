import { useEffect, useState } from 'react';

export const useWebSocket = (url: string, onMessage: (message: any) => void) => {
  const [socket, setSocket] = useState<WebSocket | null>(null);

  useEffect(() => {
    const ws = new WebSocket(url);

    ws.onopen = () => {
      console.log('WebSocket connection opened.');
    };

    ws.onmessage = (e) => {
      const message = JSON.parse(e.data);
      onMessage(message);
    };

    ws.onclose = () => {
      console.log('WebSocket connection closed.');
    };

    setSocket(ws);

    return () => {
      console.log('Component unmounted. Closing WebSocket connection.');
      ws.close();
    };
  }, [url, onMessage]);

  const sendMessage = (message: string) => {
    if (socket) {
      socket.send(message);
    }
  };

  return { socket, sendMessage };
};