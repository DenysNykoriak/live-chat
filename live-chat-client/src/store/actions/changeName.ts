import { chatActionsEnum, chatActionType } from "../reducers/chatReducer";

export function changeName (newName: string): chatActionType {
    return {
        type: chatActionsEnum.CHANGE_NAME_ACTION,
        payload: newName
    }
}