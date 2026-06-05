import { updateTodo } from "../repositories/updateTodo"
import { updateTodoStatus } from "../repositories/updateTodoStatus"

export const updateTodoUsecase = async(todo) =>{
    if (todo.item !== undefined){
        console.log("PATCH ITEM")
        return await updateTodo(todo)
    } else if (todo.status !== undefined) {
        console.log("PATCH STATUS")
        return await updateTodoStatus(todo)
    }
    
    
}

