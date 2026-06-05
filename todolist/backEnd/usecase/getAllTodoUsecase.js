import getAllTodo from "../repositories/getAllTodo"

export const getAllTodoUsecase = async() =>{
    return await getAllTodo();
}