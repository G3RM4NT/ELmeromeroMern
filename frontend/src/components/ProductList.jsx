import React, { useEffect, useState } from 'react';
import { getProducts, deleteProduct } from '../services/ProductService';
import { Link } from 'react-router-dom';
import { FaEdit, FaTrash, FaBoxOpen } from 'react-icons/fa';

export default function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const res = await getProducts();
    setProducts(res.data);
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Eliminar producto?')) {
      await deleteProduct(id);
      fetchProducts();
    }
  };

  const styles = {
    container: {
      background: '#18181b',
      minHeight: '100vh',
      padding: '32px 24px',
    },
    title: {
      color: '#fff',
      fontWeight: '700',
      fontSize: '2rem',
      marginBottom: '24px',
      paddingLeft: '8px',
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
      gap: '28px',
      justifyItems: 'center',
    },
    card: {
      background: '#232328',
      borderRadius: '18px',
      boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
      padding: '24px 20px',
      width: '280px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      color: '#fff',
      textAlign: 'center',
      position: 'relative',
      transition: 'transform 0.2s',
      cursor: 'default',
    },
    cardHover: {
      transform: 'scale(1.03)',
      boxShadow: '0 8px 30px rgba(0,0,0,0.5)',
      cursor: 'pointer',
    },
    icon: {
      fontSize: '3rem',
      color: '#43e97b',
      marginBottom: '16px',
    },
    name: {
      fontWeight: '700',
      fontSize: '1.25rem',
      marginBottom: '8px',
      textTransform: 'uppercase',
      letterSpacing: '0.5px',
    },
    description: {
      fontSize: '0.95rem',
      color: '#a1a1aa',
      marginBottom: '14px',
      minHeight: '48px',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
    info: {
      fontSize: '1rem',
      marginBottom: '10px',
      color: '#d1d5db',
    },
    actions: {
      display: 'flex',
      gap: '12px',
      marginTop: 'auto',
    },
    btnEdit: {
      display: 'flex',
      alignItems: 'center',
      padding: '8px 18px',
      background: '#2563eb',
      color: '#fff',
      borderRadius: '14px',
      fontWeight: '600',
      textDecoration: 'none',
      border: 'none',
      cursor: 'pointer',
      gap: '8px',
      fontSize: '1rem',
      transition: 'background 0.3s',
    },
    btnEditHover: {
      background: '#1e40af',
    },
    btnDelete: {
      display: 'flex',
      alignItems: 'center',
      padding: '8px 18px',
      background: '#dc2626',
      color: '#fff',
      borderRadius: '14px',
      fontWeight: '600',
      border: 'none',
      cursor: 'pointer',
      gap: '8px',
      fontSize: '1rem',
      transition: 'background 0.3s',
    },
    btnDeleteHover: {
      background: '#991b1b',
    },
  };

  // Para manejar hover en botones y card
  const [hoveredCard, setHoveredCard] = useState(null);
  const [hoveredEdit, setHoveredEdit] = useState(null);
  const [hoveredDelete, setHoveredDelete] = useState(null);

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Productos</h2>
      <Link
        to="/products/new"
        style={{
          ...styles.btnEdit,
          marginBottom: '24px',
          justifyContent: 'center',
          width: '160px',
          fontWeight: '700',
          borderRadius: '24px',
        }}
        onMouseEnter={e => e.currentTarget.style.background = '#1e40af'}
        onMouseLeave={e => e.currentTarget.style.background = '#2563eb'}
      >
        + Nuevo Producto
      </Link>
      <div style={styles.grid}>
        {products.map((p) => (
          <div
            key={p._id}
            style={{
              ...styles.card,
              ...(hoveredCard === p._id ? styles.cardHover : {}),
            }}
            onMouseEnter={() => setHoveredCard(p._id)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <FaBoxOpen style={styles.icon} />
            <div style={styles.name}>{p.name}</div>
            <div style={styles.description}>{p.desciption || 'Sin descripción'}</div>
            <div style={styles.info}>Precio: ${p.price}</div>
            <div style={styles.info}>Stock: {p.stock}</div>
            <div style={styles.actions}>
              <Link
                to={`/products/edit/${p._id}`}
                style={{
                  ...styles.btnEdit,
                  ...(hoveredEdit === p._id ? styles.btnEditHover : {}),
                }}
                onMouseEnter={() => setHoveredEdit(p._id)}
                onMouseLeave={() => setHoveredEdit(null)}
              >
                Editar
              </Link>
              <button
                onClick={() => handleDelete(p._id)}
                style={{
                  ...styles.btnDelete,
                  ...(hoveredDelete === p._id ? styles.btnDeleteHover : {}),
                }}
                onMouseEnter={() => setHoveredDelete(p._id)}
                onMouseLeave={() => setHoveredDelete(null)}
              >
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
