'use client'
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
// import { ScrollArea } from "@/components/ui/scroll-area"; 
// import drafts from "./editor/drafts";

// export function FileList({onCancel} : { onCancel : () => void}) {
//     const [open, setOpen] = useState(true);
// const handleCancel = () => {
//   setOpen(false);
//   onCancel();
// }

//     const {push} = useRouter();
//     const drafts = ['one',
//                     'two',
//                     'two',
//                     'two',
//                     'two',
//                     'two',
//                     'two',
//                     'two',
//                     'two',
//                     'two',
//                     'two',
//                     'two',
//                     'two',
//                     'two',
//                     'two',
//   ]
//     return (
      
//       <div className="w-full h-96"> 

//       </div>
//     )
//   }


import { Button } from "@/components/ui/button"
import { CopyIcon } from "@radix-ui/react-icons"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"

export function FileList({onCancel} : { onCancel : () => void}) {
  const [open, setOpen] = useState(true);

  const handleCancel = () => {
  setOpen(false);
  onCancel();
}
  return (
    <Dialog open={open} onOpenChange={handleCancel}>
      <DialogTrigger asChild>
        <Button variant="outline">Share</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share link</DialogTitle>
          <DialogDescription>
            Anyone who has this link will be able to view this.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="link" className="sr-only">
              Link
            </Label>
            <Input
              id="link"
              defaultValue="https://ui.shadcn.com/docs/installation"
              readOnly
            />
          </div>
          <Button type="submit" size="sm" className="px-3">
            <span className="sr-only">Copy</span>
            <CopyIcon className="h-4 w-4" />
          </Button>
        </div>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary" onClick={handleCancel}>
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
