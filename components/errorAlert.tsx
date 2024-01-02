// import {
//     AlertDialog,
//     AlertDialogAction,
//     AlertDialogCancel,
//     AlertDialogContent,
//     AlertDialogDescription,
//     AlertDialogFooter,
//     AlertDialogHeader,
//     AlertDialogTitle,
//     AlertDialogTrigger,
//   } from "@/components/ui/alert-dialog"
//   import { Button } from "@/components/ui/button"
// import { useState } from "react";   
// import { useRouter} from 'next/navigation';  

// export function ErrorDialogBox() {
//     const [open, setOpen] = useState(true);

//     const {push} = useRouter();
//     return (
//       <AlertDialog open={open}>

//         <AlertDialogContent>
//           <AlertDialogHeader>
//             <AlertDialogTitle>Session Expired</AlertDialogTitle>
//             <AlertDialogDescription>
//                 Your session has expired. Please Log in again.
//             </AlertDialogDescription>
//           </AlertDialogHeader>
//           <AlertDialogFooter>
//             <AlertDialogCancel onClick={() => {setOpen(false)}} >Cancel</AlertDialogCancel>
//             <AlertDialogAction onClick={() => {push('/login')}}>Login</AlertDialogAction>
//           </AlertDialogFooter>
//         </AlertDialogContent>
//       </AlertDialog>
//     )
//   }

  import React from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useState } from 'react';

type ErrorProps = {
    title : string,
    description : string,

    onAction : () => void
    actionLabel : string

}
export function ErrorDialogBox({ title, description,  onAction, actionLabel } : ErrorProps) {
    const [open, setOpen] = useState(true);


    const handleAction = () => {
        onAction(); // Invoke the onAction callback
        setOpen(false); // Close the dialog box

      };
      
      const handleCancel = () => {
        // onCancel(); // Invoke the onCancel callback
        setOpen(false); // Close the dialog box
      };


    return (
    <AlertDialog open={true}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>
            {description}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={handleCancel}>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleAction}>{actionLabel}</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}