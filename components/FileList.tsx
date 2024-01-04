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

import { ScrollArea } from "@/components/ui/scroll-area"; 
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

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"


import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import FileUploader from "@/components/FileUploader"
export function FileList({onCancel, draftID} : { onCancel : () => void, draftID: number}) {
  const [open, setOpen] = useState(true);

  const handleCancel = () => {
  setOpen(false);
  onCancel();
}


const tags = Array.from({ length: 50 }).map(
  (_, i, a) => `v1.2.0-beta.${a.length - i}`
)




  return (
    <Dialog open={open} onOpenChange={handleCancel}>
      <DialogTrigger asChild>
        <Button variant="outline">Share</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Files</DialogTitle>
          <DialogDescription>
          All the files for the draft. 
          </DialogDescription>
        </DialogHeader>




    <Tabs defaultValue="Files" className="w-[400px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="Files">Files</TabsTrigger>
        <TabsTrigger value="Upload File">Upload File</TabsTrigger>
      </TabsList>

      <TabsContent value="Files">
      <ScrollArea className="h-72 w-full rounded-md border">
      <div className="p-4">
        
        {tags.map((tag) => (
          <>
             <Button
                  key={tag}
                  variant="ghost"
                  className={`w-full justify-start font-normal `}
                >
                    {tag}
                </Button>
          </>
        ))}
      </div>
    </ScrollArea>

      </TabsContent>

      <TabsContent value="Upload File">
          <div className="h-72"> 
          <FileUploader draftID={draftID}/>
          </div>

      </TabsContent> 

      </Tabs>









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