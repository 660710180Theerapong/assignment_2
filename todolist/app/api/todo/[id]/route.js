import  updateTodoHandler  from "@/backEnd/handler/updateTodoHandler";
import  deleteTodoHandler  from "@/backEnd/handler/deleteTodoHandler";
import  getTodoHandler from "@/backEnd/handler/getTodoHandler";
export async function PATCH(req) {
        return await updateTodoHandler(req);
}

export async function DELETE(req){
        return await deleteTodoHandler(req);
}

 export async function POST(req) {
         return await getTodoHandler(req);
 }
