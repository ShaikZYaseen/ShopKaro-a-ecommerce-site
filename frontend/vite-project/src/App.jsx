import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import './App.css';

// Import components
import Header from '../src/components/Header/Header.jsx';
import FooterComponent from './components/Footer/FooterComponent.jsx'
import Home from './components/Home/Home.jsx';
import ProductDetails from './components/ProductDetails/ProductDetails.jsx';


function App() {
  return (
    <Router>
      <Header />
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/product/:id" element={<ProductDetails/>}/>
      </Routes>
      <FooterComponent/>
    </Router>
  );
}

export default App;
