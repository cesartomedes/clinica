import React, { useState } from 'react';
import axios from 'axios';

const MedicalRecordForm = ({ token, onCreated }) => {
  const [formData, setFormData] = useState({
    alergias: '',
    enfermedades_previas: '',
    medicamentos: '',
    observaciones: '',
    student_id: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/medical-records', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      alert('Historial médico guardado correctamente');
      onCreated?.(res.data);
      setFormData({
        alergias: '',
        enfermedades_previas: '',
        medicamentos: '',
        observaciones: '',
        student_id: ''
      });
    } catch (err) {
      console.error(err);
      alert('Error al registrar historial médico');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Historial Médico</h3>
      <textarea name="alergias" placeholder="Alergias conocidas" value={formData.alergias} onChange={handleChange}></textarea>
      <textarea name="enfermedades_previas" placeholder="Enfermedades previas" value={formData.enfermedades_previas} onChange={handleChange}></textarea>
      <textarea name="medicamentos" placeholder="Medicamentos actuales" value={formData.medicamentos} onChange={handleChange}></textarea>
      <textarea name="observaciones" placeholder="Observaciones adicionales" value={formData.observaciones} onChange={handleChange}></textarea>
      <input type="number" name="student_id" placeholder="ID del Estudiante" value={formData.student_id} onChange={handleChange} required />
      <button type="submit">Guardar Historial</button>
    </form>
  );
};

export default MedicalRecordForm;
