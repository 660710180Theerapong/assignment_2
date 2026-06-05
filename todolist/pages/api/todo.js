import createTodoHandler from "@/backEnd/handler/createTodoHandler";

export default async function handler(req, res) {
    if (req.method === "POST") {
        return await createTodoHandler(req, res);
    }
    res.status(405).json({ error: "Method not allowed" });
}