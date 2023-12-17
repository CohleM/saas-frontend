

'use client'
import { Button } from "@/components/ui/button";
import { BubbleMenu, useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { useState, useEffect } from "react";


interface IResponseObject {
  role: string;
  content: string;
}


const Tiptap = () => {

  const [messages, setMessages] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [socket, setSocket] = useState<WebSocket | null>(null);
  // const [tiptap, setTiptap] = useState();

  const [msg, setMsg] = useState<string>('')


  const [data, setData] = useState('hello this is cool haha '); 
  const [eventSourceInitialized, setEventSourceInitialized] = useState(false);




  const handleClick = () => {

  };

  const editor = useEditor({
    extensions: [
      StarterKit,
    ],
    content: data,
    editorProps: {
        attributes: {
          class: 'prose dark:prose-invert prose-sm sm:prose-base lg:prose-lg xl:prose-base m-5 focus:outline-none',
        },
      }
  })

  //openai streaming response
  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8000/ws');


    ws.onopen = () => {
      console.log('WebSocket connection opened.');
    };
  
    ws.onmessage = (e) => {
      const message = e.data;


      console.log('backend ', message)

      if (editor) {
        editor.commands.insertContent(message)
      }
    
      // setMsg(msg)
      
    };
  
    ws.onclose = () => {
      console.log('WebSocket connection closed.');
    };
  
    setSocket(ws);
  
    return () => {
      console.log('Component unmounted. Closing WebSocket connection.');
      ws.close();
    };
  }, [editor]);

  const sendMessage = () => {
    
    if(socket){


        // editor?.commands.
        console.log('fron frontend :', inputValue)

        if (editor) {
          const { from, to } = editor.view.state.selection
          const text = editor?.view.state.doc.textBetween(from, to, '')
          console.log(text)
          // editor?.commands.insertContent('text')
          socket.send(text);
        }

    }

  };

  return (
    <div>
        <Button onClick={sendMessage}> Click me</Button>

        {/* {editor && <BubbleMenu editor={editor} tippyOptions={{ duration: 100 }}>
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
      </BubbleMenu>} */}

        <EditorContent editor={editor} />
    </div>
    
  )
}

export default Tiptap

