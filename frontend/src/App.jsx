import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import CustomerList from './components/CustomerList';
import CustomerForm from './components/CustomerForm';
import EmployeeList from './components/EmployeeList';
import EmployeeForm from './components/EmployeeForm';
import ProductList from './components/ProductList';
import ProductsForm from './components/ProductForm'

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container mx-auto mt-6">
        <Routes>
          <Route path="/" element={<Navigate to="/customers" />} />
          <Route path="/customers" element={<CustomerList />} />
          <Route path="/customers/new" element={<CustomerForm />} />
          <Route path="/customers/edit/:id" element={<CustomerForm />} />
            <Route path="/employee" element={<EmployeeList />} />
  <Route path="/employees/new" element={<EmployeeForm />} />
  <Route path="/employees/edit/:id" element={<EmployeeForm />} />
   <Route path="/products" element={<ProductList />} />
          <Route path="/products/new" element={<ProductsForm />} />
          <Route path="/products/edit/:id" element={<ProductsForm />} />
  
          
        </Routes>
      </div>
    </Router>
  );
}
export default App;
