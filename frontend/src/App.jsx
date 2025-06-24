import React from 'react'

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom"
import Home from './pages/Dashboard/Home'
import Login from './pages/Auth/Login'
import Income from './pages/Dashboard/Income'
import Expense from './pages/Dashboard/Expense'
import SignUp from './pages/Auth/SignUp'
import UserProvider from './context/userContext'


const App = () => {
  return (
    <UserProvider>
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Root/>} />
          
          <Route path="/login" exact element={<Login/>}/>
          <Route path="/signUp" exact element={<SignUp/>}/>
          <Route path="/dashboard" exact element={<Home/>}/>
          <Route path="/income" exact element={<Income/>}/>
          <Route path="/income" exact element={<Expense/>}/>
        </Routes>
      </Router>
    </div>
    </UserProvider>
  )
}

export default App

const Root = () =>{
      //cheak if token in local storage
      const isAuthenticated = !!localStorage.getItem("token");

      //Redirect to dashboard if authenticate, otherwise to log in

      return isAuthenticated ? (
        <Navigate to = "/dashboard" />
      ) : (
        <Navigate to ="/login" />
      )
}

