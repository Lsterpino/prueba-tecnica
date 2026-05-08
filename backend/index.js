import express from "express";
import cors from "cors";
import db from "./db.js";
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());

function normalizarTexto(texto = "") {
  const palabrasIgnoradas = [
    "bar",
    "pub",
    "evento",
    "de",
    "del",
    "la",
    "el",
    "tucuman",
    "tuc",
  ];

  return texto
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\w\s]/g, "")
    .split(" ")
    .map((p) => p.trim())
    .filter((p) => p && !palabrasIgnoradas.includes(p))
    .join(" ");
}

app.get("/lugares", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM lugares WHERE activo = 'A'");
    res.json(rows);
  } catch (error) {
    console.error("Detalle del error:", error.message);
    res.status(500).send("Error interno del servidor");
  }
});

app.post("/lugares", async (req, res) => {
  try {
    const { nombre, tipo, categoria, ubicacion, fecha_evento, fuente } =
      req.body;

    const nombreNormalizado = normalizarTexto(nombre);
    const ubicacionNormalizada = normalizarTexto(ubicacion);

    const [rows] = await db.query(
      "SELECT * FROM lugares WHERE nombre_normalizado = ? AND ubicacion_normalizada = ? AND activo = 'A'",
      [nombreNormalizado, ubicacionNormalizada],
    );

    if (rows.length > 0) {
      return res.status(400).json({ mensaje: "Lugar duplicado" });
    }

    const sql = `
      INSERT INTO lugares 
      (nombre, nombre_normalizado, tipo, categoria, ubicacion, ubicacion_normalizada,fecha_evento, fuente, activo) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'A')
    `;

    const [result] = await db.query(sql, [
      nombre,
      nombreNormalizado,
      tipo,
      categoria,
      ubicacion,
      ubicacionNormalizada,
      fecha_evento || null,
      fuente,
    ]);

    res.status(201).json({
      mensaje: "Lugar creado",
      id: result.insertId,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error");
  }
});

app.put("/lugares/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, tipo, categoria, ubicacion, fecha_evento } = req.body;

    const nombreNormalizado = normalizarTexto(nombre);
    const ubicacionNormalizada = normalizarTexto(ubicacion);

    const sql = `
      UPDATE lugares 
      SET nombre = ?, nombre_normalizado = ?, tipo = ?, categoria = ?, ubicacion = ?, ubicacion_normalizada = ?, fecha_evento = ?
      WHERE id = ? AND activo = 'A'
    `;

    const [result] = await db.query(sql, [
      nombre,
      nombreNormalizado,
      tipo,
      categoria,
      ubicacion,
      ubicacionNormalizada,
      fecha_evento || null,
      id,
    ]);

    res.json({ mensaje: "Lugar actualizado" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

app.delete("/lugares/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const [result] = await db.query(
      "UPDATE lugares SET activo = 'B' WHERE id = ?",
      [id],
    );

    res.json({ mensaje: "Lugar dado de baja" });
  } catch (error) {
    res.status(500).send("Error");
  }
});

app.get("/lugares/candidatos", async (req, res) => {
  try {
    const { nombre } = req.query;

    if (!nombre) {
      return res.status(400).json({
        mensaje: "El nombre es obligatorios",
      });
    }

    const nombreNormalizado = normalizarTexto(nombre);

    const [rows] = await db.query(
      `
  SELECT *
  FROM lugares
  WHERE activo = 'A'
  AND (nombre_normalizado LIKE ? OR ? LIKE CONCAT('%', nombre_normalizado, '%'))
  LIMIT 10
  `,
      [`%${nombreNormalizado}%`, nombreNormalizado],
    );

    res.json(rows);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      mensaje: "Error obteniendo candidatos",
    });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
