import { useRef, useEffect, useState, ReactNode } from 'react'
import { createPortal } from 'react-dom'
import styles from "./Overlay.module.css"

interface PortalProps {
    children: ReactNode
}

export const Portal = (props: any) => {
  const ref = useRef<Element | null>(null)
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    ref.current = document.querySelector<HTMLElement>("#portal")
    setMounted(true)
    console.log(ref.current)
  }, [])

  return (mounted && ref.current) ? createPortal(props.children, ref.current) : null
}

