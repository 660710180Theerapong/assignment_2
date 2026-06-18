"use client"

import Head from "next/head";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Spinner, Card } from "@heroui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import styles from "@/styles/AddTodo.module.css";


export default function AddTodo() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const [todo, setTodo] = useState({
    title: "",
    item: "",
    status: false,
  });

  const handleChange = (e) => {
    setTodo({
      ...todo,
      [e.target.name]: e.target.value,
    });
  };

  const { mutate, isPending, error } = useMutation({
    mutationKey: ["todo"],

    mutationFn: async (newTodo) => {
      const res = await fetch("/api/todo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTodo),
      });

      if (!res.ok) {
        throw new Error("Failed to create todo");
      }

      return res.json();
    },

    onSuccess: () => {   
      queryClient.invalidateQueries({
        queryKey: ["todos"],
      });

      router.push("/");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate(todo);
  }


  return (
    <div>
      <Head>
        <title>Add Todo</title>
      </Head>

      <div className="min-h-screen flex items-center justify-center">
        
      <Card className="w-full max-w-2xl bg-[#FDF6ED]">
      
      <Card.Header >
        <p className="text-[32px] font-bold">Add Todo</p> 
                            
      </Card.Header>
      <Card.Content> 
          <form onSubmit={handleSubmit} className="text-[14px]">
                  <div className="flex flex-col gap-4">


              <hr/>

                <h2>Title<span className="text-[#FF383C]">*</span></h2>

                <input 

                  type="text"
                  name="title"
                  placeholder="Enter your title"
                  onChange={handleChange}
                  className="border border-gray-400 rounded p-2 w-full"
                  required
                  onInvalid={(e) =>
                    e.target.setCustomValidity("Please enter your title")
                  }
                  onInput={(e) =>
                    e.target.setCustomValidity("")
                  }

                />

                <h2>Description<span className="text-[#FF383C]">*</span></h2>

                <textarea

                  name="item"
                  placeholder="Enter your todo"
                  onChange={handleChange}
                  className="border border-gray-400 rounded p-2 w-full"
                  required
                  onInvalid={(e) =>
                    e.target.setCustomValidity("Please enter your todo")
                  }
                  onInput={(e) =>
                    e.target.setCustomValidity("")
                  }

                />

                

              </div><hr/>

              <div className=" flex gap-3 justify-center mx-auto mt-4"> 
                
                  <Button type="button" className="w-32" onClick={()=>{router.push("/"); }} variant="secondary" fullWidth isPending={isPending}> 
                    {({ isPending }) => (
                      <>
                        {isPending ? (
                          <Spinner color="current" size="xl" /> ) : ( "Cancel" )}
                      </>
                    )}
                  </Button>

                  <Button type="submit" className="w-32" fullWidth isPending={isPending}>
                    {({ isPending }) => (
                      <>
                        {isPending ? (
                          <Spinner color="current" size="xl" /> ) : ( "Add Todo" )}
                      </>
                    )}
                  </Button>
                  
              </div>

              

              {error && (
                <p className="text-red-500">
                  {error.message}
                </p>
              )}
            </form>
            
      </Card.Content>
   
       
    </Card>
         
        
      </div>
    </div>
  );
}