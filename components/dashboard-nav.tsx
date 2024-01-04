"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";

import { Fragment, useState } from "react";
import { Dialog, Disclosure, Popover, Transition } from "@headlessui/react";
import {
  ArrowPathIcon,
  Bars3Icon,
  ChartPieIcon,
  CursorArrowRaysIcon,
  FingerPrintIcon,
  SquaresPlusIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import {
  ChevronDownIcon,
  PhoneIcon,
  PlayCircleIcon,
} from "@heroicons/react/20/solid";

const products = [
  {
    name: "Analytics",
    description: "Get a better understanding of your traffic",
    href: "#",
    icon: ChartPieIcon,
  },
  {
    name: "Engagement",
    description: "Speak directly to your customers",
    href: "#",
    icon: CursorArrowRaysIcon,
  },
  {
    name: "Security",
    description: "Your customers’ data will be safe and secure",
    href: "#",
    icon: FingerPrintIcon,
  },
  {
    name: "Integrations",
    description: "Connect with third-party tools",
    href: "#",
    icon: SquaresPlusIcon,
  },
  {
    name: "Automations",
    description: "Build strategic funnels that will convert",
    href: "#",
    icon: ArrowPathIcon,
  },
];
const callsToAction = [
  { name: "Watch demo", href: "#", icon: PlayCircleIcon },
  { name: "Contact sales", href: "#", icon: PhoneIcon },
];

// function classNames(...classes) {
//   return classes.filter(Boolean).join(' ')
// }
import { FileList } from "./FileList";
export default function DashboardNavbar({draftsBar, draftID} : {draftsBar : () => void , draftID: number}) {

  const [isFileOpen, setIsFileOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);




  const handleDraftsBar = () => {
    draftsBar();
  }

  const handleCancel = () => {
    setIsFileOpen(false);
  }


  return (


<div >

  {isFileOpen && <FileList onCancel={handleCancel} draftID={draftID}/> }
<div className="h-14 top-0 bg-white left-0 fixed w-full z-20">

<div className="flex justify-between items-center h-full px-4"> 
  {/* Left elements */}
  <div className="flex items-center justify-start gap-x-4 ml-4">
    <button onClick={handleDraftsBar} >
    <Bars3Icon className="h-6 w-6"></Bars3Icon>
    </button>
    <p className="text-lg font-bold">AI Writer</p>
    
    <button onClick={() => {setIsFileOpen(true) }} >Files</button>
  </div>

  {/* Right elements */}
  <div className="flex justify-end gap-x-4 items-center mr-4">
    <Link href="w3schools.com">Download PDF</Link>
    <Button size="sm" className="w-24 text-sm">Upgrade</Button>
  </div>
</div>
</div>
</div>

  );
}
