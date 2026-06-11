import { useState } from "react";
import { Button } from "@heroui/react";
import { createPortal } from "react-dom";

import styles from "@/styles/DeleteTodoModal.module.css"

export default function DeleteModal({id, onUpdated}){
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);

    const handleDelete = async () => {
  try {
    const res = await fetch(`/api/todo/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({id: id})    
    });

    if (!res.ok) throw new Error("Delete failed");

    setIsDeleteOpen(false);
    onUpdated();
  } catch (err) {
    console.error("Delete Error:", err);
  }}


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

                    <Button onClick={handleDelete} variant="danger" fullWidth>
                    Delete
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