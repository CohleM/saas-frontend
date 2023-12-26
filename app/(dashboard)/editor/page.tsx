//index.tsx
"use client";
import { Button } from "@/components/ui/button";
import { OutputData } from "@editorjs/editorjs";
import type { NextPage } from "next";
import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
// import Tiptap from '@/components/Tiptap'
import Tiptap from "@/components/editor/Tiptap";


// important that we use dynamic loading here
// editorjs should only be rendered on the client side.


const Home: NextPage = () => {
  var sample_data =    {
    "blocks":[
       {
          "id": "oUq2g_tl8y",
          "type": "header",
          "data": {
             "text": "Editor.js",
             "level": 2
          }
       },
       
    ],
    "version": "2.8.1"
 }
  //state to hold output data. we'll use this for rendering later
  const [data, setData] = useState<OutputData>(sample_data);

   // Function to handle API messages and update the paragraph's content
  
   const handleApiMessages = (apiMessages: string[]) => {
    // Find the paragraph block in the data
    const new_data = {
      "time": 1550476186479,
      "blocks": [
         {
            "id": "oUq2g_tl8y",
            "type": "header",
            "data": {
               "text": "haha hehe",
               "level": 2
            }
         },

         
        ]}

    setData(new_data);
   // console.log('yolo', data.blocks.find((block) => block.type === "paragraph")?.data.text)
  };
  const simulateApiMessages = () => {
    const apiMessages = ["This", "is", "a", "dynamic", "update"];
    handleApiMessages(apiMessages);
  };



  const handleClick = () => {
    simulateApiMessages();
  };

  useEffect(() => {
    // This will run after the component has re-rendered
    console.log('Updated data', data.blocks[0].data);
  }, [data]);

  return (
  
    <div className="mt-24">
     
      <Tiptap />
      
      {/* <EditorBlock data={data} onChange={setData} holder="editorjs-container" /> */}
    </div>
    
  );
};

export default Home;
