import "./App.css"
import { Routes, Route } from "react-router"

import HomePage from "./pages/HomePage.jsx"
import MotoDetailPage from "./pages/MotoDetailPage.jsx"
import AuthPage from "./pages/auth/AuthPage.jsx"
import PrivatePage from "./pages/PrivatePage.jsx"
import MyProfilePage from "./pages/MyProfilePage.jsx"
import UserProfilePage from "./pages/UserProfilePage.jsx"
import FollowListPage from "./pages/FollowListPage.jsx"
import GaragePage from "./pages/GaragePage.jsx"
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
        <Route path='/me/followers' element={<OnlyPrivate><FollowListPage type="followers" /></OnlyPrivate>} />
        <Route path='/me/following' element={<OnlyPrivate><FollowListPage type="following" /></OnlyPrivate>} />
        <Route path='/user/:accountId' element={<UserProfilePage />} />
        <Route path='/user/:accountId/garage' element={<GaragePage />} />
        <Route path='/garage' element={<OnlyPrivate><GaragePage /></OnlyPrivate>} />
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
        <Route path='/auth' element={<AuthPage />} />
      </Route>
    </Routes>
  )
}

export default App
