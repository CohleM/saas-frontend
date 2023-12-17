

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
  const [holdEditing, setHoldEditing] = useState(false);
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

      const message = JSON.parse(e.data);

      console.log('backend ', message['content'], message['finish_reason'])
      
      if (editor) {
        
        editor.commands.insertContent(message['content'])
        if (message['finish_reason'] == 'stop') {
          setHoldEditing(false);
        }
      }
      
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
          
          console.log('from', from, 'to', to)
          console.log(text)
          
          socket.send(text);
          setHoldEditing(true);
        }

    }

  };

  useEffect(() => {
  
    const onKeyDown = (e: KeyboardEvent) => {
      alert('Key pressed!'); 
      e.preventDefault();
    }
    const mousedownHandler = (e: MouseEvent) => {
      alert('Key pressed! gg');
      e.preventDefault();
    }

    if(holdEditing){
      document.addEventListener("keydown", onKeyDown);
      window.addEventListener("mousedown", mousedownHandler);
    }

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("mousedown", mousedownHandler);
    }; 
  

  }, [holdEditing])
  

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

