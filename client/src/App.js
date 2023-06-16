import './App.css';
import Footer from './components/Layout/Footer';
import {
  HashRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import About from './pages/About';
import Contact from './pages/Contact';
import Register from './pages/auth/Register';
import Login from './pages/auth/Login';
import HomePage from './pages/HomePage';
import Dashboard from './pages/user/Dashboard';
import Private from './components/Routes/Private';
import ForgotPassword from './pages/auth/ForgotPassword';
import Header from './components/Layout/Header';
import AdminRoute from './components/Routes/AdminRoute';
import AdminDashboard from './pages/Admin/AdminDashboard';
import CreateCategory from './pages/Admin/CreateCategory';
import CreateProduct from './pages/Admin/CreateProduct';
import Users from './pages/Admin/Users';
import Orders from './pages/user/Orders';
import Profile from './pages/user/Profile';
import Products from './pages/Admin/Products';
import UpdateProduct from './pages/Admin/UpdateProduct';
import Search from './pages/Search';
import ProductDetails from './pages/ProductDetails';
import CategoryProduct from './pages/CategoryProduct';
import CartPage from './pages/CartPage';
import AdminOrders from './pages/Admin/AdminOrders';
import AllCategoryProduct from './pages/user/AllCategoryProduct';
import PaymentSuccess from './pages/PaymentSuccess';

function App() {
  return (
    <>
      <Router>
        <Header></Header>
        <div>
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/paymentsuccess' element={<PaymentSuccess />} />
            <Route path='/product/:slug' element={<ProductDetails />} />
            <Route path='/categories' element={<AllCategoryProduct />} />
            <Route path='/cart' element={<CartPage />}></Route>
            <Route path='/category/:slug' element={<CategoryProduct />} />
            <Route path='/search' element={<Search />} />
            <Route path='/dashboard' element={<Private />}>
              <Route path='user' element={<Dashboard />} />
              <Route path='user/orders' element={<Orders />} />
              <Route path='user/profile' element={<Profile />} />
            </Route>
            <Route path='/dashboard' element={<AdminRoute />}>
              <Route path='admin' element={<AdminDashboard />} />
              <Route path='admin/create-category' element={<CreateCategory />} />
              <Route path='admin/create-product' element={<CreateProduct />} />
              <Route path='admin/product/:slug' element={<UpdateProduct />} />
              <Route path='admin/products' element={<Products />} />
              <Route path='admin/users' element={<Users />} />
              <Route path='admin/orders' element={<AdminOrders />} />
            </Route>
            <Route path='/register' element={<Register />} />
            <Route path='/forgot-password' element={<ForgotPassword />} />
            <Route path='/login' element={<Login />} />
            <Route path='/about' element={<About />} />
            <Route path='/contactus' element={<Contact />} />
          </Routes>
        </div>
        <Footer></Footer>
      </Router>
    </>
  );
}

export default App;
