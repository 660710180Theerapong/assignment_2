import  updateTodoHandler  from "@/backEnd/handler/updateTodoHandler";
import  deleteTodoHandler  from "@/backEnd/handler/deleteTodoHandler";

export default async function handler(req, res) {
    switch (req.method) {
        case "PATCH":
            console.log("PATCHING...")
            return await updateTodoHandler(req, res);

        case "DELETE":
            return await deleteTodoHandler(req, res);

        default:
            return res.status(405).json({ error: "Method not allowed" });
    }
}