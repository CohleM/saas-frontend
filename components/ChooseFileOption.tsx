"use client"

import { DotsHorizontalIcon } from "@radix-ui/react-icons"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import useLocalStorage from "use-local-storage";

export function ChooseFileOption({fileID, refreshFiles} : {fileID: number, refreshFiles: () => void}) {
    const [accesstoken, setAccessToken] = useLocalStorage("access_token",''); 

const handleDelete = async () => {
    const token = accesstoken

    try {
      const response = await fetch(`http://localhost:8000/delete-file/?file_id=${fileID}`, {
        method : 'GET',
        headers : {
          Authorization : `Bearer ${token}`,
          'Content-Type' : 'application/json'
        }
    }
      ) 

      if (response.ok) {
        console.log('deleted successfully')
        //do something 
        const result = await response.json()
        console.log(result['success'])
        refreshFiles()
      }
      else {
        //display error
      }
    }

    catch(error) {
      console.error('error', error)
    }
}



const handleDownload = async () => {
    const token = accesstoken

    try {
      const response = await fetch(`http://localhost:8000/download-file/?file_id=${fileID}`, {
        method : 'GET',
        headers : {
          Authorization : `Bearer ${token}`,
          'Content-Type' : 'application/json'
        }
    }
      ) 

      if (response.ok) {
        console.log('deleted successfully')
        //do something 
        const result = await response.json()
        console.log(result['link'])
        refreshFiles()
      }
      else {
        //display error
      }
    }

    catch(error) {
      console.error('error', error)
    }
}
  return (
    <DropdownMenu >
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
        >
          <DotsHorizontalIcon className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        <DropdownMenuItem onClick={handleDownload}>Download</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleDelete}>
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}