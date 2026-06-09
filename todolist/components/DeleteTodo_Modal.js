import { useState } from "react";
import styles from "@/styles/Delete_Modal.module.css"

export default function Delete_popup({id, onUpdated}){
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
    <div>

        <button onClick={() => {
            setIsDeleteOpen(true);
            }} className={styles.delete}>
                Delete
        </button>
        
        {isDeleteOpen && (
            <div className={styles.modalOverlay}>
                <div className={styles.modal}>

                <div>
                <h3>⚠️ Delete Todo Alert</h3>
                <p>Are you sure you want to delete this todo?</p>

                <div className={styles.button}>

                    <button onClick={handleDelete} className={styles.delete}>
                    Delete
                    </button>

                    <button
                    onClick={() => {
                        setIsDeleteOpen(false);
                
                    }} className={styles.cancel}
                    >
                    Cancel
                    </button>
                </div>
                    
                </div>
                

                </div>
            </div>
            )}

    </div>
)
}