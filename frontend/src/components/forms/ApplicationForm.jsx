import React, { useState } from 'react';
import axios from 'axios';

const ApplicationForm = ({ token, onCreated }) => {
  const [formData, setFormData] = useState({
    vaccine_id: '',
    student_id: '',
    fecha_aplicacion: '',
    dosis: '',
    observaciones: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/applications', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      alert('Aplicación registrada correctamente');
      onCreated?.(res.data);
      setFormData({
        vaccine_id: '',
        student_id: '',
        fecha_aplicacion: '',
        dosis: '',
        observaciones: ''
      });
    } catch (err) {
      console.error(err);
      alert('Error al registrar aplicación');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Registrar Aplicación de Vacuna</h3>
      <input type="number" name="vaccine_id" placeholder="ID de la vacuna" value={formData.vaccine_id} onChange={handleChange} required />
      <input type="number" name="student_id" placeholder="ID del estudiante" value={formData.student_id} onChange={handleChange} required />
      <input type="date" name="fecha_aplicacion" value={formData.fecha_aplicacion} onChange={handleChange} required />
      <input type="text" name="dosis" placeholder="Dosis (ej: 1ra, 2da, refuerzo)" value={formData.dosis} onChange={handleChange} />
      <textarea name="observaciones" placeholder="Observaciones" value={formData.observaciones} onChange={handleChange}></textarea>
      <button type="submit">Guardar Aplicación</button>
    </form>
  );
};

export default ApplicationForm;
