import { updateTodoStatus } from "../repositories/updateTodoStatus"

export const updateTodoStatusUsecase = async(todo) =>{
    return updateTodoStatus(todo)
}