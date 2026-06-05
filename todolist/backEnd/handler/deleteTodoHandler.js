import { deleteTodoUsecase } from "../usecase/deleteTodoUsecase"

export const deleteTodoHandler = async(req, res) =>{
    if (req.method === "DELETE"){
            try{
                const todo = await deleteTodoUsecase(req.body)
                res.status(204).json({success: true, data: todo})
    
            } catch(err) {
                console.error("Delete Error: ", err)
                res.status(400).json({success: false, error: err.message })
            }
    
        } else {
            res.status(405).json({success:false, error: "Method not allowed"})
        }
}