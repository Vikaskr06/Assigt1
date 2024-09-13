import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import SignUp from './SignUp';
import Login from './Login';
import PropertyList from './PropertyList';
import AddProperty from './AddProperty';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        {/* The App component will serve as the layout for nested routes */}
        <Route path="/" element={<App />}>
          <Route path="signup" element={<SignUp />} />
          <Route path="login" element={<Login />} />
          <Route path="properties" element={<PropertyList />} />
          <Route path="add-property" element={<AddProperty />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
