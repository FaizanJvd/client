import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './user/Login'
import UserRoutes from './user/UserRoutes'
import AddUser from './user/AddUser'
import ViewUsers from './user/ViewUsers'

const App = () => {
  return (
    <div>
    <Routes>
      <Route path="/" exact element={<Login/>} />
      <Route path="/user" element={<UserRoutes/>}>
        <Route path="/user/" element={<AddUser/>} />
        <Route path="/user/view" element={<ViewUsers/>} />
      </Route>
    </Routes>
    </div>
  )
}

export default App
