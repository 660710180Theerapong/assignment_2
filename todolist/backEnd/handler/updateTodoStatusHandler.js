import { updateTodoStatusUsecase } from "../usecase/updateTodoStatusUsecase";

export default async function updateTodoStatusHandler (req, res) {
    if (req.method === "PUT"){
                    try{
                        const todo = await updateTodoStatusUsecase(req.body)
                        res.status(200).json({success: true, data: todo})
            
                    } catch(err) {
                        console.error("PUT Error: ", err)
                        res.status(400).json({success: false, error: err.message })
                    }
            
                } else {
                    res.status(405).json({success:false, error: "Method not allowed"})
                }
}