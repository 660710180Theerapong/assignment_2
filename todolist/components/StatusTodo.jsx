"use client";

import { Checkbox } from "@heroui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function StatusTodo({ id, status }) {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationKey: ["updateStatus", id],
    mutationFn: async (newStatus) => {
      const res = await fetch(`/api/todo/${id}`, {

        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
          status: newStatus,
        }),
      });

      if (!res.ok) throw new Error("Update failed");
      return res.json();
    },

    onSuccess: () => {
    
      queryClient.invalidateQueries({
        queryKey: ["todos"],
        refetchType: "active",
      });
    },
  });

  return (
    <div>
      <input
        type="checkbox"
        name="status"
        checked={status}
        disabled={isPending}
        className="absolute inset-0 h-full w-full scale-125 object-cover select-none accent-[#00C950] hover:cursor-pointer hover:bg-gray-100"
        onClick={(e) => e.stopPropagation()}
        onChange={() => mutate(!status)}
      />
    </div>
  );
}