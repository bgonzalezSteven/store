'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const Bussine = use('App/Models/Bussine')
const User = use('App/Models/User')
/**
 * Resourceful controller for interacting with bussines
 */
class BussineController {
  /**
   * Show a list of all bussines.
   * GET bussines
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    const dates = (await Bussine.all()).toJSON()
    const info = []
    for (let i in dates) {
      info.push({
        _id: dates[i]._id,
        email: dates[i].email,
        name: dates[i].name ? dates[i].name : 'No configurado',
        status: `${(await User.where('email', dates[i].email).first()).status ? 'Activo' : 'Inactivo'}`,
        direction: dates[i].direction ? dates[i].direction : 'No configurado',
        actions: [
          {
            color: "primary",
            icon: "delete",
            title: "Eliminar",
            to: `${dates[i]._id}`
          },
          {
            color: `${(await User.where('email', dates[i].email).first()).status ? 'negative' : 'positive'}`,
            icon: "people",
            title: `${(await User.where('email', dates[i].email).first()).status ? 'Desactivar' : 'Activar'}`,
            to: `${dates[i]._id}`,
          }
        ]
      })
    }
    response.send(info)
  }

  /**
   * Render a form to be used for creating a new bussine.
   * GET bussines/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
  }

  /**
   * Create/save a new bussine.
   * POST bussines
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
  }

  /**
   * Display a single bussine.
   * GET bussines/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing bussine.
   * GET bussines/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update bussine details.
   * PUT or PATCH bussines/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */ async update({ params, request, response }) {
    const dates = request.only(['email', 'status'])
    response.send(await User.where('email', dates.email).update({ status: (dates.status  === 'Activo' ? new Boolean() : new Boolean(true)) }))
  }

  /**
   * Delete a bussine with id.
   * DELETE bussines/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
    const user = await User.where('email', params.id).delete()
    response.send(await Bussine.where('email', params.id).delete())
  }
}

module.exports = BussineController
