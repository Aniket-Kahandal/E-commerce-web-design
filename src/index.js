import React from 'react';
import ReactDOM from 'react-dom/client';
// import './index.css';
import App from './App';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Loginpg from './components/Loginpg';
import Home from './components/Home';
import reportWebVitals from './reportWebVitals';
import Electronics from './components/Electronics';
import InsertItem from './components/InsertItem';
import Edit from './components/Edit';
// export default function App1() {
//   return (
//     <BrowserRouter>
//         <Routes>
          
          
//           <Route path='/' element={<Header />}>
//           <Route path='/Login' element={<Loginpg />}></Route>
//           <Route path='/Electronics' element={<Electronics />}></Route>
//           <Route path='/insert' element={<InsertItem />}></Route>
//           <Route path='/edit' element={<Edit />}></Route>
//            <Route path='/Home' element={<Home />} ></Route>
//            <Route path='/footer' element={<Footer />}></Route>
           
//           </Route>
//         </Routes>
//     </BrowserRouter>
//   )
// }


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
