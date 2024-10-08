import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import './App.css';

// Import components
import Header from '../src/components/Header/Header.jsx';
import FooterComponent from './components/Footer/FooterComponent.jsx'
import Home from './components/Home/Home.jsx';
import ProductDetails from './components/ProductDetails/ProductDetails.jsx';
import Signup from "./components/Signup/Signup.jsx"
import Login from './components/Login/Login.jsx';
import Cart from './components/Cart/Cart.jsx';
import Address from './components/Address/Address.jsx';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signup" element={<Signup/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/product/:id" element={<ProductDetails/>}/>
      <Route path="/cart" element={<Cart/>} />
      <Route path="/address" element={<Address/>}/>
      </Routes>
      <FooterComponent/>
    </Router>
  );
}

export default App;
