import { updateTodoUsecase } from "../usecase/updateTodoUsecase";

export default async function updateTodoHandler (req) {
    if (req.method === "PATCH"){
        try{
            const body = await req.json();
            const todo = await updateTodoUsecase(body)
            return Response.json(
                      { success: true, data: todo },
                      { status: 200 }
                    );
            
        } catch(err) {
            console.error("PATCH Error: ", err)
            return Response.json(
                { success: true, error: err.message },
                { status: 400 }
            )
        }
            
    } else {
        return Response.json(
            { success: false, error: "Method not allowed"},
            { status: 405 }
        )
    }
}