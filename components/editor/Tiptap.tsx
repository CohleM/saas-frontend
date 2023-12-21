

'use client'
import { Button } from "@/components/ui/button";
import { BubbleMenu, useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { useState, useEffect } from "react";
import { EditorBubbleMenu } from "./bubble-menu";
import TaskItem from "@tiptap/extension-task-item";
import TaskList from "@tiptap/extension-task-list";
import Link from "@tiptap/extension-link"
import Underline from '@tiptap/extension-underline'
import { Markdown } from 'tiptap-markdown';
import HardBreak from '@tiptap/extension-hard-break'
import { Editor  } from "@tiptap/core";
import useLocalStorage from "use-local-storage";
import { useDebouncedCallback } from "use-debounce";


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
  const [cursorIndex, setCursorIndex] = useState(0);

  const [data, setData] = useState('hi'); 
  const [eventSourceInitialized, setEventSourceInitialized] = useState(false);
  const [initialContent, setInitialContent] = useState('')
  const [streamedContent, setStreamedContent] = useState('');
  const [finalMessage, setFinalMessage] = useState('');
  const [localStorage, setLocalStorage] = useLocalStorage("Content", data);
  const [isMenuOpen, setIsMenuOpen] = useState(false);


  const editor = useEditor({
    extensions: [
      StarterKit,
      TaskItem,
      TaskList,
      Link,
      Underline,
      HardBreak,
      Markdown.configure({
        html: true,                  // Allow HTML input/output
        tightLists: true,            // No <p> inside <li> in markdown output
        tightListClass: 'tight',     // Add class to <ul> allowing you to remove <p> margins when tight
        bulletListMarker: '-',       // <li> prefix in markdown output
        linkify: false,              // Create links from "https://..." text
        breaks: false,               // New lines (\n) in markdown input are converted to <br>
        transformPastedText: false,  // Allow to paste markdown text in the editor
        transformCopiedText: false,  // Copied text is transformed to markdown
      })
    ],
    content: data,
    editorProps: {
        attributes: {
          class: 'prose dark:prose-invert prose-sm sm:prose-base lg:prose-base xl:prose-base m-5 focus:outline-none',
        },
      }
      ,
  onUpdate: (e) => {
    //set debounce function here. debounce meaning it should save the content every seconds. not on every change.  
    debouncedUpdates(e)
  }
  })

  const debouncedUpdates = useDebouncedCallback(async ({ editor }) => {
    //const json_text = editor.getJSON();
    const json_text = editor.getText();
    setLocalStorage(json_text)
  }, 1000);


  useEffect(() => {
  //  editor?.commands.setContent(initialContent + streamedContent)
      // console.log('initialcontent', initialContent)
      editor?.commands.setContent(initialContent + streamedContent)
      // setInitialContent(initialContent + streamedContent)

  }, [initialContent, streamedContent])
  
  // useEffect(() => {
  //   //  editor?.commands.setContent(initialContent + streamedContent)
  //       // console.log('initialcontent', initialContent)
  //       editor?.commands.setContent(initialContent)
  //       // setInitialContent(initialContent + streamedContent)
  
  //   }, [initialContent]) 

  //openai streaming response
  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8000/ws');


    ws.onopen = () => {
      console.log('WebSocket connection opened.');
    };
  
    ws.onmessage = (e) => {

      const message = JSON.parse(e.data);

      //console.log('backend ', message['content'])
      
      if (editor) {
        
        // editor.commands.insertContent(message['content']) 
        // editor.getText() 
        // if (initialContent == '' ) {
        //   setInitialContent(editor.getText())
        // }
        // console.log('this is initial content', initialContent) 
        // setStreamedContent(message['content'])
        // editor.commands.setContent(initialContent + message['content'])
       //console.log('yeet', initialContent + message['content'])
        setStreamedContent(message['content'])

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

          setCursorIndex(to) 
          editor.commands.selectTextblockEnd()
          editor.commands.splitBlock({ keepMarks: false })
          // editor.commands.newlineInCode()
          
          // editor.commands.insertContentAt(to,' ') 
          // editor.commands.newlineInCode()

          editor.commands.insertContent('\n')
          console.log(editor.getText())
          
          setStreamedContent('')
          setInitialContent(editor.getText())
          
          // editor.commands.insertContent('<h1> This is markdown</h1>') 
          // editor.commands.insertContent('<h1>Hello</h1><p>This is normal text</p>')

          // split Node
          // editor.commands.insertContent('# This is all good')
          // editor.commands.splitBlock({ keepMarks: false })
          // editor.commands.insertContent('This is paragraph') 


          // editor.commands.insertContent('# This is all good \n This is a paragraph')

          // editor.commands.setHardBreak()
          // editor.commands.insertContent('<p>Normal text</p>')
          
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

      {editor && <EditorBubbleMenu editor={editor}  />}

        <EditorContent editor={editor} />
    </div>
    
  )
}

export default Tiptap

