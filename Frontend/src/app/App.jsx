import React from 'react'
import './App.css'
import { RouterProvider } from "react-router";
import routes from './app.routes.jsx';

const App = () => {
  return (
      // <Provider store={store}>
        <RouterProvider router={routes} />
    // </Provider>
  )
}

export default App