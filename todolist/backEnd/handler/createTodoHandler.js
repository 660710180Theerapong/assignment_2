import { createTodoUsecase } from "../usecase/createTodoUsecase";

export const createTodoHandler = async(req, res) =>{
    if (req.method === "POST"){
        try{
            const todo = await createTodoUsecase(req.body)
            res.status(201).json({success: true, data: todo})

        } catch(err) {
            console.error("Create Error: ", err)
            res.status(400).json({success: false, error: err.message })
        }

    } else {
        res.status(405).json({success:false, error: "Method not allowed"})
    }


}