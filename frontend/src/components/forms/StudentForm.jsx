import React, { useState } from 'react';
import axios from 'axios';

const StudentForm = ({ token, onCreated }) => {
  const [formData, setFormData] = useState({
    name: '',
    sexo: '',
    edad: '',
    fecha_nacimiento: '',
    peso: '',
    talla: '',
    circunferencia_braquial: '',
    section_id: '',
    school_id: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        '/api/students',
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      alert('Estudiante registrado correctamente');
      onCreated(response.data); // opcional para actualizar lista de estudiantes
      setFormData({
        name: '',
        sexo: '',
        edad: '',
        fecha_nacimiento: '',
        peso: '',
        talla: '',
        circunferencia_braquial: '',
        section_id: '',
        school_id: '',
      });
    } catch (error) {
      console.error(error);
      alert('Error al registrar estudiante');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        placeholder="Nombre completo"
        value={formData.name}
        onChange={handleChange}
        required
      />
      <select name="sexo" value={formData.sexo} onChange={handleChange} required>
        <option value="">Selecciona sexo</option>
        <option value="M">Masculino</option>
        <option value="F">Femenino</option>
      </select>
      <input
        type="number"
        name="edad"
        placeholder="Edad"
        value={formData.edad}
        onChange={handleChange}
        required
      />
      <input
        type="date"
        name="fecha_nacimiento"
        value={formData.fecha_nacimiento}
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="peso"
        placeholder="Peso (kg)"
        value={formData.peso}
        onChange={handleChange}
      />
      <input
        type="number"
        name="talla"
        placeholder="Talla (cm)"
        value={formData.talla}
        onChange={handleChange}
      />
      <input
        type="number"
        name="circunferencia_braquial"
        placeholder="C.B. (cm)"
        value={formData.circunferencia_braquial}
        onChange={handleChange}
      />
      <input
        type="number"
        name="section_id"
        placeholder="ID Sección"
        value={formData.section_id}
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="school_id"
        placeholder="ID Escuela"
        value={formData.school_id}
        onChange={handleChange}
        required
      />
      <button type="submit">Registrar Estudiante</button>
    </form>
  );
};

export default StudentForm;
