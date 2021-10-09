const socketEvents = {
  connect: 'connect',
  disconnect: 'disconnect',
  reconnect: 'custom_reconnect',
} as const;

export default socketEvents;
