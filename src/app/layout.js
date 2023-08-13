//"use client" (client component 사용 선언)
import Link from 'next/link'
import './globals.css'
import { Control } from './Control';

export const metadata = {
  title: 'Next App Study1',
  description: '넥스트 APP 공부1',
}

export default async function RootLayout({ children }) {
   
  const res = await fetch(process.env.API_URL + 'topics', {next: {revalidate: 0}}); // or 캐시 사용 x {cache: 'no-store'}
  const topics = await res.json();

  return (
    <html>
      <body>
      <h1><Link href="/">WEB</Link></h1>
      <ol>
        {topics.map((topic) => {
          return <li key={topic.id}><Link href={`/read/${topic.id}`}>{topic.title}</Link></li>
        })}
      </ol>
        {children}
        <Control />
      </body>
    </html>
  )
}
