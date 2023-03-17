import './App.css';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/navbar';
import Cart from './components/Cart/cart'
import Home from './components/home';
import Toko from './components/toko';
import Register from './components/Navbar/register';


function App() {
  

  return (
    <div>
      <Navbar />

      <Routes>
        <Route path='/emerce-app/' element={<Home/>}></Route>
        <Route path='/emerce-app/register' element={<Register/>}></Route>
        <Route path='/emerce-app/cart' element={<Cart/>}></Route>
        <Route path='/emerce-app/toko' element={<Toko/>}></Route>
      </Routes>
      
    </div>
  );
}

export default App;
