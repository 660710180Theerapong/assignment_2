'use client' 

import { Button, Label } from '@heroui/react'

import { useRouter } from 'next/navigation'
 
export default function Error({ error, unstable_retry }) {

  const route = useRouter()

 
  return (
    <div >
        <div className="flex min-h-screen flex-col items-center justify-center gap-6">
            
            <Label className="text-3xl font-bold text-white text-center">
                Something went wrong in todo details!
            </Label>

            <div className="w-[200px] flex gap-3">
                <Button onClick={() => unstable_retry()} variant="secondary" fullWidth>
                Try again
                </Button>

                <Button onClick={() => route.back()} variant="secondary" fullWidth>
                Return
                </Button>
            </div>

        
        </div>
      
    
      

    </div>
  )
}