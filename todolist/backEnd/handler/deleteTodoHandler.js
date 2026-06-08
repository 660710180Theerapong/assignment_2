import { deleteTodoUsecase } from "../usecase/deleteTodoUsecase"

export default async function deleteTodoHandler (req) {
    if (req.method === "DELETE"){
            try{
                const body = await req.json();
                const todo = await deleteTodoUsecase(body)
                return Response.json(
                      { success: true, data: todo },
                      { status: 200 }
                    );
    
            } catch(err) {
                console.error("Delete Error: ", err)
                return Response.json(
                      { success: false, error: err.message },
                      { status: 400 }
                    );
            }
    
        } else {
            return Response.json(
                      { success: false, error: "Method not allowed" },
                      { status: 405 }
                    );
        }
}