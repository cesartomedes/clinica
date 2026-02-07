// src/pages/dashboard/school/RegisterStudent.jsx
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import useAuth from "../../../hooks/useAuth";

export default function RegisterStudent() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const { user } = useAuth();

  const [schools, setSchools] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [student, setStudent] = useState({
    school_id: "",
    section_name: "",
    grado: "",
    seccion: "",
    matricula_v: "",
    matricula_h: "",
    matricula_total: "",
    nombre: "",
    sexo: "",
    edad: "",
    fecha_nacimiento: "",
    peso: "",
    talla: "",
    circunferencia_braquial: "",
    bucal: "",
    caries: "",
    dif_visual: "",
    vacunado: "",
    dosis: "",
    desparasitado: "",
    observaciones: "",
    docente: "",
    cedula_escolar: "",
    representante_nombre: "",
    representante_cedula: "",
    representante_telefono: "",
    representante_direccion: "",
    representante_parentesco: "",
  });

  // 🔹 Cargar escuelas
  useEffect(() => {
    const fetchSchools = async () => {
      try {
        const token = localStorage.getItem("access_token");
        const res = await axios.get("http://localhost:8000/api/schools", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setSchools(res.data.data || res.data);
      } catch (error) {
        console.error("❌ Error cargando escuelas:", error);
        alert("Error al cargar las escuelas.");
      }
    };
    fetchSchools();
  }, []);

  // 🔹 Cargar datos del estudiante si estamos editando
  useEffect(() => {
    const fetchStudent = async () => {
      if (!isEdit) {
        setLoading(false);
        return;
      }
      try {
        const token = localStorage.getItem("access_token");
        const res = await axios.get(
          `http://localhost:8000/api/students/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const s = res.data.data || res.data;

        setStudent({
          school_id: s.school_id || "",
          section_name: s.section_name || "",
          grado: s.grado || "",
          seccion: s.seccion || "",
          matricula_v: s.matricula_v || "",
          matricula_h: s.matricula_h || "",
          matricula_total: s.matricula_total || "",
          nombre: s.name || "",
          sexo: s.sexo || "",
          edad: s.edad || "",
          fecha_nacimiento: s.fecha_nacimiento || "",
          peso: s.peso || "",
          talla: s.talla || "",
          circunferencia_braquial: s.circunferencia_braquial || "",

          // 🔹 Medical Record
          bucal: s.medical_record?.bucal ? "SI" : "NO",
          caries: s.medical_record?.caries ? "SI" : "NO",
          dif_visual: s.medical_record?.dif_visual ? "SI" : "NO",
          vacunado: s.medical_record?.vacunado ? "SI" : "NO",
          dosis: s.medical_record?.dosis || "",
          desparasitado: s.medical_record?.desparasitado ? "SI" : "NO",
          observaciones: s.medical_record?.observaciones || "",

          docente: s.docente || "",
          cedula_escolar: s.cedula_escolar || "",

          // 🔹 Representative
          representante_nombre: s.representative?.nombre || "",
          representante_cedula: s.representative?.cedula || "",
          representante_telefono: s.representative?.telefono || "",
          representante_direccion: s.representative?.direccion || "",
          representante_parentesco: s.representative?.parentesco || "",
        });
      } catch (error) {
        console.error("❌ Error al cargar estudiante:", error);
        alert("Error al cargar datos del estudiante.");
      } finally {
        setLoading(false);
      }
    };
    fetchStudent();
  }, [isEdit, id]);

  // 🔹 Actualizar campos
  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudent((prev) => ({ ...prev, [name]: value }));
  };

  // 🔹 Calcular matrícula total automáticamente
  useEffect(() => {
    const v = parseInt(student.matricula_v || 0);
    const h = parseInt(student.matricula_h || 0);
    setStudent((prev) => ({ ...prev, matricula_total: v + h }));
  }, [student.matricula_v, student.matricula_h]);

  // 🔹 Validar campos antes de enviar
  const validateForm = () => {
    if (!student.school_id) return "Debe seleccionar una escuela.";
    if (!student.nombre.trim())
      return "Debe ingresar el nombre del estudiante.";
    if (!student.sexo) return "Debe seleccionar el sexo.";
    if (!student.representante_nombre.trim())
      return "Debe ingresar el nombre del representante.";
    return null;
  };

  // 🔹 Enviar formulario (Registrar o Editar)
  const handleSubmit = async (e) => {
    e.preventDefault();

    const errorMsg = validateForm();
    if (errorMsg) {
      alert(errorMsg);
      return;
    }

    setSubmitting(true);

    try {
      const token = localStorage.getItem("access_token");
      if (!token) return alert("Sesión expirada. Inicia sesión nuevamente.");

      const yesNoToBool = (val) => val === "SI";

      const payload = {
        school_id: student.school_id,
        section_name: student.section_name,
        name: student.nombre,
        sexo: student.sexo,
        edad: student.edad || null,
        fecha_nacimiento: student.fecha_nacimiento || null,
        peso: student.peso || null,
        talla: student.talla || null,
        circunferencia_braquial: student.circunferencia_braquial || null,
        medical_record: {
          bucal: yesNoToBool(student.bucal),
          caries: yesNoToBool(student.caries),
          dif_visual: yesNoToBool(student.dif_visual),
          vacunado: yesNoToBool(student.vacunado),
          dosis: student.dosis || null,
          desparasitado: yesNoToBool(student.desparasitado),
          observaciones: student.observaciones || null,
        },

        representative: {
          nombre: student.representante_nombre,
          cedula: student.representante_cedula || null,
          telefono: student.representante_telefono || null,
          direccion: student.representante_direccion || null,
          parentesco: student.representante_parentesco || null,
        },
        grado: student.grado,
        matricula_v: parseInt(student.matricula_v) || 0,
        matricula_h: parseInt(student.matricula_h) || 0,
        matricula_total: parseInt(student.matricula_total) || 0,
        docente: student.docente,
        cedula_escolar: student.cedula_escolar,
        registrado_por: user?.id || null,
      };

      const url = isEdit
        ? `http://localhost:8000/api/students/${id}`
        : "http://localhost:8000/api/students";
      const method = isEdit ? "put" : "post";

      await axios[method](url, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      alert(
        isEdit
          ? "✅ Estudiante actualizado correctamente"
          : "✅ Estudiante registrado correctamente"
      );

      // 🔹 Resetear formulario solo si es nuevo registro
      if (!isEdit) {
        setStudent({
          school_id: "",
          section_name: "",
          grado: "",
          seccion: "",
          matricula_v: "",
          matricula_h: "",
          matricula_total: "",
          nombre: "",
          sexo: "",
          edad: "",
          fecha_nacimiento: "",
          peso: "",
          talla: "",
          circunferencia_braquial: "",
          bucal: "",
          caries: "",
          dif_visual: "",
          vacunado: "",
          dosis: "",
          desparasitado: "",
          observaciones: "",
          docente: "",
          cedula_escolar: "",
          representante_nombre: "",
          representante_cedula: "",
          representante_telefono: "",
          representante_direccion: "",
          representante_parentesco: "",
        });
      }
    } catch (error) {
      console.error(
        "❌ Error al guardar estudiante:",
        error.response?.data || error
      );
      alert("Error al guardar estudiante. Revisa los campos o permisos.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading)
    return (
      <div className="text-center text-gray-600 mt-6">Cargando datos...</div>
    );

  return (
    <div className="bg-white shadow-md rounded-xl p-8 max-w-5xl mx-auto mt-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        {isEdit ? "Editar Estudiante" : "Registro de Estudiantes"}
      </h1>

      <form onSubmit={handleSubmit}>
        {/* 🔹 Escuela y sección */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <select
            name="school_id"
            value={student.school_id}
            onChange={handleChange}
            className="input"
          >
            <option value="">Seleccionar Escuela</option>
            {schools.map((school) => (
              <option key={school.id} value={school.id}>
                {school.name}
              </option>
            ))}
          </select>

          <input
            type="text"
            name="section_name"
            value={student.section_name}
            onChange={handleChange}
            placeholder="Nombre de la Sección (Ej: A, B o C)"
            className="input"
          />
        </div>

        {/* 🔹 Datos generales */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <input
            name="grado"
            value={student.grado}
            onChange={handleChange}
            placeholder="Grado / Año"
            className="input"
          />
          <input
            name="matricula_v"
            value={student.matricula_v}
            onChange={handleChange}
            placeholder="Matrícula V:"
            className="input"
          />
          <input
            name="matricula_h"
            value={student.matricula_h}
            onChange={handleChange}
            placeholder="Matrícula H:"
            className="input"
          />
          <input
            name="matricula_total"
            value={student.matricula_total}
            readOnly
            placeholder="Total"
            className="input bg-gray-100"
          />
        </div>

        {/* 🔹 Datos del estudiante */}
        <h2 className="text-lg font-semibold text-gray-700 mb-2">
          Datos del Estudiante
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <input
            name="nombre"
            value={student.nombre}
            onChange={handleChange}
            placeholder="Nombre y Apellido"
            className="input md:col-span-2"
          />
          <select
            name="sexo"
            value={student.sexo}
            onChange={handleChange}
            className="input"
          >
            <option value="">Sexo</option>
            <option value="M">Masculino</option>
            <option value="F">Femenino</option>
          </select>
          <input
            name="edad"
            value={student.edad}
            onChange={handleChange}
            placeholder="Edad"
            className="input"
          />
          <input
            type="date"
            name="fecha_nacimiento"
            value={student.fecha_nacimiento}
            onChange={handleChange}
            className="input"
          />
          <input
            name="peso"
            value={student.peso}
            onChange={handleChange}
            placeholder="Peso (kg)"
            className="input"
          />
          <input
            name="talla"
            value={student.talla}
            onChange={handleChange}
            placeholder="Talla (cm)"
            className="input"
          />
          <input
            name="circunferencia_braquial"
            value={student.circunferencia_braquial}
            onChange={handleChange}
            placeholder="C. Braquial"
            className="input"
          />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
          <select
            name="bucal"
            value={student.bucal}
            onChange={handleChange}
            className="input"
          >
            <option value="">Caries Bucal</option>
            <option value="SI">Sí</option>
            <option value="NO">No</option>
          </select>
          <select
            name="caries"
            value={student.caries}
            onChange={handleChange}
            className="input"
          >
            <option value="">Caries</option>
            <option value="SI">Sí</option>
            <option value="NO">No</option>
          </select>
          <select
            name="dif_visual"
            value={student.dif_visual}
            onChange={handleChange}
            className="input"
          >
            <option value="">Dif. Visual</option>
            <option value="SI">Sí</option>
            <option value="NO">No</option>
          </select>
          <select
            name="vacunado"
            value={student.vacunado}
            onChange={handleChange}
            className="input"
          >
            <option value="">Vacunado</option>
            <option value="SI">Sí</option>
            <option value="NO">No</option>
          </select>
          <input
            name="dosis"
            value={student.dosis}
            onChange={handleChange}
            placeholder="Dosis"
            className="input"
          />
          <select
            name="desparasitado"
            value={student.desparasitado}
            onChange={handleChange}
            className="input"
          >
            <option value="">Desparasitado</option>
            <option value="SI">Sí</option>
            <option value="NO">No</option>
          </select>
        </div>

        <input
          name="docente"
          value={student.docente}
          onChange={handleChange}
          placeholder="Docente"
          className="input w-full mb-6"
        />

        {/* 🔹 Datos del representante */}
        <h2 className="text-lg font-semibold text-gray-700 mb-2">
          Datos del Representante
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <input
            name="cedula_escolar"
            value={student.cedula_escolar}
            onChange={handleChange}
            placeholder="Cédula Escolar"
            className="input"
          />
          <input
            name="representante_nombre"
            value={student.representante_nombre}
            onChange={handleChange}
            placeholder="Nombre del Representante"
            className="input"
          />
          <input
            name="representante_cedula"
            value={student.representante_cedula}
            onChange={handleChange}
            placeholder="Cédula del Representante"
            className="input"
          />
          <input
            name="representante_telefono"
            value={student.representante_telefono}
            onChange={handleChange}
            placeholder="Teléfono"
            className="input"
          />
          <input
            name="representante_parentesco"
            value={student.representante_parentesco}
            onChange={handleChange}
            placeholder="Parentesco"
            className="input"
          />
        </div>
        <textarea
          name="representante_direccion"
          value={student.representante_direccion}
          onChange={handleChange}
          placeholder="Dirección del Representante"
          className="input w-full mb-6"
          rows={3}
        ></textarea>

        <div className="text-center mt-6">
          <button
            type="submit"
            disabled={submitting}
            className={`px-6 py-2 rounded-lg shadow-md transition text-white ${
              submitting
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {submitting
              ? "Guardando..."
              : isEdit
              ? "Actualizar Estudiante"
              : "Registrar Estudiante"}
          </button>
        </div>
      </form>
    </div>
  );
}
