"use client"
import Head from "next/head";
import { useState } from "react";
import {CircleFill} from '@gravity-ui/icons';
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
        const formatDate = (dateString) => {
            return new Date(dateString).toLocaleDateString("en-GB", {
              timeZone: "Asia/Bangkok",
              day: "2-digit",
              month: "short",
              year: "numeric",
            });
          };

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
                            <p className="text-[32px] font-bold">💠 {Todo.data.title}</p> 
                            <hr/>
                        </Card.Title> 
                    </Card.Header>
                    <Card.Content> 
                        <div className="text-[14px]">
                            <p>ID: {Todo.data.id}</p>
                            <p>Description: {Todo.data.item}</p>     
                            <p className={`font-bold flex items-center gap-2 ${Todo.data.status ? 'text-[#22C55E]' : 'text-[#FF383C]'}`}>
                                  Status: <CircleFill className="w-10 h-10"/>
                                  <span>{Todo.data.status ? 'DONE' : 'NOT DONE'}</span>
                                </p>        
                 
                        </div><hr/>

                        <div className="text-[14px]">
                            
                            <p>Created at: {formatDate(Todo.data.created_at)}</p>
                            <p>Updated at: {formatDate(Todo.data.updated_at)}</p>
                            
                        </div>
                        
                    </Card.Content>
                    <Card.Footer>
                        <div className="w-[300px] space-y-3">
                            <Button className="w-44" onClick={handleClick} variant="secondary" fullWidth isPending={pending}>
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
