"use client"

import Head from "next/head";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@heroui/react";

import styles from "@/styles/AddTodo.module.css";

export default function Home() {
  const router = useRouter(); 

  const [todo, setTodo] = useState({
    title: "",
    item: "",
    status: false
  });

  const handleChange = (e) => {
        setTodo({
            ...todo,
            [e.target.name]: e.target.value
        });
    };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log("Todo: ",todo)
      const res = await fetch("/api/todo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(todo)
      });

      const data = await res.json();
      console.log("SUCCESS:", data);

      router.push("/");

    } catch (err) {
      console.error("ERROR:", err);
    }
  };

  return (
    <div>
      <Head>
        <title>Add Todo</title>
      </Head>

      <div>
        
        <div className={styles.container}>
        
          <form onSubmit={handleSubmit} >
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
          <hr/>
          <div className="w-[200px] flex gap-3">
            <Button type="submit" fullWidth>
              Add
            </Button>

            <Button type="button" onClick={()=>router.push("/")} variant="secondary" fullWidth>
              cancel
            </Button>

          </div>
          
          
        </form>

        </div>
        
        
      </div>
    </div>
  );
}