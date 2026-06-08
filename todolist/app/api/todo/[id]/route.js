import  updateTodoHandler  from "@/backEnd/handler/updateTodoHandler";
import  deleteTodoHandler  from "@/backEnd/handler/deleteTodoHandler";

export async function PATCH(req) {
        return await updateTodoHandler(req);
}

export async function DELETE(req){
        return await deleteTodoHandler(req);
}

