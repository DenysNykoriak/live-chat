import { chatActionsEnum, chatActionType } from "../reducers/chatReducer";

export function changeRoom (newRoom: string): chatActionType {
    return {
        type: chatActionsEnum.CHANGE_ROOM_ACTION,
        payload: newRoom
    }
}