"use client"
import Head from "next/head";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Card,Button, ProgressCircle, Label, Spinner } from "@heroui/react";


export default function TodoDetails() {
    const router = useRouter();
    const { id } = useParams();
    const numericId = Number(id);
    const [Todo, setTodo] = useState([])
    const [loading, setLoading] = useState(true)
    const [pending, setPending] = useState(false)
  
    const fetchTodo = async () =>{
        try {
            setLoading(true)
            const res = await fetch(`/api/todo/${numericId}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({id: numericId})    
            });

            const data = await res.json();
            console.log("Data: ",data.data)
            setTodo(data.data)
       
        } catch (err) {
            console.error("GET Error:", err);
        }finally{
            setLoading(false)
        }}
  
      useEffect(() => {
    fetchTodo()
  }, [])

    const handleClick =()=>{
        setPending(true) 
        router.push("/") 
        
    }

   if (loading) {
      return (
      <div className="flex min-h-screen items-center justify-center gap-3">
       <ProgressCircle isIndeterminate aria-label="Loading">
        <ProgressCircle.Track>
          <ProgressCircle.TrackCircle />
          <ProgressCircle.FillCircle />
        </ProgressCircle.Track>
        </ProgressCircle>
        <Label className="text-3xl font-bold text-white text-center">Loading...</Label>
      </div>
    )
    } 
    
  return(
        <div >
          <Head>
              <title>Todo Details</title>
          </Head>

            <div>
               <Card className="w-full items-stretch">
                    <Card.Header >
                        <Card.Title >
                            <p className="text-2xl font-bold">💠 {Todo.title}</p> 
                            <hr/>
                        </Card.Title> 
                    </Card.Header>
                    <Card.Content> 
                        <div className="text-xl">
                            <p>ID: {Todo.id}</p>
                            <p>Todo: {Todo.item}</p>
                            <p>Status: {Todo.status ? '🟢 Done' : '🔴 Not done'}</p>
                        </div>
                        
                    </Card.Content>
                    <Card.Footer>
                        <div className="w-[100px] space-y-3">
                            <Button onClick={handleClick} variant="secondary" fullWidth isPending={pending}>
                                {({ isPending }) => (
                                    <>
                                        {isPending ? <Spinner color="current" size="xl" /> : 'Back'}                          
                                    </>
                                )}
                            </Button>
                </div>
                    </Card.Footer>
                </Card>
          
                

                
              
            </div>

        </div>
        
    )
}
