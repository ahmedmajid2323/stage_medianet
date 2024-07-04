import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {RouterProvider} from "react-router-dom";
import router from './router';
import { ContextProvider } from './views/user/GlobalState';
import { GlobalProvider } from './views/user/CVmaker/GlobalState';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ContextProvider>
      <GlobalProvider>
        <RouterProvider router={router} />
      </GlobalProvider>
    </ContextProvider>
  </React.StrictMode>,
)
