import React, { useEffect, useState } from 'react';
import { getCustomers, deleteCustomer } from '../services/CustomerService.jsx';
import { Link } from 'react-router-dom';
import { FaUserCircle, FaEdit, FaTrash } from 'react-icons/fa';

const styles = {
  container: {
    padding: '24px',
    backgroundColor: '#18181b',
    minHeight: '100vh',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  title: {
    color: '#fff',
    fontSize: '2rem',
    fontWeight: '700',
    marginBottom: '24px',
  },
  newButton: {
    display: 'inline-block',
    marginBottom: '24px',
    padding: '12px 24px',
    backgroundColor: '#16a34a', // verde
    color: 'white',
    borderRadius: '12px',
    textDecoration: 'none',
    fontWeight: '600',
    transition: 'background-color 0.3s ease',
  },
  newButtonHover: {
    backgroundColor: '#15803d',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '24px',
  },
  card: {
    backgroundColor: '#27272a',
    borderRadius: '16px',
    padding: '24px',
    color: 'white',
    boxShadow: '0 8px 16px rgba(0,0,0,0.3)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    position: 'relative',
  },
  iconUser: {
    fontSize: '4rem',
    color: '#22c55e', // verde claro
    marginBottom: '12px',
  },
  name: {
    fontSize: '1.25rem',
    fontWeight: '700',
    marginBottom: '6px',
  },
  email: {
    fontSize: '0.9rem',
    color: '#a1a1aa',
    marginBottom: '12px',
  },
  infoText: {
    marginBottom: '8px',
    fontSize: '0.9rem',
  },
  labelBold: {
    fontWeight: '600',
  },
  verifiedYes: {
    color: '#22c55e',
    fontWeight: '600',
  },
  verifiedNo: {
    color: '#ef4444',
    fontWeight: '600',
  },
  actions: {
    display: 'flex',
    gap: '12px',
    marginTop: 'auto',
  },
  buttonEdit: {
    display: 'flex',
    alignItems: 'center',
    padding: '8px 16px',
    backgroundColor: '#2563eb', // azul
    borderRadius: '8px',
    color: 'white',
    fontWeight: '600',
    textDecoration: 'none',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  buttonEditHover: {
    backgroundColor: '#1d4ed8',
  },
  buttonDelete: {
    display: 'flex',
    alignItems: 'center',
    padding: '8px 16px',
    backgroundColor: '#dc2626', // rojo
    borderRadius: '8px',
    color: 'white',
    fontWeight: '600',
    border: 'none',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  buttonDeleteHover: {
    backgroundColor: '#b91c1c',
  },
  iconMargin: {
    marginRight: '8px',
  },
};

export default function CustomerList() {
  const [customers, setCustomers] = useState([]);
  const [hoverNew, setHoverNew] = useState(false);
  const [hoverEdit, setHoverEdit] = useState(null); // id del card hover
  const [hoverDelete, setHoverDelete] = useState(null);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const res = await getCustomers();
      setCustomers(res.data);
    } catch (error) {
      console.error('Error al obtener clientes:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Eliminar cliente?')) {
      try {
        await deleteCustomer(id);
        fetchCustomers();
      } catch (error) {
        console.error('Error al eliminar cliente:', error);
      }
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Clientes</h2>
      <Link
        to="/customers/new"
        style={hoverNew ? { ...styles.newButton, ...styles.newButtonHover } : styles.newButton}
        onMouseEnter={() => setHoverNew(true)}
        onMouseLeave={() => setHoverNew(false)}
      >
        + Nuevo Cliente
      </Link>
      <div style={styles.grid}>
        {customers.map((c) => (
          <div key={c._id} style={styles.card}>
            <FaUserCircle style={styles.iconUser} />
            <div style={styles.name}>
              {c.name} {c.lastName}
            </div>
            <div style={styles.email}>{c.email}</div>
            <div style={styles.infoText}>
              <span style={styles.labelBold}>Fecha Nac.: </span>
              {c.birthday ? c.birthday.slice(0, 10) : ''}
            </div>
            <div style={styles.infoText}>
              <span style={styles.labelBold}>Teléfono: </span>
              {c.telephone}
            </div>
            <div style={styles.infoText}>
              <span style={styles.labelBold}>DUI: </span>
              {c.dui}
            </div>
            <div style={styles.infoText}>
              <span style={styles.labelBold}>Verificado: </span>
              <span style={c.isVerified ? styles.verifiedYes : styles.verifiedNo}>
                {c.isVerified ? 'Sí' : 'No'}
              </span>
            </div>
            <div style={styles.actions}>
              <Link
                to={`/customers/edit/${c._id}`}
                style={
                  hoverEdit === c._id
                    ? { ...styles.buttonEdit, ...styles.buttonEditHover }
                    : styles.buttonEdit
                }
                onMouseEnter={() => setHoverEdit(c._id)}
                onMouseLeave={() => setHoverEdit(null)}
                title="Editar"
              >
                <FaEdit style={styles.iconMargin} /> Editar
              </Link>
              <button
                onClick={() => handleDelete(c._id)}
                style={
                  hoverDelete === c._id
                    ? { ...styles.buttonDelete, ...styles.buttonDeleteHover }
                    : styles.buttonDelete
                }
                onMouseEnter={() => setHoverDelete(c._id)}
                onMouseLeave={() => setHoverDelete(null)}
                title="Eliminar"
              >
                <FaTrash style={styles.iconMargin} /> Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
