import createTodo from "../repositories/createTodo"

export const createTodoUsecase = async () =>{
    const data = createTodo()
    return data
}
