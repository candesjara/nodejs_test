const fs = require('fs/promises');
const path = require('path');
const crypto = require('crypto');

const dataFile = path.join(__dirname, '..', 'data', 'empleados.json');
const requiredFields = ['name', 'position', 'office', 'salary'];

async function readEmpleados() {
  const content = await fs.readFile(dataFile, 'utf8');
  const parsed = JSON.parse(content);
  return Array.isArray(parsed) ? parsed : [];
}

async function writeEmpleados(empleados) {
  await fs.writeFile(dataFile, JSON.stringify(empleados, null, 2));
}

function normalizePayload(payload, { partial = false } = {}) {
  const data = { ...payload };

  if (data._id === '') {
    delete data._id;
  }

  if (!partial) {
    for (const field of requiredFields) {
      if (data[field] === undefined || data[field] === null || data[field] === '') {
        throw new Error(`El campo "${field}" es obligatorio`);
      }
    }
  }

  if (data.salary !== undefined) {
    const salaryNumber = Number(data.salary);

    if (Number.isNaN(salaryNumber)) {
      throw new Error('El campo "salary" debe ser numerico');
    }

    data.salary = salaryNumber;
  }

  return data;
}

async function getAll() {
  return readEmpleados();
}

async function getById(id) {
  const empleados = await readEmpleados();
  return empleados.find((empleado) => empleado._id === id) || null;
}

async function create(payload) {
  const empleados = await readEmpleados();
  const data = normalizePayload(payload);

  const empleado = {
    _id: crypto.randomUUID(),
    name: data.name,
    position: data.position,
    office: data.office,
    salary: data.salary
  };

  empleados.push(empleado);
  await writeEmpleados(empleados);

  return empleado;
}

async function update(id, payload) {
  const empleados = await readEmpleados();
  const index = empleados.findIndex((empleado) => empleado._id === id);

  if (index === -1) {
    return null;
  }

  const data = normalizePayload(payload, { partial: true });
  const empleadoActual = empleados[index];
  const empleadoActualizado = {
    ...empleadoActual,
    ...data,
    _id: empleadoActual._id
  };

  empleados[index] = empleadoActualizado;
  await writeEmpleados(empleados);

  return empleadoActualizado;
}

async function remove(id) {
  const empleados = await readEmpleados();
  const filtered = empleados.filter((empleado) => empleado._id !== id);

  if (filtered.length === empleados.length) {
    return false;
  }

  await writeEmpleados(filtered);
  return true;
}

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove
};
