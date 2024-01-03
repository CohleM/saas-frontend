// // // components/FileUploader.tsx
// 'use client'
// import React, { useCallback } from 'react';
// import { useDropzone } from 'react-dropzone';
// // import { Input } from "@/components/ui/input"
// // import { Label } from "@/components/ui/label"

// // interface FileUploaderProps {
// //   onFileUpload: (file: File) => void;
// // }

// // const FileUploader: React.FC<FileUploaderProps> = ({ onFileUpload }) => {
// //   const onDrop = useCallback((acceptedFiles: File[]) => {
// //     if (acceptedFiles.length > 0) {


// //       const file = acceptedFiles[0];
// //       console.log(acceptedFiles)
// //       onFileUpload(file);
// //     }
// //   }, [onFileUpload]);

// //   const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

// //   return (
// //     <div {...getRootProps()} className='grid w-full max-w-sm items-center gap-1.5'>
// //       {/* <input {...getInputProps()} />    */}
// //       <Input id="picture" type="file" {...getInputProps()} />
// //       {
// //         isDragActive ?
// //           <p>Drop the files here ...</p> :
// //           <p>Drag 'n' drop some files here, or click to select files</p>
// //       }
// //     </div>


// //   );
// // };

// // export default FileUploader;


// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { useState } from 'react';
// import { Button } from './ui/button';
// export default function FileUploader() {
//     const [selectedFile, setSelectedFile] = useState(null);

//     const handleFileChange = (event) => {
//         console.log(event.target.files[0])
//         setSelectedFile(event.target.files[0]);
//       }




//     async function handleFileUpload() {


//         if (selectedFile) {
            
//             const formData = new FormData();
//             console.log(selectedFile)
//             formData.append('file', selectedFile); 
    
          
//             try { 
//                 const response = await fetch('http://127.0.0.1:8000/upload-file', {
//                     method: 'POST',
//                     body: formData
//                 })
    
//                 if(response.ok) {
//                     console.log('file succesfull uploaded')
//                     console.log(response)
    
//                 }
//                 else {
//                     console.log('error unable to upload the file')
//                     console.log(response)
//                 }
//             }
//             catch (error) {
//             }

//         }



//       }

//   return (
//     <div className="grid w-full max-w-sm items-center gap-1.5">
//       {/* <Label htmlFor="picture">Picture</Label> */}
//       <Input  type="file"  onChange={handleFileChange}/>
//       <Button onClick={handleFileUpload}>Upload</Button>
//     </div>
//   )
// }



import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useEffect, useState, useRef } from "react";
import { Button } from "./ui/button";

export default function FileUploader() {

    const [fileData, setFileData] = useState<File>();
    const [uploading, setUploading] = useState(false);
    const imageInputRef = useRef<HTMLInputElement>(null);


    function handleFileUpload(event: React.ChangeEvent<HTMLInputElement>) {
        if (!event.target.files || event.target.files.length === 0) {
          return; // User canceled file selection
        }
        const file = event.target.files[0];

        setFileData(file)
      }

      const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
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

        const response = await fetch('http://127.0.0.1:8000/upload-file', {
            method: 'POST',
            body: data
        })

        if(response.ok) {
            console.log('file succesfull uploaded')
            console.log(response)

        }
        else {
            console.log('error unable to upload the file')
            console.log(response)
        }
    }
    catch (error) {
        console.log('error', error )
    }
}



  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
        <form onSubmit={handleSubmit}> 
      <Input  type="file" ref={imageInputRef}/>
      <Button type="submit">Upload </Button>
</form>
    </div>
  )
}
