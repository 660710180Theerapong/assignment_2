"use client";
import { useState } from "react";
import styles from "@/styles/EditTodo_Modal.module.css"

export default function EditTodo({id, onUpdated, item}) {
    const [isEditOpen, setIsEditOpen] = useState(false);



    const [todo, setTodo] = useState({
        id: id,
        title: item.title,
        item: item.item
    });


    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await fetch(`/api/todo/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(todo)
        });

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
                 
                        <p>Title: </p>
                        <input
                            type="text"
                            name="title"
                            defaultValue={item.title}
                            placeholder="Enter your title"
                            onChange={handleChange}
                        />
                        <p>Todo: </p>
                        <textarea
                            type="textarea"
                            name="item"
                            defaultValue={item.item}
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