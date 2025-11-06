import React from 'react'
import React, { useState } from "react";
import "./historial-profesor.css"; // importa los estilos

export const HistorialAcademicProfesor = () => {
  // Datos placeholder (simula BD)
  const [datos, setDatos] = useState(
    Array.from({ length: 35 }, (_, i) => ({
      id: i + 1,
      periodo: `202${Math.floor(i / 6)}-${(i % 2) + 1}`,
      codigo: `CS${(100 + i).toString()}`,
      curso: `Curso ${i + 1}`,
      paralelo: ["A", "B", "C"][i % 3],
      estudiantes: 20 + (i % 25),
      promedio: 70 + (i % 25),
      estado: i % 4 === 0 ? "En curso" : "Cerrado",
    }))
  );

  // Estado de edición por fila
  const [editandoId, setEditandoId] = useState(null);
  const [formFila, setFormFila] = useState(null);

  // Paginación
  const [paginaActual, setPaginaActual] = useState(1);
  const filasPorPagina = 10;
  const indiceInicio = (paginaActual - 1) * filasPorPagina;
  const indiceFin = indiceInicio + filasPorPagina;
  const filasActuales = datos.slice(indiceInicio, indiceFin);
  const totalPaginas = Math.ceil(datos.length / filasPorPagina);

  const cambiarPagina = (nuevaPagina) => {
    if (nuevaPagina >= 1 && nuevaPagina <= totalPaginas) {
      setPaginaActual(nuevaPagina);
    }
  };

  // Acciones de edición
  const empezarEditar = (fila) => {
    setEditandoId(fila.id);
    setFormFila({ ...fila });
  };
  const cancelarEditar = () => {
    setEditandoId(null);
    setFormFila(null);
  };
  const guardarEditar = () => {
    setDatos((prev) => prev.map((f) => (f.id === editandoId ? { ...formFila } : f)));
    setEditandoId(null);
    setFormFila(null);
  };
  const onChangeCampo = (campo, valor) => {
    setFormFila((prev) => ({ ...prev, [campo]: valor }));
  };

  // Crear/eliminar (opcionales)
  const crearNuevaFila = () => {
    const nueva = {
      id: Date.now(),
      periodo: "",
      codigo: "",
      curso: "",
      paralelo: "A",
      estudiantes: 0,
      promedio: 0,
      estado: "En curso",
    };
    setDatos((prev) => [nueva, ...prev]);
    setPaginaActual(1);
    setEditandoId(nueva.id);
    setFormFila(nueva);
  };
  const eliminarFila = (id) => {
    if (!confirm("¿Eliminar este registro?")) return;
    setDatos((prev) => prev.filter((f) => f.id !== id));
    if (indiceInicio >= datos.length - 1 && paginaActual > 1) {
      setPaginaActual(paginaActual - 1);
    }
  };

  return (
    <div className="hp-wrapper">
      <h3 className="hp-title">Historial Académico del Profesor</h3>

      <div className="hp-actions">
        <button className="hp-btn" onClick={crearNuevaFila}>+ Nuevo registro</button>
      </div>

      <table className="hp-table">
        <thead>
          <tr>
            <th>Periodo</th>
            <th>Código</th>
            <th>Curso</th>
            <th>Paralelo</th>
            <th>Estudiantes</th>
            <th>Promedio</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>
          {filasActuales.map((fila) => {
            const esEdit = editandoId === fila.id;
            return (
              <tr key={fila.id}>
                <td>
                  {esEdit ? (
                    <input
                      className="hp-input"
                      value={formFila.periodo}
                      onChange={(e) => onChangeCampo("periodo", e.target.value)}
                      placeholder="2025-1"
                    />
                  ) : (
                    fila.periodo
                  )}
                </td>

                <td>
                  {esEdit ? (
                    <input
                      className="hp-input"
                      value={formFila.codigo}
                      onChange={(e) => onChangeCampo("codigo", e.target.value)}
                      placeholder="CS101"
                    />
                  ) : (
                    fila.codigo
                  )}
                </td>

                <td>
                  {esEdit ? (
                    <input
                      className="hp-input"
                      value={formFila.curso}
                      onChange={(e) => onChangeCampo("curso", e.target.value)}
                      placeholder="Nombre del curso"
                    />
                  ) : (
                    fila.curso
                  )}
                </td>

                <td>
                  {esEdit ? (
                    <select
                      className="hp-select"
                      value={formFila.paralelo}
                      onChange={(e) => onChangeCampo("paralelo", e.target.value)}
                    >
                      <option>A</option><option>B</option><option>C</option><option>D</option>
                    </select>
                  ) : (
                    fila.paralelo
                  )}
                </td>

                <td>
                  {esEdit ? (
                    <input
                      className="hp-input"
                      type="number"
                      value={formFila.estudiantes}
                      onChange={(e) => onChangeCampo("estudiantes", Number(e.target.value))}
                      min={0}
                    />
                  ) : (
                    fila.estudiantes
                  )}
                </td>

                <td>
                  {esEdit ? (
                    <input
                      className="hp-input"
                      type="number"
                      step="0.01"
                      value={formFila.promedio}
                      onChange={(e) => onChangeCampo("promedio", Number(e.target.value))}
                      min={0}
                      max={100}
                    />
                  ) : (
                    fila.promedio
                  )}
                </td>

                <td>
                  {esEdit ? (
                    <select
                      className="hp-select"
                      value={formFila.estado}
                      onChange={(e) => onChangeCampo("estado", e.target.value)}
                    >
                      <option>En curso</option>
                      <option>Cerrado</option>
                    </select>
                  ) : (
                    fila.estado
                  )}
                </td>

                <td className="hp-actions-row">
                  {!esEdit ? (
                    <>
                      <button className="hp-btn hp-btn--small" onClick={() => empezarEditar(fila)}>Editar</button>
                      <button className="hp-btn hp-btn--small hp-btn--danger" onClick={() => eliminarFila(fila.id)}>Eliminar</button>
                    </>
                  ) : (
                    <>
                      <button className="hp-btn hp-btn--small hp-btn--primary" onClick={guardarEditar}>Guardar</button>
                      <button className="hp-btn hp-btn--small" onClick={cancelarEditar}>Cancelar</button>
                    </>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <div className="hp-pager">
        <button className="hp-btn" onClick={() => cambiarPagina(paginaActual - 1)} disabled={paginaActual === 1}>
          &lt;
        </button>
        <span className="hp-page-indicator">
          Página {paginaActual} de {totalPaginas}
        </span>
        <button className="hp-btn" onClick={() => cambiarPagina(paginaActual + 1)} disabled={paginaActual === totalPaginas}>
          &gt;
        </button>
      </div>
    </div>
  );
};
