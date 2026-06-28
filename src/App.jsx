import "./App.css"
import { Routes, Route } from "react-router"

import HomePage from "./pages/HomePage.jsx"
import MotoDetailPage from "./pages/MotoDetailPage.jsx"
import AuthPage from "./pages/auth/AuthPage.jsx"
import PrivatePage from "./pages/PrivatePage.jsx"
import MyProfilePage from "./pages/MyProfilePage.jsx"
import UserProfilePage from "./pages/UserProfilePage.jsx"
import WithNavbar from "./layouts/WithNavbar"
import WithoutNavbar from "./layouts/WithoutNavbar"
import OnlyPrivate from "./components/guards/OnlyPrivate"

function App() {
  return (
    <Routes>
      <Route element={<WithNavbar />}>
        <Route path='/' element={<HomePage />} />
        <Route path='/moto/:slug' element={<MotoDetailPage />} />
        <Route path='/me' element={<OnlyPrivate><MyProfilePage /></OnlyPrivate>} />
        <Route path='/user/:accountId' element={<UserProfilePage />} />
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
        <Route path='/logging' element={<AuthPage />} />
      </Route>
    </Routes>
  )
}

export default App
