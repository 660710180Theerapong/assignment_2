'use client' 

import { Button, Label } from '@heroui/react'

import { useRouter } from 'next/navigation'
 
export default function Error({ error, unstable_retry }) {

  const route = useRouter()

 
  return (
    <div >
        <div className="flex min-h-screen flex-col items-center justify-center gap-6">
            
            <Label className="text-3xl font-bold text-[#000000] text-center">
                Something went wrong in todo details!
            </Label>

            <div className="w-[300px] flex gap-3">
                <Button className="w-44" onClick={() => route.push("/")} variant="secondary" fullWidth>
                Return
                </Button>

                <Button className="w-44" onClick={() => unstable_retry()} fullWidth>
                Try again
                </Button>

                
            </div>

        
        </div>
      
    
      

    </div>
  )
}