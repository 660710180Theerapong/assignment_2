import { useState } from "react";
import { Button, Spinner } from "@heroui/react";
import { TrashBin } from "@gravity-ui/icons";

import { createPortal } from "react-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import styles from "@/styles/DeleteTodoModal.module.css"

export default function DeleteModal({id, title}){
    const [isDeleteOpen, setIsDeleteOpen] = useState(false)
    const queryClient = useQueryClient();

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

        queryClient.invalidateQueries({
            queryKey: ["todos"],
            refetchType: "active",
            });
    },

    onError: (err) => {
        console.error(err);
    },
});

 

return(
    <div className=" w-44  space-y-3 pt-10">

        <Button onClick={() => {
            setIsDeleteOpen(true);
            }} isIconOnly variant="danger" fullWidth>
                <TrashBin className="w-10 h-10"/> Delete
        </Button>
        
        {isDeleteOpen && createPortal(
            <div className={styles.modalOverlay}>
                <div className={styles.modal}>

                <div className="justify-items-center">
                <p className="text-[32px] font-bold">⚠️ Delete Todo Alert</p>
                <div className="text-[14px] justify-items-center">
                    <p>Are you sure you want to delete <span className="font-bold text-[#FF383C]">"{title}"</span>?</p>

                    <p>This action cannot be undone.</p>
                </div>
                
                <div className="w-[300px] flex gap-3">
                    <Button className="w-44 " type="button" variant="secondary" fullWidth
                    onClick={() =>{ setIsDeleteOpen(false);}}
                    >
                    Cancel
                    </Button>
                    
                    <Button className="w-44" onClick={() => mutate()} variant="danger" fullWidth isPending={isPending}>
                    {({ isPending }) => (
                        <>                        
                        {isPending ? <Spinner color="current" size="xl" /> : 'Delete'}                        
                        </>
                    )}
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