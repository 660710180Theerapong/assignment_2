"use client";
import { Button, Spinner } from "@heroui/react";
import {PencilToSquare} from '@gravity-ui/icons';
import { useState } from "react";
import { createPortal } from "react-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import styles from "@/styles/EditTodoModal.module.css"

export default function EditTodoModal({id, item}) {
    const [isEditOpen, setIsEditOpen] = useState(false)
    const queryClient = useQueryClient();
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

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString("en-GB", {
          timeZone: "Asia/Bangkok",
          day: "2-digit",
          month: "short",
          year: "numeric",
        });
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
        
        setIsEditOpen(false),
      
        queryClient.invalidateQueries({
        queryKey: ["todos"],
        refetchType: "active",
        })
    },
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        mutate(todo);
    };


    return (      

        <div className=" w-44 space-y-3">
            <Button  onClick={() => {
                
                setIsEditOpen(true);
                }} fullWidth >
                    <PencilToSquare className="w-10 h-10"/> Edit
                </Button>

                    {isEditOpen &&
        createPortal(
            <div className={styles.modalOverlay}>
            <div className={styles.modal} >
                <p className="text-[32px] font-bold">Edit Todo</p>

                <form onSubmit={handleSubmit} className="text-[14px]">

                <h2>Todo: #{item.id}</h2><hr/>

                <h2>Title<span className="text-[#FF383C]">*</span></h2>
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

                <h2>Description<span className="text-[#FF383C]">*</span></h2>
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

                    <h2>Last Updated: {formatDate(item.updated_at)}</h2><hr/>

                <div className="w-[300px] flex gap-3">
                    <Button className="w-44" type="button" variant="secondary" fullWidth
                    onClick={() =>{ setIsEditOpen(false);}}
                    >
                    Cancel
                    </Button>

                    <Button className="w-44" type="submit" fullWidth isPending={isPending}>
                        {({ isPending }) => (
                            <>
                            {isPending ? ( <Spinner color="current" size="xl" />) : ( "Save" )}
                            </>
                        )}
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