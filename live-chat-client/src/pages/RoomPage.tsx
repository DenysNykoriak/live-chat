import React, { MouseEvent, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Alert from '../components/Alert/Alert';
import { useSocket } from '../hooks/useSocket'
import { useTypedSelector } from '../hooks/useTypedStore'

import './Main.scss';

type Props = {
    socket: ReturnType<typeof useSocket>
}

const RoomPage = (props: Props) => {

    const [message, setMessage] = useState('');

    const navigate = useNavigate();
    let { room: nowRoom, name } = useTypedSelector((state) => state.chat);

    const { members, messages, showAlert, setAlert, closeAlert, alert, sendMessage } = props.socket;

    useEffect(() => {
        if(nowRoom === ''){
            navigate('/');
        }
    }, []); 

    //AutoScroll

    let messagesZone = useRef<HTMLDivElement>();
    let lastMessageRef = useRef<HTMLDivElement>();

    let [oldScrollHeight, setOldScrollHeight] = useState<number>(0);

    useEffect(() => {
        if(messagesZone.current.scrollTop + messagesZone.current.clientHeight === oldScrollHeight){
            lastMessageRef.current.scrollIntoView({behavior: 'smooth'});
        }else if(messages && messages[messages.length - 1]?.user === name){
            lastMessageRef.current.scrollIntoView({behavior: 'smooth'});
        }
        setOldScrollHeight(messagesZone.current.scrollHeight);
    }, [messages]);

    //Send Message
    const sendMessageHandler = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        if(message.length < 1) {
            return setAlert("Fill in the message field before sending");
        }

        sendMessage(message);
        setMessage('');
    }

    return (
        <>
            <div className='wrapper'>
                <aside className='aside'>
                    <div className="aside__room-id-div">
                        <h3 className="aside__room-title">Room Info</h3>
                        <span className="aside__room-id">Room ID: {nowRoom} </span>
                    </div>
                    <div className="aside__members-div">
                        <h3 className="aside__members-title">Room Members</h3>
                        <div className="aside__members">
                            <div className='aside__member'>
                                <span className='aside__member-span'>{name} (You)</span>
                            </div>
                            {members.filter(member => member !== name).map((member, index) => {
                                return <div className='aside__member' key={index}>
                                    <span className='aside__member-span'>{member}</span>
                                </div>
                            })}
                        </div>
                    </div>
                </aside>
                <main className='main'>
                    <div className="main__chat-zone" ref={messagesZone}>
                        {messages.map((message, index) => {
                            return <div className='message' key={index} ref={lastMessageRef}>
                                <div className='message__info'>
                                    <span className='message__author'>{message.user}</span>
                                    <span className='message__date'>{message.date.format("hh:mm D/M")}</span>
                                </div>
                                <span className='message__span'>{message.message}</span>
                            </div>
                        })}
                    </div>
                    <form className="main__send-form">
                        <div className='main__send-input-div'>
                            <label htmlFor="message" className='main__send-label'>Message</label>
                            <input type="text" className='main__send-input' id="message" value={message} onChange={(e) => setMessage(e.target.value)}/>
                        </div>
                        <button className='main__send-button' onClick={sendMessageHandler}>Send</button>
                    </form>
                </main>
            </div>
            <Alert showAlert={showAlert} alert_text={alert} alert_time={5000} closeAlert={closeAlert}/>
        </>
    )
}

export default RoomPage