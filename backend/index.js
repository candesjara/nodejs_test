const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const ENTRY_FILE = 'backend/index.js';
const HOST = '0.0.0.0';
const PORT = Number(process.env.PORT) || 3000;

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(cors());

app.get('/', (_req, res) => {
  res.status(200).json({
    message: 'API activa',
    entryFile: ENTRY_FILE,
    port: PORT
  });
});

app.use('/api/empleados', require('./routes/empleado.route'));

function logMongoStatus() {
  if (process.env.MONGODB_URI) {
    console.log('[startup] MongoDB configurado por variable de entorno MONGODB_URI');
    return;
  }

  console.log('[startup] MongoDB no esta activo en esta version demo; usando almacenamiento JSON');
}

function startServer() {
  console.log(`[startup] Archivo de entrada: ${ENTRY_FILE}`);
  console.log(`[startup] Puerto configurado: ${PORT}`);
  logMongoStatus();

  app.listen(PORT, HOST, () => {
    console.log(`[startup] Servidor levantado en http://${HOST}:${PORT}`);
  });
}

startServer();
