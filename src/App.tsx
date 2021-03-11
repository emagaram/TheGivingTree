import React from "react"
import logo from "./logo.svg"
import { BrowserRouter, Switch, Route } from "react-router-dom"
import Navbar from "./components/layout/Navbar"
import DashboardPage from "./components/dashboard/DashboardPage"
import SignInPage from "./components/auth/SignInPage"
import SignUpPage from "./components/auth/SignUpPage"
import firebase from "./config/firebase"
import DonatePage from "./components/dashboard/DonatePage"

function App() {

  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <Switch>
          <Route exact path="/" component={DashboardPage}></Route>
          <Route path="/signin" component={SignInPage}></Route>
          <Route path="/signup" component={SignUpPage}></Route>
          <Route path="/donate" component={DonatePage}></Route>

        </Switch>
      </div>
    </BrowserRouter>
  )
}

export default App
