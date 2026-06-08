"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import Head from "next/head";
import styles from "@/styles/EditTodo.module.css"

export default function EditTodo() {
  const router = useRouter();
  const { id } = useParams();

  const numericId = Number(id);

  const [todo, setTodo] = useState({
    id: numericId,
    item: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch(`/api/todo/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(todo)
    });

    const data = await res.json();
    console.log(data);

    router.push("/");
  };

  const handleChange = (e) => { 
    setTodo({ 
        ...todo, 
        [e.target.name]: e.target.value 
    })
 };


    return (
        <div>
            <Head>
                <title>Edit Todo</title>
            </Head>

            <h1>Edit Todo</h1>

            <form onSubmit={handleSubmit} className={styles.container}>
                <input
                    type="text"
                    name="item"
                    placeholder="Enter your todo"
                    onChange={handleChange}
                />
                
                <button type="submit" className={styles.save}>
                    Save
                </button>
                <button type="button" onClick={()=>router.push("/")} className={styles.cancel}>
                    cancel
                </button>
            </form>
        </div>
    );
}