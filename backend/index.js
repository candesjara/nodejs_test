const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

app.set('port', port);

app.use(morgan('dev'));
app.use(express.json());
app.use(cors());

app.get('/', (_req, res) => {
  res.json({
    ok: true,
    service: 'backend-demo',
    storage: 'json-file',
    port
  });
});

app.use('/api/empleados', require('./routes/empleado.route'));

app.listen(app.get('port'), () => {
  console.log('Servidor activo en el puerto', app.get('port'));
});
