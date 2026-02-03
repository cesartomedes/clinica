import React, { useState } from 'react';
import axios from 'axios';

const RepresentativeForm = ({ token, onCreated }) => {
  const [formData, setFormData] = useState({
    name: '',
    cedula: '',
    telefono: '',
    direccion: '',
    parentesco: '',
    student_id: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/representatives', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      alert('Representante registrado correctamente');
      onCreated?.(res.data);
      setFormData({
        name: '',
        cedula: '',
        telefono: '',
        direccion: '',
        parentesco: '',
        student_id: ''
      });
    } catch (err) {
      console.error(err);
      alert('Error al registrar representante');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Registrar Representante</h3>
      <input type="text" name="name" placeholder="Nombre completo" value={formData.name} onChange={handleChange} required />
      <input type="text" name="cedula" placeholder="Cédula" value={formData.cedula} onChange={handleChange} required />
      <input type="text" name="telefono" placeholder="Teléfono" value={formData.telefono} onChange={handleChange} />
      <input type="text" name="direccion" placeholder="Dirección" value={formData.direccion} onChange={handleChange} />
      <input type="text" name="parentesco" placeholder="Parentesco con el alumno" value={formData.parentesco} onChange={handleChange} />
      <input type="number" name="student_id" placeholder="ID del Estudiante" value={formData.student_id} onChange={handleChange} required />
      <button type="submit">Guardar Representante</button>
    </form>
  );
};

export default RepresentativeForm;
