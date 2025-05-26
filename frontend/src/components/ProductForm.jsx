import React, { useState, useEffect } from 'react';
import { createProduct, getProduct, updateProduct } from '../services/ProductService';
import { useNavigate, useParams } from 'react-router-dom';

const styles = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
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
    maxWidth: '480px',
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
  button: {
    marginTop: '16px',
    background: 'linear-gradient(90deg, #43e97b 0%, #38f9d7 100%)',
    color: '#fff',
    fontWeight: '700',
    border: 'none',
    borderRadius: '24px',
    padding: '14px 0',
    fontSize: '1.1rem',
    cursor: 'pointer',
    transition: 'background 0.2s',
    boxShadow: '0 2px 8px rgba(67,233,123,0.10)',
  },
  buttonHover: {
    background: 'linear-gradient(90deg, #11998e 0%, #38ef7d 100%)',
  },
};

export default function ProductForm() {
  const [product, setProduct] = useState({
    name: '', desciption: '', price: '', stock: ''
  });
  const navigate = useNavigate();
  const { id } = useParams();
  const [btnHover, setBtnHover] = useState(false);

  useEffect(() => {
    if (id) getProduct(id).then(res => setProduct(res.data));
  }, [id]);

  const handleChange = e => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (id) await updateProduct(id, product);
    else await createProduct(product);
    navigate('/products');
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2 style={styles.title}>{id ? 'Editar Producto' : 'Nuevo Producto'}</h2>
        <input name="name" value={product.name} onChange={handleChange} placeholder="Nombre" required style={styles.input} />
        <input name="desciption" value={product.desciption} onChange={handleChange} placeholder="Descripción" style={styles.input} />
        <input name="price" type="number" min="0" value={product.price} onChange={handleChange} placeholder="Precio" required style={styles.input} />
        <input name="stock" type="number" min="0" value={product.stock} onChange={handleChange} placeholder="Stock" required style={styles.input} />
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
