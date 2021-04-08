import React from "react"
import logo from "./logo.svg"
import { BrowserRouter, Switch, Route } from "react-router-dom"
import Navbar from "./components/layout/Navbar"
import DashboardPage from "./components/dashboard/DashboardPage"
import SignInPage from "./components/auth/SignInPage"
import SignUpPage from "./components/auth/SignUpPage"
import ForgotPasswordPage from "./components/auth/ForgotPasswordPage"
import { AuthProvider } from "./components/contexts/AuthContext"
import DonatePage from "./components/dashboard/DonatePage"

function App() {
  let donorNum: number = 4;
  return (
    <BrowserRouter>
      <div className="App">
        <AuthProvider>
          <Navbar />
          <Switch>
            <Route exact path="/" component={DashboardPage}></Route>
            <Route path="/signin" component={SignInPage}></Route>
            <Route path="/signup" component={SignUpPage}></Route>
            <Route path="/forgot-password" component={ForgotPasswordPage}></Route>
            <Route path="/donate" render={() => <DonatePage donorNum={donorNum} />
            } />

          </Switch>
        </AuthProvider>

      </div>
    </BrowserRouter>

  )
}

export default App
