import React from 'react';
import { useEffect, useState } from 'react';
import { Marker } from 'google-maps-react';
import io from "socket.io-client";
import MapComponent from "./map-component";
import sensorIcon from "./map-component/sensorIcon.png";

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
  
  if(new String(dt) == "001,libre"){
    return (<MapComponent latitude={-34.617247} longitude={-58.383013} idSensor={1}></MapComponent>);
    }else{
      if(new String(dt) == "001,ocupado"){
        return (<MapComponent></MapComponent>);
      }else{
        return null;
      }
    }
}

export default App;