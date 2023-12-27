

// 'use client'
// import { Button } from "@/components/ui/button";
// import { BubbleMenu, useEditor, EditorContent } from '@tiptap/react'
// import StarterKit from '@tiptap/starter-kit'
// import { useState, useEffect } from "react";
// import { EditorBubbleMenu } from "./bubble-menu";
// import TaskItem from "@tiptap/extension-task-item";
// import TaskList from "@tiptap/extension-task-list";
// import Link from "@tiptap/extension-link"
// import Underline from '@tiptap/extension-underline'
// import { Markdown } from 'tiptap-markdown';
// import HardBreak from '@tiptap/extension-hard-break'
// import { Editor  } from "@tiptap/core";
// import useLocalStorage from "use-local-storage";
// import { useDebouncedCallback } from "use-debounce";
// import {useStreamedContent} from "@/app/context/StreamedContent" 

// interface IResponseObject {
//   role: string;
//   content: string;
// }


// const Tiptap = () => {

//   const [messages, setMessages] = useState<string[]>([]);
//   const [inputValue, setInputValue] = useState('');
//   const [socket, setSocket] = useState<WebSocket | null>(null);
//   // const [tiptap, setTiptap] = useState();
//   const [holdEditing, setHoldEditing] = useState(false);
//   const [msg, setMsg] = useState<string>('')
//   const [cursorIndex, setCursorIndex] = useState(0);

//   const [data, setData] = useState('hi'); 
//   const [eventSourceInitialized, setEventSourceInitialized] = useState(false);
//   const [initialContent, setInitialContent] = useState('')
//   // const [streamedContent, setStreamedContent] = useState('');
//   const [finalMessage, setFinalMessage] = useState('');
//   const [localStorage, setLocalStorage] = useLocalStorage("Content", data);
//   const [isMenuOpen, setIsMenuOpen] = useState(false);

//   const {streamedContent, setStreamedContent}  = useStreamedContent()
//   const [cursorPos, setCursorPos] = useState(0);

//   const [previousContent, setPreviousContent] = useState('')



//   const editor = useEditor({
//     extensions: [
//       StarterKit,
//       TaskItem,
//       TaskList,
//       Link,
//       Underline,
//       HardBreak,
//       Markdown.configure({
//         html: true,                  // Allow HTML input/output
//         tightLists: true,            // No <p> inside <li> in markdown output
//         tightListClass: 'tight',     // Add class to <ul> allowing you to remove <p> margins when tight
//         bulletListMarker: '-',       // <li> prefix in markdown output
//         linkify: false,              // Create links from "https://..." text
//         breaks: false,               // New lines (\n) in markdown input are converted to <br>
//         transformPastedText: false,  // Allow to paste markdown text in the editor
//         transformCopiedText: false,  // Copied text is transformed to markdown
//       })
//     ],
//     content: data,
//     editorProps: {
//         attributes: {
//           class: 'prose dark:prose-invert prose-sm sm:prose-base lg:prose-base xl:prose-base m-5 focus:outline-none',
//         },
//       }
//       ,
//   onUpdate: (e) => {
//     //set debounce function here. debounce meaning it should save the content every seconds. not on every change.  
//     debouncedUpdates(e)
//   }
//   })
//   const handleSendMessage = () => {
//     sendMessage(); // Send message through the WebSocket connection
//   };
  

//   const debouncedUpdates = useDebouncedCallback(async ({ editor }) => {
//     //const json_text = editor.getJSON();
//     const json_text = editor.getText();
//     setLocalStorage(json_text)
//   }, 1000);


//   useEffect(() => {
//   //  editor?.commands.setContent(initialContent + streamedContent)
//       // console.log('initialcontent', initialContent)
//       //editor?.commands.setContent(initialContent + streamedContent)
//       if (editor) {
//         const { from, to } = editor.view.state.selection

//         console.log(cursorPos, previousContent.length)
        
        

//         editor?.commands.deleteRange({
//           from: cursorPos,
//           to: cursorPos + previousContent.length,
//         })

//         editor?.commands.insertContent(streamedContent)

//         editor?.commands.setTextSelection({
//           from: cursorPos,
//           to: cursorPos + streamedContent.length,
//         })

//       }
      


//       // setInitialContent(initialContent + streamedContent)

//   }, [initialContent, streamedContent])
  

//   //openai streaming response
//   useEffect(() => {
//     const ws = new WebSocket('ws://localhost:8000/ws');


//     ws.onopen = () => {
//       console.log('WebSocket connection opened.');
//     };
  
//     ws.onmessage = (e) => {

//       const message = JSON.parse(e.data);


//       if (editor) { 
        
//         setPreviousContent(streamedContent)

//         setStreamedContent(message['content'])
//         // editor.commands.insertContent(message['content'])
//         if (message['finish_reason'] == 'stop') {

//           setHoldEditing(false);
//         }
//       }
      
//     };
  
//     ws.onclose = () => {
//       console.log('WebSocket connection closed.');
//     };
  
//     setSocket(ws);
  
//     return () => {
//       console.log('Component unmounted. Closing WebSocket connection.');
//       ws.close();
//     };
//   }, [editor]);

//   const sendMessage = () => {
    
//     if(socket){


//         // editor?.commands.
//         console.log('fron frontend :', inputValue)

//         if (editor) {
//           const { from, to } = editor.view.state.selection
//           setCursorPos(to)
//           const text = editor?.view.state.doc.textBetween(from, to, '')
          
//           // console.log('from', from, 'to', to)
//           // console.log(text)

//           // const text1 = editor?.view.state.doc.nodesBetween(0, to)
//           // const text2 = editor?.view.state.doc.textBetween(to+1, editor.state.doc.content.size, '') 
//           // console.log(text1)  
//           // console.log(from, to)
//           // console.log(text2) 

//           // setCursorIndex(to) 
//           // editor.commands.selectTextblockEnd()
//           // editor.commands.splitBlock({ keepMarks: false })
//           editor.commands.newlineInCode()
          
//           // editor.commands.insertContentAt(to,' ') 
//           // editor.commands.newlineInCode()

//           // editor.commands.insertContent('\n')
//           // console.log(editor.getText())
          
//           // setStreamedContent('')
//           // setInitialContent(editor.getHTML())
//           //console.log(editor.getHTML())

//           socket.send(text);
//           setHoldEditing(true);
        


//         }

//     }

//   };

//   useEffect(() => {
  
//     const onKeyDown = (e: KeyboardEvent) => {
//       alert('Key pressed!'); 
//       e.preventDefault();
//     }
//     const mousedownHandler = (e: MouseEvent) => {
//       alert('Key pressed! gg');
//       e.preventDefault();
//     }

//     if(holdEditing){
//       document.addEventListener("keydown", onKeyDown);
//       window.addEventListener("mousedown", mousedownHandler);
//     }

//     return () => {
//       document.removeEventListener("keydown", onKeyDown);
//       window.removeEventListener("mousedown", mousedownHandler);
//     }; 
  

//   }, [holdEditing])
  

//   return (
//     <div>
//         <Button onClick={sendMessage}> Click me</Button>

//       {editor && <EditorBubbleMenu editor={editor}  sendMessage={handleSendMessage} />}

//         <EditorContent editor={editor} />
//     </div>
    
//   )
// }


// export default Tiptap



'use client'
import { Button } from "@/components/ui/button";
import { BubbleMenu, useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { useState, useEffect, useRef } from "react";
import { EditorBubbleMenu } from "./bubble-menu";
import TaskItem from "@tiptap/extension-task-item";
import TaskList from "@tiptap/extension-task-list";
import Link from "@tiptap/extension-link"
import Underline from '@tiptap/extension-underline'
import { Markdown } from 'tiptap-markdown';
import HardBreak from '@tiptap/extension-hard-break'
import { Editor  } from "@tiptap/core";
import ListItem  from "@tiptap/extension-list-item";
import useLocalStorage from "use-local-storage";
import { useDebouncedCallback } from "use-debounce";
import {useStreamedContent} from "@/app/context/StreamedContent" 
import Blockquote from "@tiptap/extension-blockquote";
import { Converter } from 'showdown';
import {  CheckPortal } from "./bubble-menu/ai-commands";
import ReactMarkdown from 'react-markdown';
import { Plus, MessageSquare, User2, Bot, SendHorizontal } from "lucide-react";
import DashboardNavbar from "@/components/dashboard-nav"

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
  const converter = new Converter({ metadata: true });


  // const {streamedContent, setStreamedContent}  = useStreamedContent()
  const [cursorPos, setCursorPos] = useState(0);

  const [previousContent, setPreviousContent] = useState('')
  const prev = useRef("");

  const [previousStreamedContent, setPreviousStreamedContent] = useState('');
  const [editorWidth, setEditorWidth] = useState('500px');

  useEffect(() => {
    setPreviousStreamedContent(streamedContent);
  }, [streamedContent]);

  const editor = useEditor({
    extensions: [
      StarterKit,
      TaskItem,
      TaskList,
      Link,
      Underline,
      HardBreak,
      ListItem,
      Blockquote,
      // Markdown.configure({
      //   html: true,                  // Allow HTML input/output
      //   tightLists: true,            // No <p> inside <li> in markdown output
      //   tightListClass: 'tight',     // Add class to <ul> allowing you to remove <p> margins when tight
      //   bulletListMarker: '-',       // <li> prefix in markdown output
      //   linkify: false,              // Create links from "https://..." text
      //   breaks: false,               // New lines (\n) in markdown input are converted to <br>
      //   transformPastedText: true,  // Allow to paste markdown text in the editor
      //   transformCopiedText: true,  // Copied text is transformed to markdown
      // })
    ],
    content: data,
    editorProps: {
        attributes: {
          class: 'max-w-full prose dark:prose-invert prose-sm sm:prose-base lg:prose-base xl:prose-base m-5 focus:outline-none',
        },
      }
      ,
  onUpdate: (e) => {
    //set debounce function here. debounce meaning it should save the content every seconds. not on every change.  
    debouncedUpdates(e)
  }
  })
  const handleSendMessage = () => {
    sendMessage(); // Send message through the WebSocket connection
  };
  

  // tiptap ProseMirror prose-invert prose-headings:font-title focus:outline-none [&:focus-visible]:outline-none max-w-full

  const debouncedUpdates = useDebouncedCallback(async ({ editor }) => {
    const json_text = editor.getJSON();
    // const json_text = editor.getText();
    setLocalStorage(json_text)
  }, 1000);

  


  

  //openai streaming response
  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8000/ws');


    ws.onopen = () => {
      console.log('WebSocket connection opened.');
    };
  
    ws.onmessage = (e) => {

      const message = JSON.parse(e.data);


      if (editor) { 
        
        // setStreamedContent(message['content'])
        // const output = converter.makeHtml(message['content']);
        setStreamedContent(message['content'])

        console.log(message['content'])
        // console.log(output)

        
        // prev.current = message['content'] 
        // editor.commands.insertContent(message['content'])
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
        // console.log('fron frontend :', inputValue)

        if (editor) {
          const { from, to } = editor.view.state.selection
          setCursorPos(to)
          const text = editor?.view.state.doc.textBetween(from, to, '')
         
          
          //console.log(previousContent, previousContent.length)
          // console.log('from', from, 'to', to)
          // console.log(text)

          // const text1 = editor?.view.state.doc.nodesBetween(0, to)
          // const text2 = editor?.view.state.doc.textBetween(to+1, editor.state.doc.content.size, '') 
          // console.log(text1)  
          // console.log(from, to)
          // console.log(text2) 

          // setCursorIndex(to) 
          // editor.commands.selectTextblockEnd()
          // editor.commands.splitBlock({ keepMarks: false })
          // editor.commands.newlineInCode()
          
          // editor.commands.insertContentAt(to,' ') 
          // editor.commands.newlineInCode()

          // editor.commands.insertContent('\n')
          // console.log(editor.getText())
          
          // setStreamedContent('')
          // setInitialContent(editor.getHTML())
          //console.log(editor.getHTML())


          // editor.commands.setTextSelection({from: 100, to:120})
          socket.send(text);
          setHoldEditing(true);
          // editor.commands.insertContent('<h1>Example Text</h1>')
        


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
  


  let chatTitles = [
    { id: 1, title: "Some chat" },
    { id: 2, title: "OpenAI is awesome" },
    { id: 3, title: "Anthropic" },
    { id: 4, title: "Phind is for coding" },
    {
      id: 5,
      title: "hugginface ",
    },
    { id: 1, title: "Some chat" },
    { id: 2, title: "OpenAI is awesome" },
    { id: 3, title: "Anthropic" },
    { id: 4, title: "Phind is for coding" },
    { id: 1, title: "Some chat" },
    { id: 2, title: "OpenAI is awesome" },
    { id: 3, title: "Anthropic" },
    { id: 4, title: "Phind is for coding" },
    { id: 1, title: "Some chat" },
    { id: 2, title: "OpenAI is awesome" },
    { id: 3, title: "Anthropic" },
    { id: 4, title: "Phind is for coding" },
    { id: 4, title: "Phind is for coding" },
    { id: 1, title: "Some chat" },
    { id: 2, title: "OpenAI is awesome" },
    { id: 3, title: "Anthropic" },
    { id: 4, title: "Phind is for coding" },
    { id: 1, title: "Some chat" },
    { id: 2, title: "OpenAI is awesome" },
    { id: 3, title: "Anthropic" },
    { id: 4, title: "Phind is for coding" },
  ];

  const [toggleSidebar, setToggleSidebar] = useState(true);

  const handleSidebar = () => {
      setToggleSidebar(!toggleSidebar)
      
  }



  return (
    <div> 

    <DashboardNavbar draftsBar={handleSidebar}/>
    
    <div className="flex gap-x-4 py-4">
        
        {toggleSidebar && <div className="w-1/3  mt-10"> 

            GG
        
        </div>
        }
      <div className="w-full overflow-y-auto mx-10 mt-10">
      {editor && <EditorBubbleMenu editor={editor}  sendMessage={handleSendMessage} />}

        <EditorContent editor={editor} />

        </div>

        <div className=" sticky top-0 w-1/2  h-screen overflow-y-auto border-l border-solid border-gray-300 p-4"> <div> <CheckPortal sendMessage={handleSendMessage}> </CheckPortal>

        {/* <div dangerouslySetInnerHTML={{ __html: streamedContent }}></div> */}
        <ReactMarkdown  
        
  //       components={{
	//   h1: ({ node, ...props }) => (
	//     <h1 className="font-bold text-2xl" {...props} />
	//   ),
  //   h2: ({ node, ...props }) => (
	//     <h1 className="font-bold text-xl" {...props} />
	//   ),
  //   h3: ({ node, ...props }) => (
	//     <h1 className="font-bold text-xl" {...props} />
	//   ),
	//   ul: ({ node, ...props }) => (
	//     <ul
	//       style={{
	//         display: "block",
	//         listStyleType: "disc",
	//         paddingInlineStart: "40px",
	//       }}
	//       {...props}
	//     />
	//   ),
	//   ol: ({ node, ...props }) => (
	//     <ol
	//       style={{
	//         display: "block",
	//         listStyleType: "decimal",
	//         paddingInlineStart: "40px",
	//       }}
	//       {...props}
	//     />
	//   ),
	// }} 

  className="prose"
  
  >{streamedContent}</ReactMarkdown>
        </div> 
        </div>
        
    </div>
    </div>
    
  )
}


export default Tiptap

