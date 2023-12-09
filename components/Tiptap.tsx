

'use client'
import { Button } from "@/components/ui/button";
import { BubbleMenu, useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { useState, useEffect } from "react";
// import BubbleMenu from '@tiptap/extension-bubble-menu'




interface IResponseObject {
  role: string;
  content: string;
}


const Tiptap = () => {
  const [data, setData] = useState('hello this is cool haha '); 
  const [eventSourceInitialized, setEventSourceInitialized] = useState(false);
  const editor = useEditor({
    extensions: [
      StarterKit,
    ],
    content: data,
    editorProps: {
        attributes: {
          class: 'prose dark:prose-invert prose-sm sm:prose-base lg:prose-lg xl:prose-2xl m-5 focus:outline-none',
        },
      }
  })



  const handleClick = () => {
    // console.log('exec')
    // const { view, state } = editor
    // const { from, to } = view.state.selection
    // const text = state.doc.textBetween(from, to, '')

    // console.log('txt', text)
    // if (editor) {
    //   editor.commands.insertContent('Example Text gggg')
    // } 

    
    setEventSourceInitialized(true);
  };

  //openai streaming response

  useEffect(() => {

      const eventSource = new EventSource("http://localhost:8000/file/chatgpt/");

      if (editor) {

        eventSource.onmessage = (event) => {
            const responseObject = JSON.parse(event.data);
            editor.commands.insertContent(responseObject['content']) 

            // setResponse((prev: IResponseObject) => {
            //     const responseObjectRole = responseObject["role"] || "";
            //     const responseObjectContent = responseObject["content"] || "";
            //     const combinedObject = {
            //         // role: prev.role + responseObjectRole,
            //         role: prev.role + responseObjectRole,
            //         content: responseObjectContent,
            //     };
            //     return combinedObject;
            // });
        };
  
        eventSource.onerror = (error) => {
            console.log("Error with SSE connection:", error);
        };
      }

      return () => {
          eventSource.close();
      };
  },[eventSourceInitialized] )


  return (
    <div>
        <Button onClick={handleClick}> Click me</Button>

        {editor && <BubbleMenu editor={editor} tippyOptions={{ duration: 100 }}>
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={editor.isActive('bold') ? 'is-active' : ''}
        >
          bold
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={editor.isActive('italic') ? 'is-active' : ''}
        >
          italic
        </button>
        <button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={editor.isActive('strike') ? 'is-active' : ''}
        >
          strike
        </button>
      </BubbleMenu>}

        <EditorContent editor={editor} />
    </div>
    
  )
}

export default Tiptap

