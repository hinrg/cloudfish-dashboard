'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

export default function HelloWorld() {
  const [user, setUser] = useState<unknown>(null)
  const router = useRouter()

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        setUser(user)
      } else {
        router.push('/')
      }
    }
    getUser()
  }, [router])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push('/')
  }

  if (!user) return null

  // Type assertion here if you know the structure of the user object
  const typedUser = user as { email: string }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-400 to-blue-500 p-4">
      <div className="bg-white shadow-lg rounded-3xl p-8 space-y-8 text-center">
        <h1 className="text-3xl font-bold">Hello, {typedUser.email}!</h1>
        <p>Welcome to your authenticated page.</p>
        <button
          onClick={handleSignOut}
          className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
        >
          Sign Out
        </button>
      </div>
    </div>
  )
}