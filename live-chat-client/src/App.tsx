import React, { useEffect } from 'react'
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import { useSocket } from './hooks/useSocket';
import JoinRoomPage from './pages/JoinRoomPage';
import RoomPage from './pages/RoomPage';

import './Base.scss';

type Props = {}

const App = (props: Props) => {

    const socket = useSocket();
    const navigate = useNavigate();

    useEffect(() => {
        if(socket.nowAction === 'open-chat'){
            socket.clearAction();
            navigate('/room');
        }
    }, [socket.nowAction]);

    return (
        <Routes>
            <Route path='/room' element={<RoomPage socket={socket}/>}/>
            <Route path='*' element={<JoinRoomPage socket={socket}/>}/>
        </Routes>
    )
}

export default App