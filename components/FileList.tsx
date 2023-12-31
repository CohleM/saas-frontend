'use client'


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
import { Separator } from "@/components/ui/separator"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useEffect, useState } from "react"
import FileUploader from "@/components/FileUploader"
import useLocalStorage from "use-local-storage";
import { ChooseFileOption } from "./ChooseFileOption";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"



export function FileList({onCancel, draftID} : { onCancel : () => void, draftID: number}) {
  const [open, setOpen] = useState(true);
  
  const [tab, setTab] = useState("Files");
  const [accesstoken, setAccessToken] = useLocalStorage("access_token",''); 

  const [files, setFiles] = useState([]);
  
  const handleCancel = () => {
  setOpen(false);
  onCancel();
}


const tags = Array.from({ length: 50 }).map(
  (_, i, a) => `v1.2.0-beta.${a.length - i}`
)

  const onTabChange = (value: string) => {
    
      if(value=='Files') {
        loadFiles()
        console.log('heehee')
        setTab('Files')
      }
      else{
        setTab('Upload File')
      }
  }

  const loadFiles = async () => {
    const token = accesstoken

    try {
      const response = await fetch(`http://localhost:8000/get-files/?draft_id=${draftID}`, {
        method : 'GET',
        headers : {
          Authorization : `Bearer ${token}`,
          'Content-Type' : 'application/json'
        }
    }
      ) 

      if (response.ok) {
        //do something 
        const result = await response.json()
        console.log(result['files'])
        const sortedFiles = result['files'].sort((a, b) => {
          // Convert the last_updated values to Date objects for comparison
          const dateA = new Date(a.last_updated);
          const dateB = new Date(b.last_updated);
        
          // Sort in descending order (latest first)
          return dateB - dateA;
        });

        setFiles(sortedFiles) 
      }
      else {
        //display error
      }
    }

    catch(error) {
      console.error('error', error)
    }

  }

  useEffect(() => {
    loadFiles()
 
  }, [])
  



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




    <Tabs value={tab} onValueChange={onTabChange} className="w-[400px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="Files">Files</TabsTrigger>
        <TabsTrigger value="Upload File">Upload File</TabsTrigger>
      </TabsList>

      <TabsContent value="Files">
      <ScrollArea className="h-72 w-full rounded-md border">
      <div className="p-4">
      <div className="flex flex-col space-y-2" > 
        {files.map((tag, id) => (
          
            //  <Button
            //       key={id}
            //       variant="ghost"
            //       className={`w-full justify-start font-normal `}
            //     >
            //         {tag['name']}
            //     </Button>
            <div>
            <div className="flex justify-between items-center "> 
             <p className="text-sm text-gray-600 font-semibold"> {tag['name']}</p> 
             < ChooseFileOption fileID = {tag['id']} refreshFiles = {loadFiles}/>
          
            </div> 
             {/* <Separator className="my-1"/> */}
            </div> 
          
        ))}
        
        </div>
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
