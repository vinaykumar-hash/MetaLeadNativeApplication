let io = null;

function init(socketIoInstance) {
  io = socketIoInstance;

  io.on('connection', (socket) => {
    console.log(`Socket client connected: ${socket.id}`);

    socket.on('disconnect', (reason) => {
      console.log(`Socket client disconnected: ${socket.id} (${reason})`);
    });
  });
}

function emitNewLead(lead) {
  if (!io) {
    console.error('Socket.IO not initialised — cannot emit lead');
    return;
  }
  io.emit('new_lead', lead);
  console.log('Lead emitted to connected clients');
}

module.exports = { init, emitNewLead };
