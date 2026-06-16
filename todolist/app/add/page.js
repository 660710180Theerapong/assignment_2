"use client"

import Head from "next/head";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Spinner } from "@heroui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import styles from "@/styles/AddTodo.module.css";


export default function AddTodo() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const [cancelPending, setCancelPending] = useState(false);

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

      <div>
        
        <div className={styles.container}>
        
          <form onSubmit={handleSubmit}>
              <div>

            <h1>Add Todo</h1>  

           <hr/>

            <h2>Title:</h2>

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

            <h2>Todo: </h2>

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

          </div>

          <div className="w-[200px] flex gap-3"> 
              <Button type="submit" fullWidth isPending={isPending}>
                {({ isPending }) => (
                  <>
                    {isPending ? (
                      <Spinner color="current" size="xl" /> ) : ( "Add" )}
                  </>
                )}
              </Button>
              
              <Button type="button" onClick={()=>{router.push("/"); setCancelPending(true);}} variant="secondary" fullWidth isPending={cancelPending}> 
                {({ isPending }) => (
                  <>
                    {isPending ? (
                      <Spinner color="current" size="xl" /> ) : ( "Cancel" )}
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

        </div>
        
        
      </div>
    </div>
  );
}