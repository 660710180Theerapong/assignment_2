import Head from "next/head";
import styles from "@/styles/Home.module.css";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";


export default function Home() {
  const router = useRouter();
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
  
  const handleDelete = async (id) => {
    if (!confirm("คุณต้องการลบ Todo นี้ใช่ไหม?")) return;

    try {
      const res = await fetch("/api/todo//${id}", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: id }), 
    });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text);
      }

      setTodo(Todos.filter((todo) => todo.id !== id));     
    } catch (err) {
      console.error("Delete Error:", err);
    }
  }

    const handleUpdateStatus = async (id, currentStatus) => {

    try {
      const res = await fetch("/api/todo//${id}", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: id,
                             status: !currentStatus
       }), 
    });

      if (!res.ok) throw new Error("Update failed");

        setTodo((prev) =>
          prev.map((item) =>
            item.id === id
              ? { ...item, status: !currentStatus }
              : item
          )
        );
      } catch (err) {
        console.error(err);
      }
  }

  return(
        <div >
          <Head>
              <title>Todolist</title>
          </Head>

            <div>
                <h2>กระดานความคิดเห็น</h2>
                <button onClick={() => router.push("/AddTodo")} className={styles.add}>
                  Add Todo
                </button>
                {Todos.length === 0 ? (
                    <h1>Todo List</h1>
                ) : (
                    Todos.map((item) => (
                        <div key={item.id} className={styles.card}>

                        <button onClick={() => handleUpdateStatus(item.id, item.status)} className={styles.status}>
                              {item.status ? "✔️" : "🔘"}
                        </button>
                        
                        <hr />
                            <h3>{item.id}</h3>
                            <h3>{item.item}</h3>
                            <h3>{item.status}</h3>                          
                            
                            <button onClick={() => router.push(`/EditTodo?id=${item.id}`)} className={styles.edit}>
                              Edit
                            </button>

                            <button onClick={() => handleDelete(item.id)} className={styles.delete}>
                              Delete
                            </button>
                        </div>
                    ))
                )}
            </div>

        </div>
        
    )
}
