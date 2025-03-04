import './App.css'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Login from './pages/Login'
import { ToastContainer } from 'react-toastify';
import Dashboard from './pages/Dashboard';
import Orders from './pages/Orders';
import Products from './pages/Products';
import Customers from './pages/Customers';
import Vendors from './pages/Vendors';
import Categories from './pages/Categories';

function App() {

  return (
    <div className='p-5 bg-blue-50'>
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
          <Route path='/' element={<Login />} />
          <Route path='/dashboard/:adminEmail' element={<Dashboard />} />
          <Route path='/orders/:adminEmail' element={<Orders />} />
          <Route path='/products/:adminEmail' element={<Products />} />
          <Route path='/customers/:adminEmail' element={<Customers />} />
          <Route path='/vendors/:adminEmail' element={<Vendors />} />
          <Route path='/categories/:adminEmail' element={<Categories />} />
        </Routes>
      </Router>

    </div>
  )
}

export default App
