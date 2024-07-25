import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Loginpg from './components/Loginpg';
import Home from './components/Home';
import reportWebVitals from './reportWebVitals';
import Electronics from './components/Electronics';
import InsertItem from './components/InsertItem';
import Edit from './components/Edit';
import BuyItem from './components/BuyItem';
import AddToCart from './components/AddToCart';
import {Usercontext} from './Context/Context';
import OrderHistory from './components/OrderHistory';
import RecentaView from './components/RecentaView';
function App() {
  const[status,setStatus]=useState("logout");
  const [user,setUser]=useState("ABC");
  return (
    <>
   
    <BrowserRouter>
          <Usercontext.Provider value={{status,user}}>
        <Routes>
          <Route path='/' element={<Header />}>
          <Route path='/Login' element={<Loginpg />}></Route>
          <Route path='/Electronics' element={<Electronics />}></Route>
          <Route path='/insert' element={<InsertItem />}></Route>
          <Route path='/buy' element={<BuyItem />}></Route>
          <Route path='/recent' element={<RecentaView />}></Route>
          <Route path='/cart' element={<AddToCart />}></Route>
          <Route path='/orderhistory' element={<OrderHistory />}></Route>
          <Route path='/edit' element={<Edit />}></Route>
           <Route path='/Home' element={<Home />} ></Route>
           <Route path='/footer' element={<Footer />}></Route>
          </Route>
        </Routes>
          </Usercontext.Provider>

    </BrowserRouter>
    
    </>
  );
}

export default App;
