"use client"
import { Button, Card } from '@heroui/react';
import Head from "next/head";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import DeleteTodoModal from "@/components/DeleteTodoModal";
import EditTodoModal from "@/components/EditTodoModal"
import StatusTodo from "@/components/StatusTodo"

import styles from "@/styles/Home.module.css";

export default function Home() {
  const router = useRouter();
  const [Todos, setTodo] = useState([])

  const fetchTodos = async () =>{
    try{
        const res = await fetch(`/api/todos`)
        const data = await res.json()
        
        setTodo(data.data)
        console.log(data)
    } catch (err) {
        console.error(err)
    }
  }

  useEffect(() => {
    fetchTodos()
  }, [])
  
  return(
        <div >
          <Head>
              <title>Todo List</title>
          </Head>

            <div>

               <div className="w-[100px] space-y-3 p-20">
                <Button onClick={() => router.push("/AddTodo")} fullWidth>
                  Add Todo
                </Button>
                
               </div>
                <br/>
                {Todos.length === 0 ? (
                    <h1 className="text-3xl font-bold text-white text-center">Not found todo list.</h1>
                ) : (
                    Todos.map((item) => (
                        <div key={item.id} >       

                        <Card className="w-full items-stretch md:flex-row ">
      
      
                          <div className="relative h-[140px] w-full shrink-0 overflow-hidden rounded-2xl sm:h-[90px] sm:w-[90px]">
                            <StatusTodo id={item.id} status={item.status} onUpdated={fetchTodos} /> 
                          
                          </div>
                          
                          <Card.Header >
                            
                                                
                          </Card.Header>
                          <Card.Content> 
                                <h2 className="text-3xl font-bold">{item.title}</h2> 
                          </Card.Content>
                          <Card.Footer>
                               <div >
                                <EditTodoModal id={item.id} onUpdated={fetchTodos}  item={item} />
                               
                                <DeleteTodoModal id={item.id} onUpdated={fetchTodos} />
                                <div className="w-[100px] space-y-3">

                                  <Button onClick={() => router.push(`/TodoDetails/${item.id}`)}  variant='secondary' fullWidth>
                                  Details
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
