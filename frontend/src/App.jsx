import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify'
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Home from './pages/Home';
import VendorRegistration from './pages/VendorRegistration';
import Collections from './pages/Collections';
import About from './pages/About';
import Cart from './pages/Cart'
import WishList from './pages/WishList';
import Profile from './pages/Profile';
import UpdateProfile from './pages/UpdateProfile';
import MyOrders from './pages/MyOrders';
import MyProducts from './pages/MyProducts';
import AddProduct from './pages/AddProduct';
import ProductOverview from './pages/ProductOverview';

function App() {

  return (
    <div className='p-5'>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"
       />
      <Router>
        <Routes>
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path='/' element={<Home />} />
          <Route path='/:role/:authId' element={<Home />} />
          <Route path='/collections' element={<Collections />} />
          <Route path='/collections/:role/:authId' element={<Collections />} />
          <Route path='/about' element={<About />} />
          <Route path='/about/:role/:authId' element={<About />} />
          <Route path='/product-overview/:productId/:role/:authId' element={<ProductOverview />} />
          <Route path='/cart/:role/:authId' element={<Cart />} />
          <Route path='/wish-list/:role/:authId' element={<WishList />} />
          <Route path='/profile/:role/:authId' element={<Profile />} />
          <Route path='/update-profile/:role/:authId' element={<UpdateProfile />} />
          <Route path='/my-orders/:role/:authId' element={<MyOrders />} />
          <Route path='/my-products/:role/:authId' element={<MyProducts />} />
          <Route path='/add-product/:role/:authId' element={<AddProduct />} />
          <Route path='/vendor-registration/:authId' element={<VendorRegistration />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
