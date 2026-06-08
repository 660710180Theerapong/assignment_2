import { createTodoUsecase } from "../usecase/createTodoUsecase";

export default async function createTodoHandler(req) {
    if (req.method === "POST") {
        try {
            const body = await req.json();
            const todo = await createTodoUsecase(body);

            return Response.json(
                { success: true, data: todo },
                { status: 201}
            );

        } catch (err) {
            console.error("Create Error:", err);

            return Response.json(
                { success: false, error: err.message },
                { status: 400 }
        );
        }
    }

    return Response.json(
        { success: false, error: "Method not allowed" },
        { status: 405 }
    );
}