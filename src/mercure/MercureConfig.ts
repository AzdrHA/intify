export const mercureConfig = {
  path: 'http://127.0.0.1:1080/.well-known/mercure',
  token: {
    'subscription': 'eyJhbGciOiJIUzI1NiJ9.eyJtZXJjdXJlIjp7InB1Ymxpc2giOlsiKiJdLCJzdWJzY3JpYmUiOlsiKiJdfX0.7F1zGrvfms5snJnQCuir8zuRvJfFKBLXOnEkGUBpuok',
    'publication': 'eyJhbGciOiJIUzI1NiJ9.eyJtZXJjdXJlIjp7InB1Ymxpc2giOlsiKiJdLCJzdWJzY3JpYmUiOlsiKiJdfX0.hkywduiXLIzQ-3FjBDkVe1TaJ8WN47oWOq5vRSJZcqs',
  },
  routes: {
    channels: {
      create_message: 'channels/:id/messages',
      start_typing: 'channels/:id/messages/start/typing',
      stop_typing: 'channels/:id/messages/stop/typing',
    },
  },
};
