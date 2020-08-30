const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO.listen(server);


server.listen(3000);

app.use(express.static(__dirname));

server.listen(3000, () => console.log('server on port 3000'));

const SerialPort = require('serialport');
const ReadLine = SerialPort.parsers.Readline;

const port = new SerialPort('\\\\.\\COM3', { //PUERTO QUE UTILIZA ARDUINO
  baudRate: 9600//VALOR DEL BAUDIO EN ARDUINO
});

const parser = port.pipe(new ReadLine({ delimiter: '\r\n' })); //PROPIEDAD: LECTURA Y LINEA

parser.on('open', function () {
  console.log('connection is opened');
});

parser.on('data', function (data) {
  let distance = parseInt(data,10);
  console.log(distance);
  io.emit('distance',data);
});

parser.on('err', function (err) {
  console.log(err);
});

parser.on('close', function () {
    console.log('connection is opened');
});