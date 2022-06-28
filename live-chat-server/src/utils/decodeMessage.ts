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

export function decodeMessage (message: string): NewMessageDataType | NewConnectionDataType | null {
    try {
        let messageObject: NewMessageDataType | NewConnectionDataType = JSON.parse(message);

        if(!messageObject.user) return null;

        if(messageObject['message']) return {
            type: 'new-message',
            user: messageObject.user,
            message: messageObject['message']
        }

        if(messageObject['room']) return {
            type: 'new-connection',
            user: messageObject.user,
            room: messageObject['room']
        }

        return null;
    } catch (err) {
        return null
    }
}