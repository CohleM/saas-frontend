'use client'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
  import { Button } from "@/components/ui/button"
import { useState } from "react";   
import { useRouter} from 'next/navigation';  

export function FileList({onCancel} : { onCancel : () => void}) {
    const [open, setOpen] = useState(true);
const handleCancel = () => {
  setOpen(false);
  onCancel();
}


    const {push} = useRouter();
    return (
      <AlertDialog open={open}>

        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Session Expired</AlertDialogTitle>
            <AlertDialogDescription>
                Your session has expired. Please Log in again.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleCancel} >Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => {push('/login')}}>Login</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    )
  }