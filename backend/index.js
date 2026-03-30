const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

require('./database');

const app = express();
const port = process.env.PORT || 3000;

app.set('port', port);

app.use(morgan('dev'));
app.use(express.json());
app.use(cors());

app.get('/', (_req, res) => {
  res.json({ ok: true, service: 'backend', port });
});

app.use('/api/empleados', require('./routes/empleado.route'));

app.listen(app.get('port'), () => {
  console.log('Servidor activo en el puerto', app.get('port'));
});
