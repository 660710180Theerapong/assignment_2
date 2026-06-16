"use client"
import { Button, Card, ProgressCircle, Label, Spinner } from '@heroui/react';
import Head from "next/head";
import { useState, useEffect, useActionState } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query"

import DeleteTodoModal from "@/components/DeleteTodoModal";
import EditTodoModal from "@/components/EditTodoModal"
import StatusTodo from "@/components/StatusTodo"
import LoadingUI from '@/components/LoadingUI';

export default function Home() {
  const router = useRouter();
  const [pending, setPending] = useState(false)
  
  const fetchTodos = async () =>{
        const res = await fetch(`/api/todos`)
        const data = await res.json()
      
        return data
  
  }

  const{
    data: todos=[],
    isLoading,
    error,
  }=useQuery({
    queryKey:["todos"],
    queryFn: fetchTodos,
  })
 


  if (isLoading) {
    return (
      <LoadingUI/>
  )
  } 
  
  return(
        <div >
          <Head>
              <title>Todo List</title>
          </Head>

            <div>

               <div className="w-[100px] space-y-3 p-6">

                <Button onClick={()=> {router.push("/add");}} fullWidth >
                    {({ isPending }) => (
                    <>
                      {isPending ? <Spinner color="current" size="xl" /> : 'Add Todo'}                          
                    </>
                  )}
                </Button>
                
               </div>
                <br/>
       
                  
                {todos.data.length === 0 ? (
                  <div className='lex min-h-screen items-center justify-center gap-3'>
                      <h1 className="text-3xl font-bold text-white text-center">Not found todo.</h1>
                  </div>
                    
                ) : (
                    todos && todos.data.map((item) => (
                        <div key={item.id} >       

                        <Card className="w-full items-stretch md:flex-row ">
      
      
                          <div className="relative h-[140px] w-full shrink-0 overflow-hidden rounded-2xl sm:h-[90px] sm:w-[90px]">
                            <StatusTodo id={item.id} status={item.status} /> 
                          
                          </div>
                          
                          <Card.Header >
                            
                                                
                          </Card.Header>
                          <Card.Content> 
                                
                                <h2 className="text-3xl font-bold">{item.title}</h2> 
                          </Card.Content>
                          <Card.Footer>
                               <div >
                                <EditTodoModal id={item.id} item={item} />
                               
                                <DeleteTodoModal id={item.id} />
                                <div className="w-[100px] space-y-3">

                                <Button onClick={() => {router.push(`/details/${item.id}`); setPending(true);}} variant="secondary" fullWidth isPending={pending}>
                                  {({ isPending }) => (
                                    <>
                                      {isPending ? <Spinner color="current" size="xl" /> : 'Details'}                          
                                    </>
                                  )}
                                </Button>

                                </div>
                                

                             
                              </div>
                            </Card.Footer>
                           
                        </Card>
                        <br/>
                        </div>
                    ))
                )}
            </div>

        </div>
        
    )
}
