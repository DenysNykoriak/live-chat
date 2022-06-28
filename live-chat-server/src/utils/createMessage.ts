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

export function createUpdateMembersMessageObject(members: string[]) {
    let messageObject: UpdateMembersMessageType = {
        type: 'update-members',
        members
    }

    return JSON.stringify(messageObject);
}

export function createSystemMessageObject (message: string, action: SystemMessageType['action'], message_type: SystemMessageType['message_type']): string {

    let messageObject: SystemMessageType = {
        type: 'system-message',
        action,
        message_type,
        message
    }

    return JSON.stringify(messageObject);
}

export function createMessageObject (user: string, message: string): string {

    let messageObject: MessageType = {
        type: 'message',
        user,
        message
    }

    return JSON.stringify(messageObject);
}