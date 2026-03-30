const empleadoStore = require('../store/empleado.store');

const empleadoCtrl = {};

empleadoCtrl.getEmpleados = async (_req, res) => {
  const empleados = await empleadoStore.getAll();
  res.json(empleados);
};

empleadoCtrl.createEmpleados = async (req, res) => {
  try {
    const empleado = await empleadoStore.create(req.body);
    res.status(201).json(empleado);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

empleadoCtrl.getUnicoEmpleado = async (req, res) => {
  const empleado = await empleadoStore.getById(req.params.id);

  if (!empleado) {
    return res.status(404).json({ error: 'Empleado no encontrado' });
  }

  return res.json(empleado);
};

empleadoCtrl.editarEmpleado = async (req, res) => {
  try {
    const empleadoActualizado = await empleadoStore.update(req.params.id, req.body);

    if (!empleadoActualizado) {
      return res.status(404).json({ error: 'Empleado no encontrado' });
    }

    return res.json({ status: 'Empleado Actualizado', empleado: empleadoActualizado });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

empleadoCtrl.eliminarEmpleado = async (req, res) => {
  const eliminado = await empleadoStore.remove(req.params.id);

  if (!eliminado) {
    return res.status(404).json({ error: 'Empleado no encontrado' });
  }

  return res.json({ status: 'Empleado Eliminado' });
};

module.exports = empleadoCtrl;
