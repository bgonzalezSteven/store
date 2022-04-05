'use strict'



/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')
Route.get('/', () => {
  return {
    greeting: 'Hello world in JSON'
  }
})

const addPrefixToGroup = group => {
  // Grupo para rutas con prefijo /api/
  group.prefix("api");

  return group;
};


addPrefixToGroup(
  Route.group(() => {
    // Insertar rutas sin protección de autenticación aquí
    Route.post("login", "UserController.login");
    Route.post("register", "UserController.store");
    Route.get('public/profilePhotos/:dir', 'StoreController.getFile')
  })
);

addPrefixToGroup(
  Route.group(() => {
    // Insertar rutas con protección de autenticación aquí
    Route.get("InfoLog", "UserController.info");
    Route.put("changeModel", "UserController.update");

    
    // Rutas para crud de negocios y su estado //
    Route.get("bussines", "BussineController.index");
    Route.put("changeStatus", "BussineController.update");
    Route.delete("business/:id", "BussineController.destroy");
    // Rutas para crud de negocios y su estado //
    
    // Rutas para la creacion del Roles del sistema //
    Route.get('rol', 'RolController.index')
    Route.post('role', 'RolController.store')
    Route.get('getRole/:id', 'RolController.show')
    Route.delete('role/:id', 'RolController.destroy')
    Route.get('permissions', 'PermissionController.index')
    // Rutas para la creacion del Roles del sistema //


    // Rutas de acceso a los negocios //
    Route.get('information', 'StoreController.index')
    Route.post('information', 'StoreController.store')
    // Rutas de acceso a los negocios //

    // Rutas para los contactos //
    Route.get('customer/:id', 'CustomerController.show')
    Route.get('customer', 'CustomerController.index')
    Route.post('customer', 'CustomerController.store')
    Route.delete('customer/:id', 'CustomerController.destroy')
    // Rutas para los contactos //

    // Rutas para metodos de pago //
    Route.get('paymentMethod', 'PaymentMethodController.index')
    Route.post('paymentMethod', 'PaymentMethodController.store')
    Route.get('paymentMethod/:id', 'PaymentMethodController.show')
    Route.delete('paymentMethod/:id', 'PaymentMethodController.destroy')
    // Rutas para los productos //

    // Rutas para los impuestos //
    Route.get('tax', 'TaxController.index')
    Route.post('tax', 'TaxController.store')
    Route.get('tax/:id', 'TaxController.show')
    Route.delete('tax/:id', 'TaxController.destroy')
    // Rutas para los productos //

    // Rutas para los trabajadores //
    Route.get('employee', 'EmployeeController.index')
    Route.post('employee', 'EmployeeController.store')
    Route.get('employee/:id', 'EmployeeController.show')
    Route.delete('employee/:id', 'EmployeeController.destroy')
    // Rutas para los trabajadores //


    
  }).middleware("auth")
);
