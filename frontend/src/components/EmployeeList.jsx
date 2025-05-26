import React, { useEffect, useState } from 'react';
import { getEmployees, deleteEmployee } from '../services/EmployeeService.jsx';
import { Link } from 'react-router-dom';
import { FaUserTie, FaEdit, FaTrash } from 'react-icons/fa';

export default function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  useEffect(() => { fetchEmployees(); }, []);
  const fetchEmployees = async () => {
    const res = await getEmployees();
    setEmployees(res.data);
  };
  const handleDelete = async (id) => {
    if (window.confirm('¿Eliminar empleado?')) {
      await deleteEmployee(id);
      fetchEmployees();
    }
  };

  return (
    <div style={{ background: '#18181b', minHeight: '100vh', padding: '0 0 32px 0' }}>
      <h2 style={{
        color: '#fff',
        fontWeight: 700,
        fontSize: '2rem',
        margin: '0 0 18px 32px'
      }}>Empleados</h2>
      <Link
        to="/employees/new"
        style={{
          display: 'inline-block',
          margin: '0 0 24px 32px',
          padding: '10px 24px',
          background: '#22c55e',
          color: '#fff',
          borderRadius: '10px',
          fontWeight: 700,
          fontSize: '1rem',
          border: 'none',
          textDecoration: 'none',
          boxShadow: '0 2px 8px rgba(34,197,94,0.10)',
          transition: 'background 0.2s'
        }}
      >+ Nuevo Empleado</Link>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(420px, 1fr))',
        gap: '32px',
        padding: '0 24px',
        justifyItems: 'center',
      }}>
        {employees.map(e => (
          <div
            key={e._id}
            style={{
              background: '#232328',
              borderRadius: '18px',
              boxShadow: '0 2px 12px rgba(0,0,0,0.18)',
              padding: '22px 16px 16px 16px',
              width: '420px',
              minHeight: '320px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              position: 'relative',
            }}
          >
            <FaUserTie style={{ fontSize: '2.8rem', color: '#22c55e', marginBottom: '8px' }} />
            <div style={{ fontWeight: 700, fontSize: '1.08rem', marginBottom: '3px', color: '#fff', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              {e.name} {e.lastName}
            </div>
            <div style={{ color: '#a1a1aa', fontSize: '0.94rem', marginBottom: '10px', wordBreak: 'break-all' }}>
              {e.email}
            </div>
            <div style={{ fontSize: '0.93rem', marginBottom: '6px', color: '#d1d5db' }}>
              <b>Fecha Nac.:</b> {e.birthday ? e.birthday.slice(0,10) : ''}
            </div>
            <div style={{ fontSize: '0.93rem', marginBottom: '6px', color: '#d1d5db' }}>
              <b>Dirección:</b> {e.address}
            </div>
            <div style={{ fontSize: '0.93rem', marginBottom: '6px', color: '#d1d5db' }}>
              <b>Fecha Contratación:</b> {e.hireDate}
            </div>
            <div style={{ fontSize: '0.93rem', marginBottom: '6px', color: '#d1d5db' }}>
              <b>Teléfono:</b> {e.telephone}
            </div>
            <div style={{ fontSize: '0.93rem', marginBottom: '6px', color: '#d1d5db' }}>
              <b>DUI:</b> {e.dui}
            </div>
            <div style={e.isVerified
              ? { fontWeight: 600, color: '#22c55e', marginBottom: '6px' }
              : { fontWeight: 600, color: '#ef4444', marginBottom: '6px' }
            }>
              Verificado: {e.isVerified ? 'Sí' : 'No'}
            </div>
            <div style={{ fontSize: '0.93rem', marginBottom: '6px', color: '#d1d5db' }}>
              <b>ISS:</b> {e.issnumber}
            </div>
            <div style={{
              display: 'flex',
              gap: '8px',
              marginTop: '12px',
              justifyContent: 'center',
            }}>
              <Link to={`/employees/edit/${e._id}`}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '7px 14px',
                  background: '#2563eb',
                  color: '#fff',
                  borderRadius: '8px',
                  fontWeight: 600,
                  textDecoration: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '0.98rem',
                  gap: '6px',
                  transition: 'background 0.2s',
                }}>
                <FaEdit style={{ marginRight: 4 }} /> Editar
              </Link>
              <button onClick={() => handleDelete(e._id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '7px 14px',
                  background: '#dc2626',
                  color: '#fff',
                  borderRadius: '8px',
                  fontWeight: 600,
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '0.98rem',
                  gap: '6px',
                  transition: 'background 0.2s',
                }}>
                <FaTrash style={{ marginRight: 4 }} /> Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
