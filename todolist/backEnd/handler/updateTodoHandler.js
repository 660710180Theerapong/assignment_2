import { updateTodoUsecase } from "../usecase/updateTodoUsecase";

export const updateTodoHandler = async(req, res) =>{
    if (req.method === "PATCH"){
        try{
            const todo = await updateTodoUsecase(req.body)
            res.status(200).json({success: true, data: todo})
            
        } catch(err) {
            console.error("PATCH Error: ", err)
            res.status(400).json({success: false, error: err.message })
        }
            
    } else {
        res.status(405).json({success:false, error: "Method not allowed"})
    }
}