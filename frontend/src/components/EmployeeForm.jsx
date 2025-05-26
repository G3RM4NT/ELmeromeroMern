import React, { useState, useEffect } from 'react';
import { createEmployee, getEmployee, updateEmployee } from '../services/EmployeeService.jsx';
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

export default function EmployeeForm() {
  const [employee, setEmployee] = useState({
    name: '', lastName: '', birthday: '', email: '', address: '', password: '',
    hireDate: '', telephone: '', dui: '', isVerified: false, issnumber: ''
  });
  const navigate = useNavigate();
  const { id } = useParams();
  const [btnHover, setBtnHover] = useState(false);

  useEffect(() => {
    if (id) getEmployee(id).then(res => setEmployee(res.data));
  }, [id]);

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setEmployee({ ...employee, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (id) await updateEmployee(id, employee);
    else await createEmployee(employee);
    navigate('/employees');
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2 style={styles.title}>{id ? 'Editar Empleado' : 'Nuevo Empleado'}</h2>
        <input name="name" value={employee.name} onChange={handleChange} placeholder="Nombre" required style={styles.input} />
        <input name="lastName" value={employee.lastName} onChange={handleChange} placeholder="Apellido" style={styles.input} />
        <input name="birthday" type="date" value={employee.birthday ? employee.birthday.slice(0,10) : ''} onChange={handleChange} required style={styles.input} />
        <input name="email" value={employee.email} onChange={handleChange} placeholder="Email" style={styles.input} />
        <input name="address" value={employee.address} onChange={handleChange} placeholder="Dirección" style={styles.input} />
        <input name="password" type="password" value={employee.password} onChange={handleChange} placeholder="Contraseña" required style={styles.input} />
        <input name="hireDate" value={employee.hireDate} onChange={handleChange} placeholder="Fecha de Contratación" style={styles.input} />
        <input name="telephone" value={employee.telephone} onChange={handleChange} placeholder="Teléfono" required style={styles.input} />
        <input name="dui" value={employee.dui} onChange={handleChange} placeholder="DUI" required style={styles.input} />
        <label style={styles.labelCheckbox}>
          <input type="checkbox" name="isVerified" checked={employee.isVerified} onChange={handleChange} />
          Verificado
        </label>
        <input name="issnumber" value={employee.issnumber} onChange={handleChange} placeholder="ISS" required style={styles.input} />
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
