"use client";
import { Switch } from "@heroui/react";


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

          {/* <Switch aria-label="Enable notifications">
            <Switch.Control>
              <Switch.Thumb />
            </Switch.Control>
          </Switch> */}

            <input
                type="checkbox"
                name="status"
                
                className="absolute inset-0 h-full w-full scale-125 object-cover select-none"
                checked={status}
                onChange={() => handleUpdateStatus(status)}
                         
        />
        </div>
    );
}