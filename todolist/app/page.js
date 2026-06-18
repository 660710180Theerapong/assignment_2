"use client"
import { Button, Card, Label } from '@heroui/react';
import {Plus, SquareListUl, CircleFill} from '@gravity-ui/icons';
import Head from "next/head";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query"
import { useState } from 'react';

import DeleteTodoModal from "@/components/DeleteTodoModal";
import EditTodoModal from "@/components/EditTodoModal"
import StatusTodo from "@/components/StatusTodo"
import LoadingUI from '@/components/LoadingUI';
import SearchBar from '@/components/SearchBar';

export default function Home() {
  const router = useRouter();
  const [search, setSearch] = useState("");

  const fetchTodos = async () =>{
        const res = await fetch(`/api/todos`)
        const data = await res.json()
      
        return data
  
  }

  const timeAgo =(dateString) => {
    const now = new Date();
    const updated = new Date(dateString);
  
    const diffMs = now - updated;
    const diffMin = Math.floor(diffMs / 60000);
  
    if (diffMin < 1) return "A few minutes ago";
    if (diffMin < 60) return `${diffMin} minutes ago`;
  
    const diffHour = Math.floor(diffMin / 60);
    if (diffHour < 24) return `${diffHour} hours ago`;
  
    const diffDay = Math.floor(diffHour / 24);
    return `${diffDay} days ago`;
  }


  const{
    data: todos=[],
    isLoading,
    error,
  }=useQuery({
    queryKey:["todos"],
    queryFn: fetchTodos,
  })
 
  const filteredTodos = todos?.data?.filter((item) => {
    const keyword = search.toLowerCase();
  
    return (
      item.title.toLowerCase().includes(keyword)

    );
  });

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
            <Label className="flex items-center justify-center gap-2 text-[32px] font-bold text-black border-b border-gray-200">
                <SquareListUl className="w-20 h-20"/> Todo List
            </Label><hr/>

            <SearchBar value={search} onChange={setSearch} />

               <div className=" space-y-3 p-6">

               <Button
                  onClick={() => router.push("/add")}
                
                  className="fixed bottom-6 right-6 z-50 rounded-full w-20 h-20 shadow-lg flex items-center justify-center"
                >
                  <Plus className="w-8 h-8"/>
                </Button>
                
               </div>
                <br/>
       
                  
                {todos.data.length === 0 ? (
                  <div className='flex flex-col min-h-screen items-center  gap-6'>
                      
                      <Label className="text-[18px] font-bold text-[#000000] text-center">Not found todo.</Label>
                      <p className="text-[14px] font-bold text-[#000000] text-center">Add new todo now!</p>
                      <div className="w-[300px] flex justify-center space-y-3">

                        <Button className="w-44 min-h-[44px]" onClick={()=> {router.push("/add");}} fullWidth >
                            {({ isPending }) => (
                            <>
                              {isPending ? <Spinner color="current" size="xl" /> : 'Add Todo'}                          
                            </>
                          )}
                        </Button>
                        
                      </div>
                  </div>
                    
                ) : (
                    todos && filteredTodos.map((item) => (
                        <div key={item.id} >       

                        <Card onClick={() => {router.push(`/details/${item.id}`);}} className="w-full  mx-auto items-stretch md:flex-row cursor-pointer bg-[#EEEEEE] hover:bg-[#DCCFC0] transition-colors duration-200">
      
                          <Card.Header >
                            <div className="relative h-[140px] w-full shrink-0 overflow-hidden rounded-2xl sm:h-[90px] sm:w-[90px]">
                            <StatusTodo id={item.id} status={item.status} /> 
                          
                          </div>
                                                
                          </Card.Header>
                          <Card.Content> 
                                
                                <p className="text-[18px] font-bold">{item.title}</p> 
                                <p className={`text-[14px] font-bold flex items-center gap-2 ${item.status ? 'text-[#22C55E]' : 'text-[#FF383C]'}`}>
                                  <CircleFill className="w-10 h-10"/>
                                  <span>{item.status ? 'DONE' : 'NOT DONE'}</span>
                                </p>
                                <p className="text-[14px] ">Updated: {timeAgo(item.updated_at)}</p>
                          </Card.Content>
                          <Card.Footer onClick={(e) => e.stopPropagation()}>
                               <div className="w-[300px] flex space-y-2">
                                <EditTodoModal id={item.id} item={item} />
                               
                                <DeleteTodoModal id={item.id} title={item.title}/>

                              </div>
                            </Card.Footer>
                           
                        </Card>
                    
                        </div>
                    ))
                )}
            </div>

        </div>
        
    )
}
