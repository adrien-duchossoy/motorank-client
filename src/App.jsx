import "./App.css"
import { Routes, Route } from "react-router"

// pages
import HomePage from "./pages/HomePage.jsx"
import LoggingPage from "./pages/auth/LoggingPage.jsx"
import PrivatePage from "./pages/PrivatePage/index.jsx"

// layouts
import WithNavbar from "./layouts/WithNavbar"
import WithoutNavbar from "./layouts/WithoutNavbar"

// components
import OnlyPrivate from "./components/guards/OnlyPrivate"

function App() {
  return (
    <Routes>
      <Route element={<WithNavbar />}>
        <Route path='/' element={<HomePage />} />
        <Route
          path='/private-page-example'
          element={
            <OnlyPrivate>
              <PrivatePage />
            </OnlyPrivate>
          }
        />
      </Route>

      <Route element={<WithoutNavbar />}>
        <Route path='/logging' element={<LoggingPage />} />
      </Route>
    </Routes>
  )
}

export default App
