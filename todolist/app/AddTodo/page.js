"use client"

import Head from "next/head";
import { useState } from "react";
import { useRouter } from "next/navigation";
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
        <h1>Add Todo</h1>
        <div className={styles.container}>
          <form onSubmit={handleSubmit} >
          <div>
            <h2>Title</h2>
            <input 
              type="text"
              name="title"
              placeholder="Enter your title"
              onChange={handleChange}
            />
            <h2>Todo</h2>
            <textarea
              type="textarea"
              name="item"
              placeholder="Enter your todo"
              onChange={handleChange}
            />
          </div>
          <hr/>
          <div className={styles.button}>
            <button type="submit" className={styles.add}>
              Add
            </button>

            <button type="button" onClick={()=>router.push("/")} className={styles.cancel}>
              cancel
            </button>

          </div>
          
          
        </form>

        </div>
        
        
      </div>
    </div>
  );
}