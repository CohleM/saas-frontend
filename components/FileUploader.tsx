// // components/FileUploader.tsx
import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"

// interface FileUploaderProps {
//   onFileUpload: (file: File) => void;
// }

// const FileUploader: React.FC<FileUploaderProps> = ({ onFileUpload }) => {
//   const onDrop = useCallback((acceptedFiles: File[]) => {
//     if (acceptedFiles.length > 0) {


//       const file = acceptedFiles[0];
//       console.log(acceptedFiles)
//       onFileUpload(file);
//     }
//   }, [onFileUpload]);

//   const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

//   return (
//     <div {...getRootProps()} className='grid w-full max-w-sm items-center gap-1.5'>
//       {/* <input {...getInputProps()} />    */}
//       <Input id="picture" type="file" {...getInputProps()} />
//       {
//         isDragActive ?
//           <p>Drop the files here ...</p> :
//           <p>Drag 'n' drop some files here, or click to select files</p>
//       }
//     </div>


//   );
// };

// export default FileUploader;


import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function FileUploader() {

    async function handleFileUpload(event: React.ChangeEvent<HTMLInputElement>) {
        if (!event.target.files || event.target.files.length === 0) {
          return; // User canceled file selection
        }
      
        const file = event.target.files[0];
        const formData = new FormData();
      
        console.log(file)

        formData.append('file', file); 

        // for (const file of Array.from(files)) {
        //   formData.append('files', file);
        // }
      
        //handle the submissison
        await fetch('/api/file', {
          method: 'POST',
          body: formData,
        });



      }

  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="picture">Picture</Label>
      <Input  type="file"  onChange={handleFileUpload}/>
    </div>
  )
}
