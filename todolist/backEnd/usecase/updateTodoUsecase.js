import { updateTodo } from "../repositories/updateTodo"

export const updateTodoUsecase = async(todo) =>{
    
    return await updateTodo(todo)
}

