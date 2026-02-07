import { useState, useEffect } from "react";
import RegisterSchool from "./school/RegisterSchool";
import SchoolList from "./school/SchoolList";
import axios from "axios";

export default function SuperAdminDashboard() {
  const [schools, setSchools] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const fetchSchools = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:8000/api/schools");
      setSchools(response.data);
    } catch (error) {
      console.error(error);
      setMessage("❌ No se pudieron cargar las escuelas.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSchools();
  }, []);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-4">
        Panel SuperAdmin
      </h1>

      <section>
        <RegisterSchool onRegistered={fetchSchools} />
      </section>

      <section>
        <SchoolList
          schools={schools}
          setSchools={setSchools}
          loading={loading}
          setMessage={setMessage}
          message={message}
        />
      </section>
    </div>
  );
}
