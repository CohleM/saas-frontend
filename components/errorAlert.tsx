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

export function ErrorDialogBox() {
    const [open, setOpen] = useState(true);

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
            <AlertDialogCancel onClick={() => {setOpen(false)}} >Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => {push('/login')}}>Login</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    )
  }