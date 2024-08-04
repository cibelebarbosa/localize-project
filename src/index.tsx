import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './utilities/global.scss'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import CardCustom from './components/Card';
import TableClient from './components/TableClient';
import TableArrearage from './components/TableArrearage';

const router = createBrowserRouter([
  {
    path: "/",
    element: <CardCustom children={<Login />} title="Login" table={false}/>
  },
  {
    path: "/register",
    element: <CardCustom children={<Register />} title="Cadastrar" table={false}/>
  },
  {
    path: "/client",
    element: <CardCustom children={<TableClient />} table={true}/>
  },
  {
    path: `/client/:user_id`,
    element: <CardCustom children={<TableClient />} table={true}/>
  },
  {
    path: "/arrearage",
    element: <CardCustom children={<TableArrearage />} table={true}/>
  },
  {
    path: "/arrearage/:client_id",
    element: <CardCustom children={<TableArrearage />} table={true}/>
  },
])

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

