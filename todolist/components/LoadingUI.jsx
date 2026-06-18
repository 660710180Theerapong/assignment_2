"use client"
import {ProgressCircle, Label} from '@heroui/react';


export default function LoadingUI(){

    return (
        <div className="flex min-h-screen items-center justify-center gap-3">
         <ProgressCircle isIndeterminate aria-label="Loading">
          <ProgressCircle.Track>
            <ProgressCircle.TrackCircle />
            <ProgressCircle.FillCircle />
          </ProgressCircle.Track>
          </ProgressCircle>
          <Label className="text-3xl font-bold text-[#000000] text-center">Loading...</Label>
        </div>
      );
}