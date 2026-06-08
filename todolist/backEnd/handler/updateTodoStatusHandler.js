import { updateTodoStatusUsecase } from "../usecase/updateTodoStatusUsecase";

export default async function updateTodoStatusHandler (req) {
    if (req.method === "PUT"){
                    try{
                        const body = await req.json();
                        const todo = await updateTodoStatusUsecase(body)
         
                        return Response.json(
                            { success: true, data: todo},
                            { status: 200 }
                        )
            
                    } catch(err) {
                        console.error("PUT Error: ", err)
                        return Response.json(
                            { success: false, error: err.message },
                            { status: 400 }
                        )
                    }
            
                } else {
                    return Response.json(
                        { success: false, error: "Method not allowed" },
                        { status: 405 }
                    )
                }
}