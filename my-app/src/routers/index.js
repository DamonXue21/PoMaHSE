import { createBrowserRouter, Navigate } from 'react-router-dom'
import Home from '../pages/home'
import Main from '../pages/main.js'

const routes = [
  {
    path: "/",                    
    element: <Main />,            
    children: [
      {
        index: true,              
        element: <Home />
      },
      {
        path: "*",                
        element: <Home />
      }
    ]
  }
];

export default createBrowserRouter(routes)