import getAllTodoHandler from "@/backEnd/handler/getAllTodoHandler"
export default async function handler(req, res) {
    if (req.method === "GET") {
        return await getAllTodoHandler(req, res);
    }
    res.status(405).json({ error: "Method not allowed" });
}