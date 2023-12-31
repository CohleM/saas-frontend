"use client"

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { Input } from "@/components/ui/input"

import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

import {DropdownMenuCheckboxes} from "@/components/ui/multiple-options"
import { Checkbox } from "@/components/ui/checkbox"
import {Icons } from "@/components/ui/circular-progress"

import { useEffect, useState} from 'react';
import { createPortal } from 'react-dom'
import { Portal } from "@headlessui/react";
import { useStreamedContent } from "@/app/context/StreamedContent";

export function CheckPortal({sendMessage, holdEditing} : {sendMessage: () => void, holdEditing: boolean}) {

  const {streamedContent, setStreamedContent} = useStreamedContent();

  const [isSubmit, setIsSubmit] = useState(false);

  const handleSubmit = () => {
    // console.log('yay')
    // setIsSubmit(true)
    sendMessage()
  }

  // useEffect( () => {
  //     console.log(streamedContent);
  // }, [streamedContent])


  return (
    //fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50
// w-1/2 z-50 absolute top-0 left-0

    <div className="mt-10"> 
      

    <Card>
      
    {!isSubmit  && <div> 
      <CardHeader>
        <CardTitle>AI Commands</CardTitle>

      </CardHeader>
      <CardContent className="grid gap-6">

      <div className="grid grid-cols-1 gap-4 w-full">
          <div className="grid gap-2">
            <Label htmlFor="security-level">Commands</Label>
            <Select defaultValue="2">
              <SelectTrigger
                id="security-level"
                className="line-clamp-1 w-full truncate"
              >
                <SelectValue placeholder="Select level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">Generate Report</SelectItem>
                <SelectItem value="2">Question Answering</SelectItem>
                <SelectItem value="3">Severity 3</SelectItem>
                <SelectItem value="4">Severity 4 (Lowest)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {/* <div className="grid gap-2">
            <Label htmlFor="security-level">Web Search</Label>
            </div> */}

          </div>


        <div className="grid grid-cols-1 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="area">Select files</Label>
            {/* <Select defaultValue="billing">
              <SelectTrigger id="area">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="team">Team</SelectItem>
                <SelectItem value="billing">Billing</SelectItem>
                <SelectItem value="account">Account</SelectItem>
                <SelectItem value="deployments">Deployments</SelectItem>
                <SelectItem value="support">Support</SelectItem>
              </SelectContent>
            </Select> */}
            
            <DropdownMenuCheckboxes />
          </div>

        </div>
        <div className="items-top flex space-x-2">
      <Checkbox id="terms1" />
      <div className="grid gap-1.5 leading-none">
        <label
          htmlFor="terms1"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Enable Web Search
        </label>
        {/* <p className="text-sm text-muted-foreground">
          You agree to our Terms of Service and Privacy Policy.
        </p> */}
      </div>
    </div>


        
      </CardContent>
      <CardFooter className="justify-between space-x-2">
        {/* <Button variant="ghost" onClick={onClose}>Cancel</Button> */}
        <Button onClick={handleSubmit} size="sm" className="w-full" disabled={holdEditing}> {holdEditing && <Icons.spinner className="h-4 w-4 animate-spin mx-2" />}Generate </Button>
      </CardFooter>
      </div>
        }


        {/* code for loading spiral function */}
        {/* {isSubmit && <div> <div className="flex  gap-x-4 items-center">
  <Icons.spinner className="h-4 w-4 animate-spin" />
  <h1 className="text-sm">AI is generating...</h1>
</div> </div>} */}

      
    </Card>

    
    
    </div>
    
    
  )
}




// import { Editor } from "@tiptap/core";
// import {
//   Check,
//   ChevronDown,
//   Heading1,
//   Heading2,
//   Heading3,
//   TextQuote,
//   ListOrdered,
//   TextIcon,
//   Code,
//   CheckSquare,
// } from "lucide-react";
// import * as Popover from "@radix-ui/react-popover";
// import { Dispatch, FC, SetStateAction } from "react";
// import { BubbleMenuItem } from ".";

// interface NodeSelectorProps {
//   editor: Editor;
//   isOpen: boolean;
//   setIsOpen: Dispatch<SetStateAction<boolean>>;
// }

// export const AICommands: FC<NodeSelectorProps> = ({
//   editor,
//   isOpen,
//   setIsOpen,
// }) => {
//   const items: BubbleMenuItem[] = [
//     {
//       name: "Text",
//       icon: TextIcon,
//       command: () =>
//         editor.chain().focus().toggleNode("paragraph", "paragraph").run(),
//       // I feel like there has to be a more efficient way to do this – feel free to PR if you know how!
//       isActive: () =>
//         editor.isActive("paragraph") &&
//         !editor.isActive("bulletList") &&
//         !editor.isActive("orderedList"),
//     },
//     {
//       name: "Heading 1",
//       icon: Heading1,
//       command: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
//       isActive: () => editor.isActive("heading", { level: 1 }),
//     },
//     {
//       name: "Heading 2",
//       icon: Heading2,
//       command: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
//       isActive: () => editor.isActive("heading", { level: 2 }),
//     },
//     {
//       name: "Heading 3",
//       icon: Heading3,
//       command: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
//       isActive: () => editor.isActive("heading", { level: 3 }),
//     },
//     {
//       name: "To-do List",
//       icon: CheckSquare,
//       command: () => editor.chain().focus().toggleTaskList().run(),
//       isActive: () => editor.isActive("taskItem"),
//     },
//     {
//       name: "Bullet List",
//       icon: ListOrdered,
//       command: () => editor.chain().focus().toggleBulletList().run(),
//       isActive: () => editor.isActive("bulletList"),
//     },
//     {
//       name: "Numbered List",
//       icon: ListOrdered,
//       command: () => editor.chain().focus().toggleOrderedList().run(),
//       isActive: () => editor.isActive("orderedList"),
//     },
//     {
//       name: "Quote",
//       icon: TextQuote,
//       command: () =>
//         editor
//           .chain()
//           .focus()
//           .toggleNode("paragraph", "paragraph")
//           .toggleBlockquote()
//           .run(),
//       isActive: () => editor.isActive("blockquote"),
//     },
//     {
//       name: "Code",
//       icon: Code,
//       command: () => editor.chain().focus().toggleCodeBlock().run(),
//       isActive: () => editor.isActive("codeBlock"),
//     },
//   ];

//   const activeItem = items.filter((item) => item.isActive()).pop() ?? {
//     name: "Multiple",
//   };

//   return (
//     <Popover.Root open={isOpen}>
//       <div className="relative h-full">
//         <Popover.Trigger
//           className="flex h-full items-center gap-1 whitespace-nowrap p-2 text-sm font-medium text-stone-600 hover:bg-stone-100 active:bg-stone-200"
//           onClick={() => setIsOpen(!isOpen)}
//         >
//           <span>{activeItem?.name}</span>
//           <ChevronDown className="h-4 w-4" />
//         </Popover.Trigger>

//         <Popover.Content
//           align="start"
//           className=" my-1 flex max-h-80 w-48 flex-col overflow-hidden overflow-y-auto rounded border border-stone-200 bg-white p-1 shadow-xl animate-in fade-in slide-in-from-top-1"
//         >
//           {/* <Popover.Content
//         className="rounded p-5 w-[260px] bg-white shadow-[0_10px_38px_-10px_hsla(206,22%,7%,.35),0_10px_20px_-15px_hsla(206,22%,7%,.2)] focus:shadow-[0_10px_38px_-10px_hsla(206,22%,7%,.35),0_10px_20px_-15px_hsla(206,22%,7%,.2),0_0_0_2px_theme(colors.violet7)] will-change-[transform,opacity] data-[state=open]:data-[side=top]:animate-slideDownAndFade data-[state=open]:data-[side=right]:animate-slideLeftAndFade data-[state=open]:data-[side=bottom]:animate-slideUpAndFade data-[state=open]:data-[side=left]:animate-slideRightAndFade"
//         sideOffset={5}
//       > */}
//         <Card>
//       <CardHeader>
//         <CardTitle>Report an issue</CardTitle>
//         <CardDescription>
//           What area are you having problems with?
//         </CardDescription>
//       </CardHeader>
//       <CardContent className="grid gap-6">
//         <div className="grid grid-cols-2 gap-4">
//           <div className="grid gap-2 z-[9999] ">
//             <Label htmlFor="area">Area</Label>
//             <Select defaultValue="billing" >
//               <SelectTrigger id="area">
//                 <SelectValue placeholder="Select" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="team">Team</SelectItem>
//                 <SelectItem value="billing">Billing</SelectItem>
//                 <SelectItem value="account">Account</SelectItem>
//                 <SelectItem value="deployments">Deployments</SelectItem>
//                 <SelectItem value="support">Support</SelectItem>
//               </SelectContent>
//             </Select>
//           </div>
//           <div className="grid gap-2">
//             <Label htmlFor="security-level">Security Level</Label>
//             <Select defaultValue="2">
//               <SelectTrigger
//                 id="security-level"
//                 className="line-clamp-1 w-[160px] truncate"
//               >
//                 <SelectValue placeholder="Select level" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="1">Severity 1 (Highest)</SelectItem>
//                 <SelectItem value="2">Severity 2</SelectItem>
//                 <SelectItem value="3">Severity 3</SelectItem>
//                 <SelectItem value="4">Severity 4 (Lowest)</SelectItem>
//               </SelectContent>
//             </Select>
//           </div>
//         </div>
//         <div className="grid gap-2">
//           <Label htmlFor="subject">Subject</Label>
//           <Input id="subject" placeholder="I need help with..." />
//         </div>
//         <div className="grid gap-2">
//           <Label htmlFor="description">Description</Label>
//           <Textarea
//             id="description"
//             placeholder="Please include all information relevant to your issue."
//           />
//         </div>
//       </CardContent>
//       <CardFooter className="justify-between space-x-2">
//         <Button variant="ghost">Cancel</Button>
//         <Button>Submit</Button>
//       </CardFooter>
//     </Card>
//       </Popover.Content>
//       </div>
//     </Popover.Root>
//   );
// };
