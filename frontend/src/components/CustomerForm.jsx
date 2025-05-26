import React, { useState, useEffect } from 'react';
import { createCustomer, getCustomer, updateCustomer } from '../services/CustomerService';
import { useNavigate, useParams } from 'react-router-dom';

const styles = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg,rgba(79, 212, 101, 0.74) 0%,rgb(207, 252, 224) 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '40px 20px',
  },
  form: {
    background: '#fff',
    borderRadius: '32px',
    boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
    padding: '40px 36px 32px 36px',
    maxWidth: '560px',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  title: {
    fontSize: '2rem',
    fontWeight: '700',
    marginBottom: '24px',
    color: '#222',
    textAlign: 'center',
  },
  input: {
    background: '#f3f3f3',
    border: 'none',
    borderRadius: '24px',
    padding: '14px 20px',
    fontSize: '1rem',
    marginBottom: '18px',
    outline: 'none',
    color: '#222',
  },
  labelCheckbox: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '18px',
    fontWeight: '600',
    color: '#222',
    gap: '8px',
    cursor: 'pointer',
  },
  button: {
    marginTop: '16px',
    background: 'linear-gradient(90deg,rgb(95, 255, 180) 0%,rgb(36, 196, 142) 100%)',
    color: '#fff',
    fontWeight: '700',
    border: 'none',
    borderRadius: '24px',
    padding: '14px 0',
    fontSize: '1.1rem',
    cursor: 'pointer',
    transition: 'background 0.2s',
    boxShadow: '0 2px 8px rgba(255,95,109,0.10)',
  },
  buttonHover: {
    background: 'linear-gradient(90deg,rgb(84, 219, 179) 0%,rgb(118, 223, 200) 100%)',
  },
};

export default function CustomerForm() {
  const [customer, setCustomer] = useState({
    name: '', lastName: '', birthday: '', email: '', password: '',
    telephone: '', dui: '', isVerified: false
  });
  const navigate = useNavigate();
  const { id } = useParams();
  const [btnHover, setBtnHover] = useState(false);

  useEffect(() => {
    if (id) getCustomer(id).then(res => setCustomer(res.data));
  }, [id]);

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setCustomer({ ...customer, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (id) await updateCustomer(id, customer);
    else await createCustomer(customer);
    navigate('/customers');
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2 style={styles.title}>{id ? 'Editar Cliente' : 'Nuevo Cliente'}</h2>
        <input
          name="name"
          value={customer.name}
          onChange={handleChange}
          placeholder="Nombre"
          required
          style={styles.input}
        />
        <input
          name="lastName"
          value={customer.lastName}
          onChange={handleChange}
          placeholder="Apellido"
          style={styles.input}
        />
        <input
          name="birthday"
          type="date"
          value={customer.birthday ? customer.birthday.slice(0, 10) : ''}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <input
          name="email"
          value={customer.email}
          onChange={handleChange}
          placeholder="Email"
          style={styles.input}
        />
        <input
          name="password"
          type="password"
          value={customer.password}
          onChange={handleChange}
          placeholder="Contraseña"
          required
          style={styles.input}
        />
        <input
          name="telephone"
          value={customer.telephone}
          onChange={handleChange}
          placeholder="Teléfono"
          required
          style={styles.input}
        />
        <input
          name="dui"
          value={customer.dui}
          onChange={handleChange}
          placeholder="DUI"
          required
          style={styles.input}
        />
        <label style={styles.labelCheckbox}>
          <input
            type="checkbox"
            name="isVerified"
            checked={customer.isVerified}
            onChange={handleChange}
          />
          Verificado
        </label>
        <button
          type="submit"
          style={btnHover ? { ...styles.button, ...styles.buttonHover } : styles.button}
          onMouseEnter={() => setBtnHover(true)}
          onMouseLeave={() => setBtnHover(false)}
        >
          Guardar
        </button>
      </form>
    </div>
  );
}
