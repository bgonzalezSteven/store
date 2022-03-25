'use strict'

/*
|--------------------------------------------------------------------------
| PermissionSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

const Permission = use("App/Models/Permission")
const roleData = [
  {
    slug: 'configuration',
    name: 'Item de menu para las Configuraciones',
  },
  {
    slug: 'configuration.bussines',
    name: 'Negocios',
  },
  {
    slug: 'configuration.role',
    name: 'Roles',
  },
  {
    slug: 'bussines.information',
    name: 'Informacion del Negocio',
  },
]
class PermissionSeeder {
  async run() {
    for (let i in roleData) {
      let role = await Permission.findBy('slug', roleData[i].slug)
      if (!role) {
        await Permission.create(roleData[i])
      } else {
        role.name = roleData[i].name
        role.slug = roleData[i].slug
        await role.save()
      }
    }
    console.log('Finished Role')
  }
}

module.exports = PermissionSeeder
