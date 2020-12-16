import React from 'react';
import { useEffect, useState } from 'react';
import loadingGif from './loading.gif'
import io from "socket.io-client";
import MapComponent from "./map-component";

function App() {
  const [socket, setSocket] = useState(null);
  const [socketConnected, setSocketConnected] = useState(false);
  const [dt, setDt] = useState('');

  // establish socket connection
  useEffect(() => {
      setSocket(io('https://pablo-dfd9133f.localhost.run/'));
  }, []);

  // subscribe to the socket event
  useEffect(() => {
    if (!socket) return;

    socket.on('connect', () => {
      setSocketConnected(socketConnected, true);
      subscribeToDateEvent();
    });
    socket.on('disconnect', () => {
      setSocketConnected(socketConnected, false);
    });

    socket.on("getDisponibilidad", data => {
      setDt(data);
    });

  }, [socket, socketConnected]);

  // subscribe to socket disponibilidad event
  const subscribeToDateEvent = (interval = 5000) => {
    socket.emit('subscribeToDateEvent', interval);
  }
  
   if(dt === "001,libre"){
     return (<MapComponent latitude={-34.617247} longitude={-58.383013} idSensor={1}></MapComponent>);
     }else{
       if(dt === "001,ocupado"){
          return (<MapComponent ></MapComponent>);

       }else{
         return (
           <div
             style={loadingStyle}>
             <img
               src={loadingGif}
               alt={"loading..."}
               style={loadingStyle}>
             </img>
           </div>);
       }
     }
 }

const loadingStyle = {
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

export default App;