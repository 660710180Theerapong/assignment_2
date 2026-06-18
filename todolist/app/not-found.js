"use client"

import { Label, Button } from "@heroui/react"
import { useRouter } from "next/navigation"

export default function notFound(){
    const route = useRouter()

    return(
        <div  >
            <div className="flex min-h-screen flex-col items-center justify-center gap-6">
                <Label className="text-3xl font-bold text-[#000000] text-center">😑 Page not found: 404</Label>
                <div className="w-[300px] flex justify-center space-y-3 ">
                    <Button className="w-44" onClick={() => route.back()} variant="secondary" fullWidth>
                        Return
                    </Button>
                </div>
            </div>

            
        </div>
        

        
    )
}