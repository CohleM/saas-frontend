"use client";

import React from "react";
import Textarea from "react-textarea-autosize";
import { User2, Bot } from "lucide-react";
const chat = () => {
  let messages = [
    { id: 1, role: "user", content: "Hey how are you" },
    {
      id: 2,
      role: "AI",
      content:
        "The Dalai Lama: A Beacon of Peace and Compassion  The Dalai Lama, whose name means  is a spiritual leader and the head of the Tibetan government in exile. Born as Tenzin Gyatso on July 6, 1935, in a small village in northeastern Tibet, he has dedicated his life to promoting peace, compassion, and human rights. His teachings and actions have not only impacted the lives of millions of Tibetans but have also resonated with people from various cultures and backgrounds around the world.  The Dalai Lama's journey to becoming a revered figure began at the age of two when he was recognized as the reincarnation of the previous Dalai Lama. This recognition marked the start of a rigorous and comprehensive education in Buddhist philosophy, meditation, and political affairs. By the age of fifteen, he assumed full political and spiritual leadership of Tibet, just as the country faced threats from China's invasion.  Under his leadership, Tibet experienced a period of relative stability and progress. The Dalai Lama implemented various reforms to modernize Tibet's education system, healthcare, and economy. However, his efforts to maintain Tibet's unique cultural identity and autonomy were met with resistance from the Chinese government, leading to increased tensions and ultimately his exile in 1959.  Since then, the Dalai Lama has tirelessly advocated for the Tibetan cause and the nonviolent resolution of conflicts. Despite the challenges faced by his people, he has consistently promoted peace, compassion, and dialogue as the means to overcome adversity. His unwavering commitment to nonviolence has earned him international recognition, including the Nobel Peace Prize in 1989.  One of the Dalai Lama's most profound teachings revolves around the concept of compassion. He believes that compassion is the key to achieving inner peace and harmony in the world. His teachings on compassion emphasize the importance of empathy, kindness, and understanding towards all sentient beings. He encourages individuals to cultivate a sense of universal responsibility, where the well-being of others becomes a priority.  The Dalai Lama's philosophy extends beyond religious boundaries, appealing to people of all faiths and those who do not follow any particular religion. His teachings have inspired individuals to practice mindfulness, tolerance, and respect for others. Through his speeches, books, and public appearances, he has touched the lives of millions and served as a moral compass in a world often plagued by conflict and division.  In addition to his spiritual teachings, the Dalai Lama has also been an advocate for environmental sustainability and social justice. He recognizes the interconnectedness of all life and the urgent need to protect our planet. His efforts to raise awareness about climate change and promote sustainable practices have resonated with environmentalists and policymakers worldwide.  The Dalai Lama's influence extends far beyond his spiritual and political role. He has become a symbol of hope and resilience for Tibetans who continue to face persecution and oppression. His unwavering commitment to nonviolence and his ability to maintain a compassionate outlook in the face of adversity serve as a source of inspiration for those struggling for freedom and justice in Tibet and around the world.  In conclusion, the Dalai Lama's life and teachings have made an indelible impact on the world. His unwavering commitment to peace, compassion, and human rights has earned him the respect and admiration of millions. Through his teachings and actions, he continues to inspire individuals to cultivate a more compassionate and harmonious world. The Dalai Lama's legacy will endure for generations, serving as a beacon of hope and a reminder of the transformative power of peace and compassion.",
    },
  ];

  return (
    <div className="">
      <div className="flex justify-start h-[calc(100vh-theme(space.20))]  space-x-16 mx-auto bg-gray-50">
        <div className="bg-slate-600 w-[20%]">div1</div>
        <div className=" w-[80%] border-l-2">
          <div className=" lg:mr-32 lg:ml-32">
            <div>
              {messages.length !== 0 ? (
                <div>
                  {messages.map((message) => (
                    <div key={message.id} className="w-full">
                      {message.role == "user" ? (
                        <div className="flex gap-x-4 mt-6 mb-6">
                          <div className="flex h-10 w-11 rounded-lg justify-center items-center border-2 shadow-xl shadow-gray-200">
                            <User2 className="h-4 w-4 " />
                          </div>

                          <p className="p-3 w-full  text-sm text-slate-600">
                            {message.content}
                          </p>
                          <hr className="h-2 bg-slate-700 text-slate-800" />
                        </div>
                      ) : (
                        <div className="flex gap-x-4">
                          <div className="flex h-10 w-11 bg-slate-900 rounded-lg justify-center items-center border-2 shadow-xl shadow-gray-200">
                            <Bot className="h-4 w-4 text-slate-200" />
                          </div>

                          <p className="p-3 w-full  text-sm text-slate-600  leading-5 ">
                            {message.content}
                          </p>
                          <hr />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div>
                  <h1> Please Start the conversation</h1>
                </div>
              )}
            </div>
            {/* <div className=' bottom-0 left-0 right-0 w-[100%]'> 

          <Textarea
            tabIndex={0}
            required
            rows={1}
            autoFocus
            placeholder="Send message..."
            spellCheck={false}
            className="w-full focus:outline-none shadow-teal-700 shadow-xl placeholder:text-gray-200 text-sm text-white p-5 pr-16 rounded-xl bg-gray-200"
          />
        </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default chat;
