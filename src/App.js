import './App.css';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar';
import Cart from './components/Cart/cart'
import Home from './components/home';
import Toko from './components/toko';


function App() {
  

  return (
    <div>
      <Navbar />

      <Routes>
        <Route exact path='/' element={<Home/>}></Route>
        <Route path='/cart' element={<Cart/>}></Route>
        <Route path='/toko' element={<Toko/>}></Route>
      </Routes>
      
    </div>
  );
}

export default App;
