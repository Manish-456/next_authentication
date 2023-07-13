import Link from "next/link";

export default function Home() {
  return (
    <main className='grid place-content-center text-2xl min-h-screen'>
      <h3 className="animate-bounce">Home <span className="font-bold  bg-orange-500 p-2 rounded-md">Page</span></h3>
      <div className="mt-8 text-center animate-pulse">
        <Link className="text-blue-400 focus:underline hover:underline"  href={'/profile'}>Profile</Link>
      </div>
    </main>
  )
}
