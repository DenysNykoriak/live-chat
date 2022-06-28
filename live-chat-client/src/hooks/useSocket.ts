import moment from "moment";
import { useEffect, useState } from "react";
import config from "../config";
import { useTypedSelector } from "./useTypedStore";

type NewMessageDataType = {
    type: "new-message",
    user: string,
    message: string
}

type NewConnectionDataType = {
    type: "new-connection",
    user: string,
    room: string
}

type SystemMessageType = {
    type: 'system-message',
    action: null | 'open-chat',
    message_type: 'alert' | 'message',
    message: string
}

type UpdateMembersMessageType = {
    type: 'update-members',
    members: string[]
}

type MessageType = {
    type: 'message',
    user: string,
    message: string
}

const ws = new WebSocket(config.server_socket_url);

function decodeWSData(data: string){
    try {
        let decodedData: SystemMessageType | MessageType | UpdateMembersMessageType = JSON.parse(data);

        if(decodedData.type === 'system-message'){
            return decodedData;
        }else if(decodedData.type === 'message'){
            return decodedData;
        }else if(decodedData.type === 'update-members'){
            return decodedData;
        }

        return null;
    } catch (err) {
        return null;
    }
}

export function useSocket(){

    let roomState = useTypedSelector((state) => state.chat);

    //Messages
    const [messages, setMessages] = useState<{user: string, message: string, date: moment.Moment}[]>([]);

    //Alert
    const [alert, setAlert] = useState<string>('');
    const [showAlert, setShowAlert] = useState<boolean>(false);

    //Action
    const [nowAction, setNowAction] = useState<null | 'open-chat'>(null);

    //Members
    const [members, setMembers] = useState<string[]>([]);

    ws.onmessage = (event) => {
        let decodedData = decodeWSData(event.data);

        switch(decodedData.type){
            case "system-message":
                if(decodedData.message_type === 'message') setMessages([...messages, {user: 'System', message: decodedData.message, date: moment()}]);

                if(decodedData.message_type === 'alert') {
                    setAlert(decodedData.message);
                    setShowAlert(true);
                }

                if(decodedData.action !== null) setNowAction(decodedData.action);

            break;
            case "message":
                setMessages([...messages, {user: decodedData.user, message: decodedData.message, date: moment()}]);
            break;
            case "update-members":
                setMembers(decodedData.members);
            break;
        }
    }

    const joinTheRoom = () => {

        let newConnection: NewConnectionDataType = {
            type: "new-connection",
            user: roomState.name,
            room: roomState.room
        }

        ws.send(JSON.stringify(newConnection));
    }

    const sendMessage = (newMessage: string) => {
        let newMessageObj: NewMessageDataType = {
            type: 'new-message',
            user: roomState.name,
            message: newMessage
        }

        setMessages([...messages, {user: roomState.name, message: newMessage, date: moment()}]);

        ws.send(JSON.stringify(newMessageObj));
    }

    return {
        joinTheRoom,
        sendMessage,
        clearAction: () => {setNowAction(null); setMessages([messages[messages.length - 1]])},
        closeAlert: () => {setShowAlert(false)},
        setAlert: (alert: string) => {setAlert(alert); setShowAlert(true)},
        messages,
        members,
        alert,
        showAlert,
        nowAction
    }
}