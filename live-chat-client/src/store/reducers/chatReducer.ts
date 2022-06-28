const initialState = {
    name: '',
    room: ''
}

export enum chatActionsEnum {
    CHANGE_NAME_ACTION = "CHANGE_NAME_ACTION",
    CHANGE_ROOM_ACTION = "CHANGE_ROOM_ACTION"
}

export type chatActionType = {
    type: chatActionsEnum
    payload: string
}

export function chatReducer(state = initialState, action: chatActionType){
    switch(action.type){
        case chatActionsEnum.CHANGE_NAME_ACTION:
            state.name = action.payload;
        break;
        case chatActionsEnum.CHANGE_ROOM_ACTION:
            state.room = action.payload;
        break;
    }

    return state;
}