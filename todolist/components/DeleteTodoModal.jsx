import { useState } from "react";
import { Button, Spinner } from "@heroui/react";
import { createPortal } from "react-dom";
import { useMutation } from "@tanstack/react-query";

import styles from "@/styles/DeleteTodoModal.module.css"

export default function DeleteModal({id}){
    const [isDeleteOpen, setIsDeleteOpen] = useState(false)


    const { mutate, 
        isPending, 
        error } = useMutation({
        mutationKey: ["deleteTodo", id],

        mutationFn: async () => {
            const res = await fetch(`/api/todo/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ id }),
            });

            if (!res.ok) {
            throw new Error("Delete failed");
            }

            return res.json();
  },

    onSuccess: () => {
        setIsDeleteOpen(false);
    },

    onError: (err) => {
        console.error(err);
    },
});

 

return(
    <div className="w-[100px] space-y-3 pt-5">

        <Button onClick={() => {
            setIsDeleteOpen(true);
            }} variant="danger" fullWidth>
                Delete
        </Button>
        
        {isDeleteOpen && createPortal(
            <div className={styles.modalOverlay}>
                <div className={styles.modal}>

                <div className="justify-items-center">
                <h3>⚠️ Delete Todo Alert</h3>
                <p>Are you sure you want to delete this todo?</p>

                <div className="w-[200px] flex gap-3">

                    <Button onClick={() => mutate()} variant="danger" fullWidth isPending={isPending}>
                    {({ isPending }) => (
                        <>                        
                        {isPending ? <Spinner color="current" size="xl" /> : 'Delete'}                        
                        </>
                    )}
                    </Button>

                    <Button
                    onClick={() => {
                        setIsDeleteOpen(false);
                
                
                    }} variant="secondary" fullWidth
            
                    >
                    Cancel
                    </Button>
                </div>
                    
                </div>
                

                </div>
            </div>,
            document.body
            )}

    </div>
)
}