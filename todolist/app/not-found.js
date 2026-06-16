"use client"

import { Label, Button } from "@heroui/react"
import { useRouter } from "next/navigation"

export default function notFound(){
    const route = useRouter()

    return(
        <div>
                <div className="flex min-h-screen items-center justify-center gap-3">
                <Label className="text-5xl font-bold text-white text-center">😑 Page not found: 404</Label>
            </div>

            <div className="w-[100px] flax space-y-3 ">
                <Button onClick={() => route.back()} variant="secondary" fullWidth>
                    Return
                </Button>
            </div>
        </div>
        

        
    )
}