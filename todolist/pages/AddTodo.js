import Head from "next/head";
import { useState } from "react";



export default function Home() {

  const [todo, setTodo] = useState({
        item: "",
        status: false
    })

      const handleChange = (e) => {
        setTodo({
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const res = await fetch("/api/todo", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(todo)
            })

            const data = await res.json()
            console.log("SUCCESS:", data)

        } catch (err) {
            console.error("ERROR:", err)
        }
    }

  return(
        <div>
            <Head>
                <title>Add Todo</title>
            </Head>

            <div>
            <h1>Add Todo</h1>
            <form  onSubmit={handleSubmit}>

                <div>
                    <h2>Todo</h2>
                    <input 
                        type="text"
                        name="item"
                        placeholder="Enter your todo"
                        onChange={handleChange}
                    />
                </div>
                <button type="submit">
                    Add
                </button>

            </form>
            </div>
        </div>
    )
}
