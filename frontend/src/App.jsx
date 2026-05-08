import { useState, useEffect } from "react";
import "./App.css";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/lugares";

function App() {
  const [lugares, setLugares] = useState([]);
  const [editando, setEditando] = useState(null);

  const [formData, setFormData] = useState({
    nombre: "",
    tipo: "B",
    categoria: "",
    ubicacion: "",
    fecha_evento: "",
    fuente: "manual",
  });

  const fetchLugares = async () => {
    const res = await fetch(API_URL);
    const data = await res.json();
    setLugares(data);
  };

  useEffect(() => {
    fetchLugares();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const method = editando ? "PUT" : "POST";
    const url = editando ? `${API_URL}/${editando}` : API_URL;

    const res = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      setEditando(null);

      setFormData({
        nombre: "",
        tipo: "B",
        categoria: "",
        ubicacion: "",
        fecha_evento: "",
        fuente: "manual",
      });

      fetchLugares();
    }
  };

  const eliminarLugar = async (id) => {
    if (window.confirm("¿Eliminar lugar?")) {
      await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });

      fetchLugares();
    }
  };

  return (
    <div className="container">
      <h1>Gestión de Lugares</h1>

      <form className="form-card" onSubmit={handleSubmit}>
        <h2>{editando ? "Editar Lugar" : "Agregar Lugar"}</h2>

        <div className="grid">
          <input
            type="text"
            placeholder="Nombre"
            required
            value={formData.nombre}
            onChange={(e) =>
              setFormData({
                ...formData,
                nombre: e.target.value,
              })
            }
          />

          <select
            value={formData.tipo}
            onChange={(e) =>
              setFormData({
                ...formData,
                tipo: e.target.value,
              })
            }
          >
            <option value="B">Bar</option>
            <option value="E">Evento</option>
          </select>

          <input
            type="text"
            placeholder="Categoría"
            value={formData.categoria}
            onChange={(e) =>
              setFormData({
                ...formData,
                categoria: e.target.value,
              })
            }
          />

          <input
            type="text"
            placeholder="Ubicación"
            required
            value={formData.ubicacion}
            onChange={(e) =>
              setFormData({
                ...formData,
                ubicacion: e.target.value,
              })
            }
          />

          {formData.tipo === "E" && (
            <input
              type="datetime-local"
              value={formData.fecha_evento}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  fecha_evento: e.target.value,
                })
              }
            />
          )}
        </div>

        <div className="buttons">
          <button type="submit" className="btn-primary">
            {editando ? "Actualizar" : "Guardar"}
          </button>

          {editando && (
            <button
              type="button"
              className="btn-secondary"
              onClick={() => setEditando(null)}
            >
              Cancelar
            </button>
          )}
        </div>
      </form>

      <div className="table-card">
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Tipo</th>
              <th>Categoría</th>
              <th>Ubicación</th>
              <th>Fuente</th>
              <th>Acciones</th>
            </tr>
          </thead>

          <tbody>
            {lugares.map((l) => (
              <tr key={l.id}>
                <td>{l.nombre}</td>

                <td>{l.tipo === "B" ? "Bar" : "Evento"}</td>

                <td>{l.categoria}</td>

                <td>{l.ubicacion}</td>

                <td>
                  <span className="badge">{l.fuente}</span>
                </td>

                <td>
                  <button
                    className="edit-btn"
                    onClick={() => {
                      setEditando(l.id);
                      setFormData(l);
                    }}
                  >
                    Editar
                  </button>

                  <button
                    className="delete-btn"
                    onClick={() => eliminarLugar(l.id)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
