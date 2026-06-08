import { getAllTodoUsecase } from "../usecase/getAllTodoUsecase";

export default async function getAllTodoHandler(req) {  
    if (req.method === "GET"){
                try{
                    const todo = await getAllTodoUsecase()
                    return Response.json(
                      { success: true, data: todo },
                      { status: 200 }
                    );
        
                } catch(err) {
                    console.error("Get Error: ", err)
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