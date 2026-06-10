"use client"
import Head from "next/head";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Card,Button } from "@heroui/react";

import styles from "@/styles/TodoDetails.module.css";

export default function TodoDetails() {
    const router = useRouter();
    const { id } = useParams();
    const numericId = Number(id);
    const [Todo, setTodo] = useState([])

  
    const fetchTodo = async () =>{
        try {
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
  }}
  
      useEffect(() => {
    fetchTodo()
  }, [])

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
                            <Button 
                                onClick={()=>router.push("/")} 
                                variant="secondary" fullWidth
                            >
                                Back
                            </Button>
                </div>
                    </Card.Footer>
                </Card>
          
                

                
              
            </div>

        </div>
        
    )
}
