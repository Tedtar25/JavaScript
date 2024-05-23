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
  database: '79892_Examen_Personas', //base de datos a usar
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

//REALIZAR TODAS LAS CONSULTAS EN POSTMAN

//Consultas para la tabla CLIENTES

// GET para obtener todos los clientes (1)
// http://localhost:501/api/getClientes
app.get('/api/getClientes', async (req, res) => {
  try {
    const result = await sql.query`SELECT * FROM Clientes`;
    res.json(result.recordset);
  } catch (error) {
    console.error('Error al obtener los clientes: ', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// GET para obtener un cliente por su nombre (2)
// http://localhost:501/api/getClientes/Juan Perez
app.get('/api/getClientes/:nombre', async (req, res) => { //Los nombres tieenen espacios, por lo que es necesario
  try {
    const { nombre } = req.params;
    const result = await sql.query`SELECT * FROM Clientes WHERE Nombre = ${nombre}`;
    res.json(result.recordset);
  } catch (error) {
    console.error('Error al obtener el cliente: ', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// POST para insertar un cliente (3)
// http://localhost:501/api/postClientes
app.post('/api/postClientes', async (req, res) => {
  try {
    const { Nombre, Teléfono, Dirección, Email } = req.body;
    const result = await sql.query`INSERT INTO Clientes (Nombre, Teléfono, Dirección, Email) 
      VALUES (${Nombre}, ${Teléfono}, ${Dirección}, ${Email});
      SELECT @@IDENTITY AS nuevoIdCliente;`;

    const nuevoIdCliente = result.recordset[0].nuevoIdCliente;

    res.json({ message: `Se agregó el cliente ${Nombre} con ID ${nuevoIdCliente}` });
  } catch (error) {
    console.error('Error al insertar el cliente: ', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// PUT para modificar datos de un cliente por su ID (4)
// http://localhost:501/api/putClientes/5
/*
{
    "Nombre": "Cesar Carrillo",
    "Telefono": "4614029784",
    "Direccion": "Calle Perengana 809",
    "Email": "capc@correo.com"
}
*/
app.put('/api/putClientes/:id', async (req, res) => {
  try {
    const { Nombre, Teléfono, Dirección, Email } = req.body;
    const idCliente = req.params.id;
    const result = await sql.query`UPDATE Clientes 
      SET Nombre = ${Nombre}, 
          Teléfono = ${Teléfono}, 
          Dirección = ${Dirección}, 
          Email = ${Email} 
      WHERE ID = ${idCliente}`;
    res.json({ message: `Se modificaron los datos del cliente con ID ${idCliente}` });
  } catch (error) {
    console.error('Error al modificar el cliente: ', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// DELETE para eliminar un cliente por su ID (5)
// http://localhost:501/api/deleteClientes/5
app.delete('/api/deleteClientes/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await sql.query`DELETE FROM Clientes WHERE ID = ${id}`;
    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({ error: 'Cliente no encontrado' });
    }
    res.json({ message: 'Cliente eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar cliente: ', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


//Consultas para la tabla EMPLEADOS

// GET para obtener todos los empleados (6)
// http://localhost:501/api/getEmpleados
app.get('/api/getEmpleados', async (req, res) => {
  try {
    const result = await sql.query`SELECT * FROM Empleados`;
    res.json(result.recordset);
  } catch (error) {
    console.error('Error al obtener los empleados: ', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// GET para obtener un empleado por su nombre (7)
// http://localhost:501/api/getEmpleados/nombre
app.get('/api/getEmpleados/:nombre', async (req, res) => {
  try {
    const { nombre } = req.params;
    const result = await sql.query`SELECT * FROM Empleados WHERE Nombre = ${nombre}`;
    res.json(result.recordset);
  } catch (error) {
    console.error('Error al obtener el empleado: ', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// POST para insertar un empleado (8)
// http://localhost:501/api/postEmpleados
app.post('/api/postEmpleados', async (req, res) => {
  try {
    const { Nombre, Area, Oficina } = req.body;
    const result = await sql.query`INSERT INTO Empleados (Nombre, Area, Oficina) 
      VALUES (${Nombre}, ${Area}, ${Oficina});
      SELECT @@IDENTITY AS nuevoIdEmpleado;`;

    const nuevoIdEmpleado = result.recordset[0].nuevoIdEmpleado;

    res.json({ message: `Se agregó el empleado ${Nombre} con ID ${nuevoIdEmpleado}` });
  } catch (error) {
    console.error('Error al insertar el empleado: ', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// PUT para modificar datos de un empleado por su ID (9)
// http://localhost:501/api/getEmpleados/id
/*
{
    "Nombre": "Cesar Carrillo",
    "Area": "Gerencia",
    "Oficina": "Oficina Gerencia",
}
*/
app.put('/api/putEmpleados/:id', async (req, res) => {
  try {
    const { Nombre, Area, Oficina } = req.body;
    const idEmpleado = req.params.id;
    const result = await sql.query`UPDATE Empleados 
      SET Nombre = ${Nombre}, 
          Area = ${Area}, 
          Oficina = ${Oficina} 
      WHERE ID = ${idEmpleado}`;
    res.json({ message: `Se modificaron los datos del empleado con ID ${idEmpleado}` });
  } catch (error) {
    console.error('Error al modificar el empleado: ', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// DELETE para eliminar un empleado por su ID (10)
// http://localhost:501/api/deleteEmpleados/id
app.delete('/api/deleteEmpleados/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await sql.query`DELETE FROM Empleados WHERE ID = ${id}`;
    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({ error: 'Empleado no encontrado' });
    }
    res.json({ message: 'Empleado eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar empleado: ', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


//Consultas para la tabla PROVEEDORES

// GET para obtener todos los proveedores (11)
// http://localhost:501/api/getProveedores
app.get('/api/getProveedores', async (req, res) => {
  try {
    const result = await sql.query`SELECT * FROM Proveedores`;
    res.json(result.recordset);
  } catch (error) {
    console.error('Error al obtener los proveedores: ', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// GET para obtener un proveedor por su nombre (12)
// http://localhost:501/api/getProveedores/nombre
app.get('/api/getProveedores/:nombre', async (req, res) => {
  try {
    const { nombre } = req.params;
    const result = await sql.query`SELECT * FROM Proveedores WHERE Nombre = ${nombre}`;
    res.json(result.recordset);
  } catch (error) {
    console.error('Error al obtener el proveedor: ', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// POST para insertar un proveedor (13)
//http://localhost:501/api/postProveedores
app.post('/api/postProveedores', async (req, res) => {
  try {
    const { Nombre, Empresa, Teléfono, Email } = req.body;
    const result = await sql.query`INSERT INTO Proveedores (Nombre, Empresa, Teléfono, Email) 
      VALUES (${Nombre}, ${Empresa}, ${Teléfono}, ${Email});
      SELECT @@IDENTITY AS nuevoIdProveedor;`;

    const nuevoIdProveedor = result.recordset[0].nuevoIdProveedor;

    res.json({ message: `Se agregó el proveedor ${Nombre} con ID ${nuevoIdProveedor}` });
  } catch (error) {
    console.error('Error al insertar el proveedor: ', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// PUT para modificar datos de un proveedor por su ID (14)
// http://localhost:501/api/putProveedores
/*
{
    "Nombre": "Cesar Carrillo",
    "Empresa": "Desomet",
    "Telefono": "4614029784",
    "Email": "capc@correo.com"
}
*/
app.put('/api/putProveedores/:id', async (req, res) => {
  try {
    const { Nombre, Empresa, Teléfono, Email } = req.body;
    const idProveedor = req.params.id;
    const result = await sql.query`UPDATE Proveedores 
      SET Nombre = ${Nombre}, 
          Empresa = ${Empresa}, 
          Teléfono = ${Teléfono}, 
          Email = ${Email} 
      WHERE ID = ${idProveedor}`;
    res.json({ message: `Se modificaron los datos del proveedor con ID ${idProveedor}` });
  } catch (error) {
    console.error('Error al modificar el proveedor: ', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// DELETE para eliminar un proveedor por su ID (15)
// http://localhost:501/api/deleteProveedores
app.delete('/api/deleteProveedores/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await sql.query`DELETE FROM Proveedores WHERE ID = ${id}`;
    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({ error: 'Proveedor no encontrado' });
    }
    res.json({ message: 'Proveedor eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar proveedor: ', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});