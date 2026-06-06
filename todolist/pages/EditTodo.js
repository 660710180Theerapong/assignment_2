import Head from "next/head";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import styles from "@/styles/EditTodo.module.css";

export default function EditTodo() {
    const router = useRouter();
    const { id } = router.query;
    const numericId = Number(id);
 
    const [todo, setTodo] = useState({
        id: numericId,
        item: ""
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
            const res = await fetch(`/api/todo/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(todo)
            });

            const data = await res.json();

            console.log(data);

            router.push("/");
        } catch (err) {
            console.error(err);
        }
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