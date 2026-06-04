import { deleteTodo } from "../repositories/deleteTodo"

export const deleteTodoUsecase = async(data) =>{
    const res = await deleteTodo(data)

    if (res === 0) {
        throw new Error("Todo not found");
    }
}

