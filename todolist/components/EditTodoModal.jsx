"use client";
import { Button, Spinner } from "@heroui/react";
import { useState } from "react";
import { createPortal } from "react-dom";
import { useMutation } from "@tanstack/react-query";

import styles from "@/styles/EditTodoModal.module.css"

export default function EditTodoModal({id, item}) {
    const [isEditOpen, setIsEditOpen] = useState(false)

    const [todo, setTodo] = useState({ 
        id: id, 
        title: item.title, 
        item: item.item 
    });

    const handleChange = (e) => { 
        setTodo({ 
            ...todo, 
            [e.target.name]: e.target.value 
        }) 
    };

    const { mutate, 
        isPending, 
        error } = useMutation({
        mutationKey: ["editTodo", id],

        mutationFn: async (updatedTodo) => {
        const res = await fetch(`/api/todo/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedTodo),
        });

        if (!res.ok) {
             throw new Error("Failed to update todo");
        }

        return res.json();
    },

    onSuccess: () => {
        setIsEditOpen(false);

        queryClient.invalidateQueries({
        queryKey: ["todos"],
        });
    },
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        mutate(todo);
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
                    <Button type="submit" fullWidth isPending={isPending}>
                        {({ isPending }) => (
                            <>
                            {isPending ? ( <Spinner color="current" size="xl" />) : ( "Save" )}
                            </>
                        )}
                        </Button>

                    <Button
                    type="button"
                    variant="secondary"
                    fullWidth
                    onClick={() =>{ 
                        setIsEditOpen(false);
                        }
                    }
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