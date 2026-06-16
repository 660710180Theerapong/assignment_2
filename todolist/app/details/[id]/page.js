"use client"
import Head from "next/head";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Card,Button, Spinner } from "@heroui/react";
import { useQuery } from "@tanstack/react-query";

import LoadingUI from "@/components/LoadingUI";

export default function TodoDetails() {
    const router = useRouter();
    const { id } = useParams();
    const numericId = Number(id);

    const [pending, setPending] = useState(false)
  
    const fetchTodo = async () =>{
      
            const res = await fetch(`/api/todo/${numericId}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({id: numericId})    
            });
            console.log("RES: ", res)
            if(!res.ok){
                throw new Error(res.statusText)
            }
            const data = await res.json();
            return data
        }


  const{
    data: Todo,
    isLoading,
    error,
  }=useQuery({
    queryKey: ["Todo"],
    throwOnError: true,
    queryFn: fetchTodo,
    
  })

    const handleClick =()=>{
        setPending(true) 
        router.push("/") 
        
    }

   if (isLoading) {
      return (
       <LoadingUI/>
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
                            <p className="text-2xl font-bold">💠 {Todo.data.title}</p> 
                            <hr/>
                        </Card.Title> 
                    </Card.Header>
                    <Card.Content> 
                        <div className="text-xl">
                            <p>ID: {Todo.data.id}</p>
                            <p>Todo: {Todo.data.item}</p>
                            <p>Status: {Todo.data.status ? '🟢 Done' : '🔴 Not done'}</p>
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
