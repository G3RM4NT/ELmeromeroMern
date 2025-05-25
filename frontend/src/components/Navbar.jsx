import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

export default function Navbar() {
  const location = useLocation();

  // Define las rutas y títulos (puedes cambiar el contador dinámicamente si quieres)
  const navItems = [
    { label: 'Clientes', path: '/customers',  },
    { label: 'Empleados', path: '/employees' },
    { label: 'Productos', path: '/products' }
  ];

  return (
    <div className="navbar-bg">
      <nav className="navbar-custom">
        {navItems.map((item, idx) => {
          // Detecta si la ruta está activa
          const isActive = location.pathname.startsWith(item.path);
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`navbar-link${isActive ? ' active' : ''}`}
            >
              <span>{item.label}</span>
              {item.count !== undefined && idx === 0 && (
                <span className="navbar-badge">{item.count}</span>
              )}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
