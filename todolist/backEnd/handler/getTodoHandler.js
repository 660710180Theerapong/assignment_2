import { getTodoUsecase } from "../usecase/getTodoUsecase";

export default async function getTodoHandler (req) {
    if (req.method === "POST"){
        try{
            const body = await req.json();
            const todo = await getTodoUsecase(body)
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