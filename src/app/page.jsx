"use client"

import React from 'react'
import Link from 'next/link'

const Home = () => {
  return (
    <div>
      <h1>Welcome to the Notes App</h1>
      <Link href="/signup">
        Sign Up
      </Link>
      <Link href="/signin">
        Sign In
      </Link>
    </div>
  )
}

export default Home