import { Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import './App.css'
import Main from '@/components/main'

function App() {

  return (
     <>
      <Routes>
           <Route path="/" element={<Main />} />
        </Routes>
      </>
  )
}

export default App
