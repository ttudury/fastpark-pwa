const socket = io();

socket.on('distance', function(data) {
  console.log(data);
});