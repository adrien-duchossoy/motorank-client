import "./App.css"
import { Routes, Route } from "react-router"

// pages
import HomePage from "./pages/HomePage.jsx"
import Login from "./pages/auth/Login.jsx"
import Signup from "./pages/auth/Signup.jsx"
import PrivatePage from "./pages/PrivatePage/index.jsx"

// components
import Navbar from "./components/Navbar"
import OnlyPrivate from "./components/guards/OnlyPrivate"

function App() {
  return (
    <div>
      <Navbar />

      <br />
      <hr />

      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route
          path='/private-page-example'
          element={
            <OnlyPrivate>
              {" "}
              <PrivatePage />{" "}
            </OnlyPrivate>
          }
        />

        {/* error FE routes here... */}
      </Routes>
    </div>
  )
}

export default App
