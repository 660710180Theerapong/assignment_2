import { Todo } from "../domains/Todo"
import { createTodo } from "../repositories/createTodo"

export const createTodoUsecase = async (data) =>{
    const todo = new Todo(data)
    return await createTodo(todo)
}
