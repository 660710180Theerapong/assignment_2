"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "@/styles/EditTodo_Modal.module.css"

export default function EditTodo({id, onUpdated}) {
    const [isEditOpen, setIsEditOpen] = useState(false);
    const router = useRouter();


    const [todo, setTodo] = useState({
        id: id,
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
        setIsEditOpen(false);
        onUpdated();
        
    };

    const handleChange = (e) => { 
        setTodo({ 
            ...todo, 
            [e.target.name]: e.target.value 
        })
    };


    return (      

        <div>
            <button onClick={() => {
                setIsEditOpen(true);
                }} className={styles.edit}>
                    Edit
                </button>


            {isEditOpen && (
                <div className={styles.modalOverlay}>
                    <div className={styles.modal}>
                    <h1>Edit Todo</h1>

                    <form onSubmit={handleSubmit}>
                        {/* <p>Title: </p>
                        <input
                            type="text"
                            name="item"
                            placeholder="Enter your Title"
                            onChange={handleChange}
                        /> */}
                        <p>Todo: </p>
                        <input
                            type="text"
                            name="item"
                            placeholder="Enter your todo"
                            onChange={handleChange}
                        />
                        <div className={styles.button}>
                            <button type="submit" className={styles.save}>
                            Save
                        </button>
                        
                        <button
                            onClick={() => {
                                setIsEditOpen(false);
                                setEditId(null);
                            }} className={styles.cancel}
                            >
                                Cancel
                        </button>
                        </div>

                        
                        
                    </form>
                    </div>
                </div>
            )}

            
            
        </div>
    );
}