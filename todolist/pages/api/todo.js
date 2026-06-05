import { createTodoHandler } from "@/backEnd/handler/createTodoHandler";

export default async function handler(req, res) {
    await createTodoHandler(req, res);
}