import { useEffect, useState } from 'react';
import io from "socket.io-client";
import { Marker } from 'google-maps-react';
import privadoIcon from './map-component/privadoIcon.png';

function App() {
  const [socket, setSocket] = useState(null);
  const [socketConnected, setSocketConnected] = useState(false);
  const [dt, setDt] = useState('');

  // establish socket connection
  useEffect(() => {
    setSocket(io('http://localhost:4000'));
  }, []);

  // subscribe to the socket event
  useEffect(() => {
    if (!socket) return;

    socket.on('connect', () => {
      setSocketConnected(socket.connected);
      subscribeToDateEvent();
    });
    socket.on('disconnect', () => {
      setSocketConnected(socket.connected);
    });

    socket.on("getDisponibilidad", data => {
      setDt(data);
    });

  }, [socket]);

  // subscribe to socket disponibilidad event
  const subscribeToDateEvent = (interval = 5000) => {
    socket.emit('subscribeToDateEvent', interval);
  }

  //const marker = document.getElementById("1");
  
  console.log(document.getElementsByTagName('*'));

  if(dt == 'libre'){
    //marker.setState('icon', 'privadoIcon')
  }else{
    //marker.setIcon();
  }
  return null;
}

export default App;