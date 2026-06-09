"use client"
import Head from "next/head";
import styles from "@/styles/Home.module.css";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import DeleteTodo_Modal from "@/components/DeleteTodo_Modal";
import EditTodo_Modal from "@/components/EditTodo_Modal"
import StatusTodo from "@/components/StatusTodo"

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
                <h1>Todo List</h1>
                <button onClick={() => router.push("/AddTodo")} className={styles.add}>
                  Add Todo
                </button>
                {Todos.length === 0 ? (
                    <h1>Not found todo list.</h1>
                ) : (
                    Todos.map((item) => (
                        <div key={item.id} className={styles.card}>

                        <StatusTodo id={item.id} status={item.status} onUpdated={fetchTodos} />
                        
                        <hr />
                            <h3>🔶 {item.title}</h3>                        
                            

                            <div className={styles.button}>
                             
                              <EditTodo_Modal id={item.id} onUpdated={fetchTodos}  item={item} />
                              <DeleteTodo_Modal id={item.id} onUpdated={fetchTodos} />

                              <button onClick={() => router.push(`/TodoDetails/${item.id}`)} className={styles.more_details}>
                                Details
                              </button>
                            </div>
                            

                        </div>
                    ))
                )}
            </div>

        </div>
        
    )
}
