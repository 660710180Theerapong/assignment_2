"use client";
import styles from "@/styles/StatusTodo.module.css"

export default function StatusTodo({id, status, onUpdated}) {    


    const handleUpdateStatus = async (currentStatus) => {

    try {
      const res = await fetch(`/api/todo/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: id,
        status: !currentStatus
       }), 
    });

      if (!res.ok) throw new Error("Update failed");

  
        onUpdated();

      } catch (err) {
        console.error(err);
      }
  }



    return (      

        <div>
            <input
                type="checkbox"
                name="status"
                className={styles.largeCheckbox}
                checked={status}
                onChange={() => handleUpdateStatus(status)}
                         
        />
        </div>
    );
}