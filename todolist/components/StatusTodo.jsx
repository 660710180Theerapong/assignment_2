"use client";

import { useState } from "react";


export default function StatusTodo({id, status, onUpdated}) {    

    const [statusPending, setStatusPending]=useState(false)
    const handleUpdateStatus = async (currentStatus) => {

    try {
      setStatusPending(true)
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
      } finally {
        setStatusPending(false)
      }
  }



    return (      

        <div>


            <input
                type="checkbox"
                name="status"
                disabled={statusPending}  
                className="absolute inset-0 h-full w-full scale-125 object-cover select-none"
                checked={status}
                onChange={() => handleUpdateStatus(status)}
                         
        />
        </div>
    );
}