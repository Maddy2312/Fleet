import React from 'react'
import "./App.css"
import { routes } from './app.route.jsx'
import { RouterProvider } from 'react-router'

const App = () => {
  return (
    <RouterProvider router={routes} />
  )
}

export default App