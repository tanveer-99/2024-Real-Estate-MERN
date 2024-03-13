import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Signin from './pages/Signin'
import About from './pages/About'
import Profile from './pages/Profile'
import Header from './components/Header'
import Signup from './pages/Signup'
import PrivateRoute from './components/PrivateRoute'
import CreateListing from './pages/CreateListing';
import UpdateListing from './pages/UpdateListing'
import Listing from './pages/Listing'

const App = () => {
  return (
    <BrowserRouter>
      <Header></Header>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/sign-in" element={<Signin />}></Route>
        <Route path="/sign-up" element={<Signup />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/listing/:listingId" element={<Listing></Listing>}></Route>
        <Route element={<PrivateRoute></PrivateRoute>}>
          <Route path="/profile" element={<Profile />}></Route>
          <Route path="/create-listing" element={<CreateListing />}></Route>
          <Route path='/update-listing/:listingId' element={<UpdateListing></UpdateListing>}></Route>
        </Route>
        
      </Routes>
    </BrowserRouter>
  )
}

export default App