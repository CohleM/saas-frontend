"use client"


// import React, { FC, useEffect, useState } from "react";

// interface IResponseObject {
//     role: string;
//     content: string;
// }

// const ChatGPT: FC = () => {
//     const [response, setResponse] = useState<IResponseObject>({ role: "", content: "" });

//     useEffect(() => {
//         const eventSource = new EventSource("http://localhost:8000/file/chatgpt/");

//         eventSource.onmessage = (event) => {
//             const responseObject = JSON.parse(event.data);

//             setResponse((prev: IResponseObject) => {
//                 const responseObjectRole = responseObject["role"] || "";
//                 const responseObjectContent = responseObject["content"] || "";
//                 const combinedObject = {
//                     role: prev.role + responseObjectRole,
//                     content: prev.content + responseObjectContent,
//                 };
//                 return combinedObject;
//             });
//         };

//         eventSource.onerror = (error) => {
//             console.log("Error with SSE connection:", error);
//         };

//         return () => {
//             eventSource.close();
//         };
//     }, []);

//     return (
//         <div>
//             {response ? (
//                 <div><pre>{response.content}</pre></div>
//             ) : (
//                 <p>Loading chatGPT response...</p>
//             )}
//         </div>
//     );
// };

// export default ChatGPT;

// pages/index.js


import { useEffect, useState } from 'react';


// const newWs = 

export default function Home() {
  const [messages, setMessages] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [socket, setSocket] = useState<WebSocket | null>(null);

  const [msg, setMsg] = useState<string>('')


//   useEffect(() => {

//     const ws = new WebSocket('ws://localhost:8000/ws');

//     // ws.onopen = (event) => {
//     //     ws.send("Connect");
//     //   };
//   // recieve message every start page
//       ws.onmessage = (e) => {
//         const message = (e.data);
//         console.log(message)

//         setMessages(prevMessages => [...prevMessages, message])
//       };
//     setSocket(ws);    
//     // Cleanup function when the component unmounts
//     return () => {
//       console.log('Component unmounted. Closing WebSocket connection.');
//       ws.close(); // Close the WebSocket connection when the component unmounts
//     };



//   }, []);



useEffect(() => {
    const ws = new WebSocket('ws://localhost:8000/ws');
  
    ws.onopen = () => {
      console.log('WebSocket connection opened.');
    };
  
    ws.onmessage = (e) => {
      const message = e.data;
      console.log('backend', message)
      setMsg(msg)
      setMessages(prevMessages => [...prevMessages, message]);
    };
  
    ws.onclose = () => {
      console.log('WebSocket connection closed.');
    };
  
    setSocket(ws);
  
    return () => {
      console.log('Component unmounted. Closing WebSocket connection.');
      ws.close();
    };
  }, []);



  const sendMessage = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if(socket){
        
        console.log('fron frontend :', inputValue)
        socket.send(inputValue);
    }

  };

  return (
    <div className='mt-28'>
      <h1 >WebSocket Example</h1>
      <form onSubmit={sendMessage}>
        <input
          type="text"
          id="messageText"
          autoComplete="off"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button type="submit">Send</button>
      </form>
      <ul>
        {messages.map((message, index) => (
          <li key={index}>{message}</li>
        ))}

        <p> message: {msg}</p>
      </ul>
    </div>
  );
}
