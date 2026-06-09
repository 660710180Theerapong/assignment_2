import { getTodo } from "../repositories/getTodo"

export const getTodoUsecase = async(data) =>{
    return await getTodo(data);
}