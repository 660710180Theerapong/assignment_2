'use client' 

import { Button, Label } from '@heroui/react'

import { useRouter } from 'next/navigation'
 
export default function Error({ error, unstable_retry }) {

  const route = useRouter()

 
  return (
    <div >
        <div className="flex min-h-screen items-center justify-center gap-3">
            <Label className="text-3xl font-bold text-white text-center">Something went wrong whild add todo!</Label>
        </div>
      
    <div className="w-[100px] flax space-y-3 ">
        
        <Button onClick={() => unstable_retry()} variant="secondary" fullWidth>
            Try again
        </Button>

        <Button onClick={() => route.back()} variant="secondary" fullWidth>
            Return
        </Button>
    </div>
      

    </div>
  )
}