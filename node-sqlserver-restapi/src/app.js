import express from 'express';
import { json } from 'express';
import sql from 'mssql';

const app = express();
const PORT = process.env.PORT || 666;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`+` el numero de la bestia`);
});

app.get('/', (req, res) => {
  res.send('Servidor de la bestia funcionando');
});

//middleware
app.use(json());

// Configuracion conexion a BD
const config = {
  user: 'sa', //Usuario de SQL
  password: 'Toro2800', //Contraseña de usuario SQL
  server: 'MSI\\SQLEXPRESS', //servidor donde esta el SQL Server
  database: 'node_restapi_practica', //base de datos a usar
  options: {
    // Por default, SQL siempre corre en el 1433
    port: 1433, 
    encrypt: false, //Si le ponen true deberan agregar los certificados
  },
};

// Conectar a la BD
sql.connect(config, (err) => {
  if (err) {
    console.error('No jaló la conexion xD', err);
  } else {
    console.log('Conexion a BD exitosa');
  }
});

// GET para obtener todas las películas
app.get('/api/Peliculas', async (req, res) => {
  try {
    const result = await sql.query`SELECT * FROM Peliculas`;
    res.json(result.recordset);
  } catch (error) {
    console.error('Error al obtener las películas: ', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// POST para insertar una película
app.post('/api/insertarPelicula', async (req, res) => {
  try {
    const { titulo, anio_estreno, director, genero } = req.body;
    const result = await sql.query`INSERT INTO Peliculas (titulo, anio_estreno, director, genero) 
    VALUES (${titulo}, ${anio_estreno}, ${director}, ${genero})`;
    res.json({ message: 'Película agregada correctamente' });
  } catch (error) {
    console.error('Error al insertar película: ', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// DELETE para eliminar una película
app.delete('/api/Pelicula/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await sql.query`DELETE FROM Peliculas WHERE id_pelicula = ${id}`;
    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({ error: 'Película no encontrada' });
    }
    res.json({ message: 'Película eliminada correctamente' });
  } catch (error) {
    console.error('Error al eliminar película: ', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

//UPDATE para actualizar una película (solo se hará en el género)
app.patch('/api/Pelicula/:id', async (req, res) =>{
  try{
    const {id} = req.params;
    const {genero} = req.body;
    const result = await sql.query`UPDATE Peliculas SET genero = ${genero} WHERE id_pelicula = ${id}`;
    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({ error: 'Película no encontrada' });
    }
    res.json({ message: 'Película actualizada correctamente' });
  } catch (error) {
    console.error('Error al actualizar película: ', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
