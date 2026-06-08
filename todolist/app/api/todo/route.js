import createTodoHandler from "@/backEnd/handler/createTodoHandler";

export async function POST(req) {    
    return createTodoHandler(req);
}