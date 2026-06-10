"use client";
import { Button } from "@heroui/react";
import { useState } from "react";
import { createPortal } from "react-dom";

import styles from "@/styles/EditTodoModal.module.css"

export default function EditTodoModal({id, onUpdated, item}) {
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

        <div className="w-[100px] space-y-3">
            <Button  onClick={() => {
                setIsEditOpen(true);
                }} fullWidth>
                    Edit
                </Button>

                    {isEditOpen &&
        createPortal(
            <div className={styles.modalOverlay}>
            <div className={styles.modal}>
                <h1>Edit Todo</h1>

                <form onSubmit={handleSubmit}>
                <h2>Title:</h2>
                <input
                    type="text"
                    name="title"
                    defaultValue={item.title}
                    placeholder="Enter your title"
                    onChange={handleChange}
                    className="border border-gray-400 rounded p-2 w-full"
                    required
                    onInvalid={(e) =>
                        e.target.setCustomValidity("Please enter your title")
                    }
                    onInput={(e) =>
                        e.target.setCustomValidity("")
                    }
                />

                <h2>Todo:</h2>
                <textarea
                    name="item"
                    defaultValue={item.item}
                    placeholder="Enter your todo"
                    onChange={handleChange}
                    className="border border-gray-400 rounded p-2 w-full"
                    required
                    onInvalid={(e) =>
                        e.target.setCustomValidity("Please enter your todo")
                    }
                    onInput={(e) =>
                        e.target.setCustomValidity("")
                    }
                />

                <div className="w-[200px] flex gap-3">
                    <Button type="submit" fullWidth>
                    Save
                    </Button>

                    <Button
                    type="button"
                    variant="secondary"
                    fullWidth
                    onClick={() => setIsEditOpen(false)}
                    >
                    Cancel
                    </Button>
                </div>
                </form>
            </div>
            </div>,
            document.body
  )}
            
            
        </div>
    );
}