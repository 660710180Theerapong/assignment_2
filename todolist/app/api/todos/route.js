import  getAllTodoHandler  from "@/backEnd/handler/getAllTodoHandler";

export async function GET(req) {

  return await getAllTodoHandler(req);
}