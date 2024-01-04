
'use client'

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useEffect, useState, useRef } from "react";
import { Button } from "./ui/button";
import {Loader2} from 'lucide-react';
import { CheckCircle,XCircle } from 'lucide-react';
import useLocalStorage from "use-local-storage";

export const Icons = {
  spinner: Loader2,
};
export default function FileUploader({draftID} : {draftID: number}) {

    const [fileData, setFileData] = useState<File>();
    const [uploading, setUploading] = useState(false);
    const [uploadSuccess, setUploadSuccess] = useState(false);
    const [uploadError, setUploadError] = useState<string | null>(null);
    const [accesstoken, setAccessToken] = useLocalStorage("access_token",''); 

    const imageInputRef = useRef<HTMLInputElement>(null);


    function handleFileUpload(event: React.ChangeEvent<HTMLInputElement>) {
        if (!event.target.files || event.target.files.length === 0) {
          return; // User canceled file selection
        }
        const file = event.target.files[0];

        setFileData(file)
      }

      const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
            const token = accesstoken;
            setUploading(true)
            setUploadSuccess(false);
            setUploadError(null);

            event.preventDefault(); // Prevent default form submission behavior
            if (!imageInputRef.current?.files || imageInputRef.current?.files.length === 0) {
              // You could set some error message in a state here.
              console.log('lol')
              return;
            }
            const file = imageInputRef.current.files[0];
            const data = new FormData();
            data.append("file", file);
            console.log('GGGG', data)


            try { 

        const response = await fetch(`http://127.0.0.1:8000/upload-file/?draft_id=${draftID}`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
                 // Adjust the content type as needed
              },
            body: data
        })

        if(response.ok) {
            console.log('file succesfull uploaded')
            console.log(response)
                setUploadSuccess(true);
                setUploadError(null);
                
        }
        else {
            console.log('error unable to upload the file')
            console.log(response)
            setUploadSuccess(false);
            setUploadError('Error: Unable to upload the file');
        }
        imageInputRef.current.value = '';
    }
    catch (error) {
        console.log('error', error )
        setUploadSuccess(false);
        setUploadError('Error: Unable to upload the file');
    }
    setUploading(false)
}




  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
        <form onSubmit={handleSubmit}> 
      <Input  type="file" ref={imageInputRef} className="my-2"/>
      <Button type="submit" className="w-full my-2">{uploading && <Icons.spinner className="h-4 w-4 animate-spin mx-2 "  />}Upload </Button>
</form>
            {uploadSuccess && <div className='w-full bg-green-200 p-4 rounded flex space-x-2'><CheckCircle className='w-4 h-4 text-green-600'/> <div className='flex space-x-2'> </div><p className="text-green-500 text-sm">File Uploaded Successfully</p></div>}
            {uploadError &&  <div className='w-full bg-red-200 p-4 rounded flex space-x-2'><XCircle className='w-4 h-4 text-red-600'/> <div className='flex space-x-2'> </div><p className="text-red-500 text-sm">Could not upload the file. Please try again.</p></div>}
    </div>
  )
}
