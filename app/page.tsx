"use client"

import Image from 'next/image'
import Link from 'next/link'
import { useRef } from 'react';
export default function Home() {
	const portalRef = useRef(null);
  return (
    <main >
		<h1>
			hello
		</h1>
		<Link href = '/users'> users</Link>
		<div id="portal" ref={portalRef} />
	</main>
  )
}
