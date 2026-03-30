const empleadoCtrl = require('../controllers/empleado.controller');
const empleadoStore = require('../store/empleado.store');

jest.mock('../store/empleado.store');

describe('Pruebas unitarias - empleado.controller', () => {
  let req;
  let res;

  beforeEach(() => {
    req = { body: {}, params: {} };
    res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis()
    };
    jest.clearAllMocks();
  });

  test('getEmpleados debe devolver todos los empleados', async () => {
    const empleadosMock = [{ name: 'Carlos' }, { name: 'Ana' }];
    empleadoStore.getAll.mockResolvedValue(empleadosMock);

    await empleadoCtrl.getEmpleados(req, res);

    expect(empleadoStore.getAll).toHaveBeenCalled();
    expect(res.json).toHaveBeenCalledWith(empleadosMock);
  });

  test('createEmpleados debe crear un empleado y devolver status 201', async () => {
    const empleadoMock = { _id: '1', name: 'Pedro' };
    empleadoStore.create.mockResolvedValue(empleadoMock);

    req.body = { name: 'Pedro', position: 'Dev', office: 'Bogota', salary: 5000 };

    await empleadoCtrl.createEmpleados(req, res);

    expect(empleadoStore.create).toHaveBeenCalledWith(req.body);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(empleadoMock);
  });

  test('createEmpleados maneja error de validacion con 400', async () => {
    empleadoStore.create.mockRejectedValue(new Error('El campo "name" es obligatorio'));

    await empleadoCtrl.createEmpleados(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ error: 'El campo "name" es obligatorio' })
    );
  });

  test('getUnicoEmpleado debe devolver un empleado por ID', async () => {
    const empleadoMock = { _id: '123', name: 'Laura' };
    empleadoStore.getById.mockResolvedValue(empleadoMock);
    req.params.id = '123';

    await empleadoCtrl.getUnicoEmpleado(req, res);

    expect(empleadoStore.getById).toHaveBeenCalledWith('123');
    expect(res.json).toHaveBeenCalledWith(empleadoMock);
  });

  test('getUnicoEmpleado responde 404 si no existe', async () => {
    empleadoStore.getById.mockResolvedValue(null);
    req.params.id = 'no-existe';

    await empleadoCtrl.getUnicoEmpleado(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: 'Empleado no encontrado' });
  });

  test('editarEmpleado debe actualizar un empleado', async () => {
    const empleadoActualizado = { _id: '456', name: 'Mario' };
    empleadoStore.update.mockResolvedValue(empleadoActualizado);

    req.params.id = '456';
    req.body = { name: 'Mario', position: 'QA', office: 'Medellin', salary: 4000 };

    await empleadoCtrl.editarEmpleado(req, res);

    expect(empleadoStore.update).toHaveBeenCalledWith('456', req.body);
    expect(res.json).toHaveBeenCalledWith({
      status: 'Empleado Actualizado',
      empleado: empleadoActualizado
    });
  });

  test('editarEmpleado responde 404 si no existe', async () => {
    empleadoStore.update.mockResolvedValue(null);
    req.params.id = '456';

    await empleadoCtrl.editarEmpleado(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: 'Empleado no encontrado' });
  });

  test('eliminarEmpleado debe borrar un empleado por ID', async () => {
    empleadoStore.remove.mockResolvedValue(true);
    req.params.id = '789';

    await empleadoCtrl.eliminarEmpleado(req, res);

    expect(empleadoStore.remove).toHaveBeenCalledWith('789');
    expect(res.json).toHaveBeenCalledWith({ status: 'Empleado Eliminado' });
  });

  test('eliminarEmpleado responde 404 si no existe', async () => {
    empleadoStore.remove.mockResolvedValue(false);
    req.params.id = '789';

    await empleadoCtrl.eliminarEmpleado(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: 'Empleado no encontrado' });
  });
});
