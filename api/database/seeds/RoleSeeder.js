'use strict'

/*
|--------------------------------------------------------------------------
| RoleSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const Role = use("App/Models/Role")
const roleData = [
  {
    name: 'Rol Desarrollador',
    slug: 'app.everybody',
    description: 'Control de Negocios registrados',
    permissions: [
      {
        slug: 'configuration',
        name: 'Configuración',
      },
      {
        slug: 'configuration.bussines',
        name: 'Listado de Negocios',
      },
      {
        slug: 'configuration.role',
        name: 'Listado de Roles para el sistema', // Estos modulos le darán vida al sistema ya que a partir de aca se dará acceso hasta cierto punto a cada sistema por separado, es decir, el sistema general PREMIUM tendrá acceso a todo el sistema pero existiran accesos limitados hasta cierto punto, llamese cantidad de registros y distintos modulos
      }
    ]
  },
  {
    name: 'Rol Negocio',
    slug: 'app.bussines',
    description: 'Control de Negocios',
    permissions: [
      {
        slug: 'configuration',
        name: 'Configuración',
      },
      {
        slug: 'bussines.information',
        name: 'Informacion del Negocio',
      },
    ]
  }
];

class RoleSeeder {
  async run() {
    for (let i in roleData) {
      let role = await Role.findBy('slug', roleData[i].slug)
      if (!role) {
        await Role.create(roleData[i])
      } else {
        role.name = roleData[i].name
        role.slug = roleData[i].slug
        role.description = roleData[i].description
        role.permissions = roleData[i].permissions
        await role.save()
      }
    }
    console.log('Finished Role')
  }
}

module.exports = RoleSeeder
