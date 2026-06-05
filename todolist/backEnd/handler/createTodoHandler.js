import { createTodoUsecase } from "../usecase/createTodoUsecase";

export default async function createTodoHandler(req, res) {
    if (req.method === "POST") {
        try {
            const todo = await createTodoUsecase(req.body);

            return res.status(201).json({
                success: true,
                data: todo
            });

        } catch (err) {
            console.error("Create Error:", err);

            return res.status(400).json({
                success: false,
                error: err.message
            });
        }
    }

    return res.status(405).json({
        success: false,
        error: "Method not allowed"
    });
}