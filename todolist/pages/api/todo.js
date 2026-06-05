import { createTodoHandler } from "@/backEnd/handler/createTodoHandler";
import { deleteTodoHandler } from "@/backEnd/handler/deleteTodoHandler";

export default async function handler(req, res) {
    switch (req.method) {
        case "POST":
            return await createTodoHandler(req, res);

        case "DELETE":
            return await deleteTodoHandler(req, res);

        default:
            return res.status(405).json({
                success: false,
                error: "Method not allowed"
            });
    }
}