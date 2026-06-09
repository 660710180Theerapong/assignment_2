"use client"
import Head from "next/head";
import styles from "@/styles/TodoDetails.module.css";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";



export default function TodoDetails() {
    const router = useRouter();
    const { id } = useParams();
    const numericId = Number(id);
    const [Todo, setTodo] = useState([])

  
    const fetchTodo = async () =>{
        try {
            const res = await fetch(`/api/todo/${numericId}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({id: numericId})    
            });

            const data = await res.json();
            console.log("Data: ",data.data)
            setTodo(data.data)
       
        } catch (err) {
            console.error("GET Error:", err);
  }}
  
      useEffect(() => {
    fetchTodo()
  }, [])

  return(
        <div >
          <Head>
              <title>Todo Details</title>
          </Head>

            <div>
                <h1>Todo Details</h1>
                <div className={styles.card}>
                    <h2>Title: {Todo.title}</h2>
                    <h3>ID: {Todo.id}</h3>
                    <h3>Todo: {Todo.item}</h3>
                    <h3>Status: {Todo.status ? '🟢 Done' : '🔴 Not done'}</h3>

                <div>
                    <button
                        onClick={()=>router.push("/")} className={styles.back}
                    >
                        Back
                    </button>
                </div>


                </div>

                
              
            </div>

        </div>
        
    )
}
