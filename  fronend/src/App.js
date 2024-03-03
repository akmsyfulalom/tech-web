import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import JobResult from './career/jobResult';
import AddJob from './addJob';
import Home from './career/home';
import SignUp from './authentication/signUp';
import Navbar from './navbar';
import Login from './authentication/login';
import CareerPanel from './admin/careerPanel';
import Products from './admin/Products';
import ProductCreate from './admin/ProductCreate';
import ProductEdit from './admin/ProductEdit';
import ProductViews from './user/ProductViews'
import ProductList from './user/Productlist'
import Cart from './user/Cart'
import Order from './user/Order'
import Cheakout from './user/Cheakout';
import Main from './product/Main';
import Thankyou from './user/Thankyou';
import Orderviews from './admin/Orderviews';
import News from './news';
import PostNews from './news/post-news/post-news';
import ManageNews from './news/manage-news/manage-news';
import SinglePost from './news/single-post';


function App() {

  return (
    <Router>
      <Navbar />
      <div className="App">
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/addJob' element={<AddJob />} />
          <Route path='/categories/:category' element={<JobResult />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/login' element={<Login />} />
          <Route path='/products' element={<Main />} />
          <Route path='/admin/career' element={<CareerPanel />} />
          <Route path='/admin/products' element={<Products />} />
          <Route path='/admin/products/create' element={<ProductCreate />} />
          <Route path='/admin/products/:productId/edit' element={<ProductEdit />} />
          <Route path='/user/products/:id/view' element={<ProductViews />} />
          <Route path='/user/productlist' element={<ProductList />} />
          <Route path='/user/cart' element={<Cart />} />
          <Route path='/user/Cheakout' element={<Cheakout />} />
          <Route path='/user/Order' element={<Order />} />
          <Route path='/user/Thankyou' element={<Thankyou />} />
          <Route path='/admin/orderviews' element={<Orderviews />} />
          <Route path='/news' element={<News />} />
          <Route path='/news/post-news' element={<PostNews />} />
          <Route path='/news/manage-news' element={<ManageNews />} />
          <Route path='/news/:_id' element={<SinglePost />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;