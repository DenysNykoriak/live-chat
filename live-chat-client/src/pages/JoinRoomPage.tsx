import React, { ChangeEvent, MouseEvent, useState } from 'react'
import { useDispatch } from 'react-redux'
import Alert from '../components/Alert/Alert'
import { useSocket } from '../hooks/useSocket'
import { useTypedDispatch } from '../hooks/useTypedStore'
import { changeName } from '../store/actions/changeName'
import { changeRoom } from '../store/actions/changeRoom'

import './Main.scss';

type Props = {
    socket: ReturnType<typeof useSocket>
}

const JoinRoomPage = (props: Props) => {

    const dispatch = useTypedDispatch();
    const {joinTheRoom, messages, members, setAlert, alert, showAlert, closeAlert} = props.socket;

    const [joinForm, setJoinForm] = useState({
        name: '',
        room: ''
    });

    const updateInfoAndJoin = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        if(joinForm.name.length < 1){
            return setAlert("Name field can't be empty!");
        }else if(joinForm.room.length < 1){
            return setAlert("Room field can't be empty!");
        }

        dispatch(changeName(joinForm.name));
        dispatch(changeRoom(joinForm.room));

        joinTheRoom();
    }

    function updateForm(field: 'name' | 'room'){
        return (e: ChangeEvent<HTMLInputElement>) => {
            let newValue = e.target.value;

            setJoinForm({
                name: (field === 'name') ? newValue : joinForm.name,
                room: (field === 'room') ? newValue : joinForm.room
            })
        }
    }

    return (
        <>
            <div className='wrapper'>
                <aside className='aside'>
                    <div className="aside__room-id-div">
                        <h3 className="aside__room-title">Room Info</h3>
                        <span className="aside__room-id">Room ID: - </span>
                    </div>
                    <div className="aside__members-div">
                        <h3 className="aside__members-title">Room Members</h3>
                        <div className="aside__members"></div>
                    </div>
                </aside>
                <main className='main'>
                    <form className='main-form'>
                        <h2 className='main__title'>Join the room</h2>
                        <div className='main-form__input-container'>
                            <label htmlFor="name" className='main-form__label'>Name</label>
                            <input type="text" className='main-form__input' id="name" value={joinForm.name} onChange={updateForm('name')}/>
                        </div>
                        <div className='main-form__input-container'>
                            <label htmlFor="room" className='main-form__label'>Room</label>
                            <input type="text" className='main-form__input' id="room" value={joinForm.room} onChange={updateForm('room')}/>
                        </div>
                        <button className="main-form__send-button" onClick={updateInfoAndJoin}>Send</button>
                    </form>
                </main>
            </div>
            <Alert showAlert={showAlert} alert_text={alert} alert_time={5000} closeAlert={closeAlert}/>
        </>
    )
}

export default JoinRoomPage