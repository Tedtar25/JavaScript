import express from 'express';
import { json } from 'express';
import sql from 'mssql';

const app = express();
const PORT = process.env.PORT || 501;

app.listen(PORT, () => {
  console.log(`Servidor de la Legion 501 corriendo en el puerto ${PORT}`+` de Darth Vader`);
});

app.get('/', (req, res) => {
  res.send('Servidor del Imperio Galactico');
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
    console.error('Atras Rebelde, no tienes acceso', err);
  } else {
    console.log('Conexion exitosa a base de datos de la galaxia.');
  }
});

//UTILIZAR POSTMAN PARA VER LAS CONSULTAS

//GET para Tabla Peliculas
app.get('/api/getPeliculas', async (req, res) => {
    try {
      const result = await sql.query`SELECT * FROM Peliculas`;
      res.json(result.recordset);
    } catch (error) {
      console.error('Error al obtener las películas: ', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
});

//GET para Tabla Actores
app.get('/api/getActores', async (req, res) =>{
    try{
        const result = await sql.query`SELECT * FROM Actores`;
        res.json(result.recordset);
    }catch (error){
        console.error('Error al obtener los actores: ', error);
        res.status(500).json({error: 'Internal Server Error'});
    }
});

//GET para Tabla Directores
app.get('/api/getDirectores', async (req, res) =>{
    try{
        const result = await sql.query`SELECT * FROM Director`;
        res.json(result.recordset);
    }catch(error){
        console.error('Error al obtener los directores: ', error);
        res.status(500).json({error: 'Internal Server Error'});
    }
});

// POST para insertar una película
app.post('/api/postInsertarPelicula', async (req, res) => {
    try {
      const { titulo, anio_estreno, director, genero } = req.body;
      const result = await sql.query`INSERT INTO Peliculas (titulo, anio_estreno, director, genero) 
      VALUES (${titulo}, ${anio_estreno}, ${director}, ${genero});
      SELECT @@IDENTITY AS nuevoIdPelicula;`;

      const nuevoIdPelicula = result.recordset[0].nuevoIdPelicula;

      res.json({ message: `Se agregó la película ${titulo} con ID ${nuevoIdPelicula}` });
    } catch (error) {
      console.error('Error al insertar película: ', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
});

// POST para insertar un actor
app.post('/api/postInsertarActor', async (req, res) =>{
    try{
        const {nombre, nacionalidad} = req.body;
        const result = await sql.query`INSERT INTO Actores (nombre, nacionalidad) 
        VALUES (${nombre}, ${nacionalidad});
        SELECT @@IDENTITY AS nuevoIdActor;`;

        const nuevoIdActor = result.recordset[0].nuevoIdActor;

        res.json({message: `Se agregó el actor ${nombre} con ID ${nuevoIdActor}`});
    }catch(error){
        console.error('Error al agregar al actor', error);
        res.status(500).json({error: 'Internal Server Error'});
    }
});

// POST para insertar un director
app.post('/api/postInsertarDirector', async (req, res) =>{
    try{
        const { nombre, nacionalidad, primerPelicula } = req.body;
        const result = await sql.query`INSERT INTO Director (nombre, nacionalidad, primerPelicula) 
        VALUES (${nombre}, ${nacionalidad}, ${primerPelicula});
        SELECT @@IDENTITY AS nuevoIdDirector;`;

        const nuevoIdDirector = result.recordset[0].nuevoIdDirector;

        res.json({ message: `Se agregó el director ${nombre} con ID ${nuevoIdDirector}` });
    }catch(error){
        console.error('Error al insertar un nuevo director', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// DELETE para eliminar una película por sU Id
app.delete('/api/deletePelicula/:id', async (req, res) => {
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

//DELETE para eliminar un actor por su Id
app.delete('/api/deleteActor/:id', async (req, res) =>{
  try{
    const{id}=req.params;
    const result = await sql.query`DELETE FROM Actores WHERE id_actor = ${id}`;
    if(result.rowsAffected[0] === 0){
      return res.status(404).json({error: 'Actor no encontrado'});
    }
    res.json({message: 'Actor eliminado correctamente'});
  }catch (error){
    console.error('Error al eliminar actor', error);
    res.status(500).json({error: 'Internal Server Error'});
  }
});

//DELETE para eliminar un director por su Id
app.delete('/api/deleteDirector/:id', async (req, res) =>{
  try{
    const{id}=req.params;
    const result = await sql.query`DELETE FROM Directores WHERE id_director = ${id}`;
    if(result.rowsAffected[0] === 0){
      return res.status(404).json({error: 'Director no encontrado'});
    }
    res.json({message: 'Director eliminado correctamente'});
  }catch (error){
    console.error('Error al eliminar directo', error);
    res.status(500).json({error: 'Internal Server Error'});
  }
});

// PUT para modificar datos de una película por su Id
app.put('/api/putPelicula/:id', async (req, res) =>{
  try{
      const { titulo, anio_estreno, director, genero } = req.body;
      const idPelicula = req.params.id;
      const result = await sql.query`UPDATE Peliculas 
      SET titulo = ${titulo}, 
          anio_estreno = ${anio_estreno}, 
          director = ${director}, 
          genero = ${genero} 
      WHERE id_pelicula = ${idPelicula}`;
      res.json({ message: `Se modificaron los datos de la película con Id ${idPelicula}` });
  }catch(error){
      console.error('Error al modificar la película: ', error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});

//PUT para modificar datos de un actor por su Id
app.put('/api/putActor/:id', async (req, res) =>{
  try{
    const {nombre, nacionalidad} = req.body;
    const idActor = req.params.id;
    const result = await sql.query`UPDATE Actores 
    SET nombre = ${nombre}, 
        nacionalidad = ${nacionalidad} 
    WHERE id_actor = ${idActor}`;
    res.json({ message: `Se modificaron los datos del actor con Id ${idActor}` });
  }catch(error){
    console.error('Error al modificar el actor: ', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

//PUT para modificar datos de un director por su Id
app.put('/api/putDirector/:id', async (req, res) =>{
  try{
    const {nombre, nacionalidad, primerPelicula} = req.body;
    const idDirector = req.params.id;
    const result = await sql.query`UPDATE Directores 
    SET nombre = ${nombre}, 
        nacionalidad = ${nacionalidad}
        primerPelicula = ${primerPelicula}
    WHERE id_director = ${idDirector}`;
    res.json({ message: `Se modificaron los datos del director con Id ${idDirector}` });
  }catch(error){
    console.error('No se pudo modificar los datos', error);
    res.status(500).json({error: 'Internal Server Error'});
  }
});