import { getAllTodoUsecase } from "../usecase/getAllTodoUsecase";

export const getAllTodoHandler = async(req, res) =>{
    if (req.method === "GET"){
                try{
                    const todo = await getAllTodoUsecase()
                    res.status(200).json({success: true, data: todo})
        
                } catch(err) {
                    console.error("Get Error: ", err)
                    res.status(400).json({success: false, error: err.message })
                }
        
            } else {
                res.status(405).json({success:false, error: "Method not allowed"})
            }
}