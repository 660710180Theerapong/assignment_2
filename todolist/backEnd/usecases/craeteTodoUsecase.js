import { createTodo }  from "../repositories/createTodo"
export const createTodoUsecase = async() =>{
    const data = await createTodo()
    return data
}
