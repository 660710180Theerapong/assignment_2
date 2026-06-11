"use client"
import { Button, Card, ProgressCircle, Label, Spinner } from '@heroui/react';
import Head from "next/head";
import { useState, useEffect, useActionState } from "react";
import { useRouter } from "next/navigation";

import DeleteTodoModal from "@/components/DeleteTodoModal";
import EditTodoModal from "@/components/EditTodoModal"
import StatusTodo from "@/components/StatusTodo"

export default function Home() {
  const router = useRouter();
  const [Todos, setTodo] = useState([])
  const [loading, setLoading] = useState(true)
  const [pending, setPending] = useState(false)
  const [addPending, setAddPending] = useState(false)
  

  const fetchTodos = async () =>{
    try{
        setLoading(true)
        const res = await fetch(`/api/todos`)
        const data = await res.json()
        
        setTodo(data.data)
        console.log(data)
    } catch (err) {
        console.error(err)
    } finally{
      setLoading(false)
    }
  }

  const handleClick =()=>{
    
  }

  useEffect(() => {
    fetchTodos()
  }, [])


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
              <title>Todo List</title>
          </Head>

            <div>

               <div className="w-[100px] space-y-3 p-6">

                <Button onClick={()=> {router.push("/AddTodo"); setAddPending(true);}} fullWidth isPending={addPending}>
                    {({ isPending }) => (
                    <>
                      {isPending ? <Spinner color="current" size="xl" /> : 'Add Todo'}                          
                    </>
                  )}
                </Button>
                
               </div>
                <br/>
               
            
                {Todos.length === 0 ? (
                  <div className='lex min-h-screen items-center justify-center gap-3'>
                      <h1 className="text-3xl font-bold text-white text-center">Not found todo.</h1>
                  </div>
                    
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
                                <p>{item.id}</p>
                                <h2 className="text-3xl font-bold">{item.title}</h2> 
                          </Card.Content>
                          <Card.Footer>
                               <div >
                                <EditTodoModal id={item.id} onUpdated={fetchTodos}  item={item} />
                               
                                <DeleteTodoModal id={item.id} onUpdated={fetchTodos} />
                                <div className="w-[100px] space-y-3">

                                <Button onClick={() => {router.push(`/TodoDetails/${item.id}`); setPending(true);}} variant="secondary" fullWidth isPending={pending}>
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
