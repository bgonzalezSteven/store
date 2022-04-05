'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const PaymentMethod = use('App/Models/PaymentMethod')
const Bussine = use('App/Models/Bussine')
const { validate } = use("Validator")
const titles = [
  {
    name: "name",
    required: true,
    label: "Nombre",
    align: "left",
    field: "name",
  },
  {
    name: "description",
    align: "center",
    label: "Descripción",
    field: "description",
  },
  {
    name: "actions",
    align: "right",
    label: "Acciones",
    field: "actions",
  },
]
/**
 * Resourceful controller for interacting with paymentmethods
 */
class PaymentMethodController {
  /**
   * Show a list of all paymentmethods.
   * GET paymentmethods
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view,  auth }) {
    const userLoggued = await auth.getUser()
    const logued = await Bussine.where('email', userLoggued.email).first()
    const date = (await PaymentMethod.where('bussine_id', logued._id).fetch()).toJSON()
    if (date.length === 0) {
      response.send(date)
    } else {
      const dates = []
      date.forEach(element => {
        dates.push({
          _id: element._id,
          name: element.name,
          description: element.description,
          actions: [
            {
              icon: "edit",
              to: `/paymentMethod/edit_paymentMethod/${element._id}`,
              color: "secondary",
              title: "Editar",
            },
            {
              icon: "delete",
              color: "negative",
              title: "Eliminar",
            }
          ]
        })
      });      
      const info = {
        titles: titles,
        data: dates,
      }
      response.send(info)
    }
  }

  /**
   * Render a form to be used for creating a new paymentmethod.
   * GET paymentmethods/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
  }

  /**
   * Create/save a new paymentmethod.
   * POST paymentmethods
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response, auth }) {
    const validation = await validate(request.all(), PaymentMethod.fieldValidationRules())
    if (validation.fails()) {
      response.unprocessableEntity(validation.messages())
    } else {
      const userLoggued = await auth.getUser()
      const logued = await Bussine.where('email', userLoggued.email).first()
      const paymentmethod = request.only(PaymentMethod.fillable)
      paymentmethod.bussine_id = logued._id
      if (paymentmethod._id) {
        response.status(204).send(await PaymentMethod.where('_id', paymentmethod._id).update(paymentmethod))
      } else {
        response.status(200).send(await PaymentMethod.create(paymentmethod))
      }
    }
    
  }

  /**
   * Display a single paymentmethod.
   * GET paymentmethods/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
    response.send(await PaymentMethod.find(params.id))
  }

  /**
   * Render a form to update an existing paymentmethod.
   * GET paymentmethods/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update paymentmethod details.
   * PUT or PATCH paymentmethods/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a paymentmethod with id.
   * DELETE paymentmethods/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
    response.send(await PaymentMethod.where('_id',params.id).delete())
  }
}

module.exports = PaymentMethodController
