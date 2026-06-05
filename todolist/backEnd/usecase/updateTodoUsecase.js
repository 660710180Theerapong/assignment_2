import { updateTodo } from "../repositories/updateTodo"
import { updateTodoStatus } from "../repositories/updateTodoStatus"

export const updateTodoUsecase = async(todo) =>{
    if (todo.item !== undefined){
        return await updateTodo(todo)
    } else if (todo.status !== undefined) {
        return await updateTodoStatus(todo)
    }
    
    
}

