import Head from "next/head";
import styles from "@/styles/Home.module.css";
import { useState, useEffect } from "react";



export default function Home() {

  const [Todos, setTodo] = useState([])

  const fetchTodos = async () =>{
    try{
        const res = await fetch("/api/todos")
        const data = await res.json()

        setTodo(data.data)
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
              <title>Todolist</title>
          </Head>

            <div >
                <h2>กระดานความคิดเห็น</h2>
                <buttom>Add Todo</buttom>
                {Todos.length === 0 ? (
                    <p>ยังไม่มีความคิดเห็น</p>
                ) : (
                    Todos.map((item) => (
                        <div key={item.id}>
                            <h3>{item.item}</h3>
                            <p>{item.status}</p>                          
                            <hr />
                            <button>Edit</button>
                            <button>Delete</button>
                        </div>
                    ))
                )}
            </div>

        </div>
        
    )
}
