import { ICreateWebSocket } from "../app/types/webSocket";

export const createWebSocket = ({
  socketUrl,
  onOpen,
  onClose,
  onError,
}: ICreateWebSocket): WebSocket | null => {
  const socket = new WebSocket(socketUrl);

  socket.onopen = () => {
    socket.send(JSON.stringify({ op: "unconfirmed_sub" }));
  };

  socket.onmessage = (event) => {
    const data = JSON.parse(event.data);
    onOpen(data);
  };

  socket.onerror = (error) => {
    if (onError) onError(error);
  };

  socket.onclose = () => {
    if (onClose) onClose();
  };

  return socket;
};

export const closeWebSocket = (socket: WebSocket | null) => {
  if (socket) {
    socket.send(JSON.stringify({ op: "unconfirmed_unsub" }));
    socket.close();
  }
};
