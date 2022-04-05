'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const Tax = use('App/Models/Tax')
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
    name: "value",
    align: "center",
    label: "Valor",
    field: "value",
  },
  {
    name: "actions",
    align: "right",
    label: "Acciones",
    field: "actions",
  },
]
/**
 * Resourceful controller for interacting with taxes
 */
class TaxController {
  /**
   * Show a list of all taxes.
   * GET taxes
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view,  auth }) {
    const userLoggued = await auth.getUser()
    const logued = await Bussine.where('email', userLoggued.email).first()
    const date = (await Tax.where('bussine_id', logued._id).fetch()).toJSON()
    if (date.length === 0) {
      response.send(date)
    } else {
      const dates = []
      date.forEach(element => {
        dates.push({
          _id: element._id,
          name: element.name,
          value: `${element.price}%`,
          description: element.description,
          actions: [
            {
              icon: "edit",
              to: `/Tax/edit_Tax/${element._id}`,
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
   * Render a form to be used for creating a new tax.
   * GET taxes/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
  }

  /**
   * Create/save a new tax.
   * POST taxes
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response, auth }) {
    const validation = await validate(request.all(), Tax.fieldValidationRules())
    if (validation.fails()) {
      response.unprocessableEntity(validation.messages())
    } else {
      const userLoggued = await auth.getUser()
      const logued = await Bussine.where('email', userLoggued.email).first()
      const tex = request.only(Tax.fillable)
      tex.bussine_id = logued._id
      if (tex._id) {
        response.status(204).send(await Tax.where('_id', tex._id).update(tex))
      } else {
        response.status(200).send(await Tax.create(tex))
      }
    }
    
  }

  /**
   * Display a single tax.
   * GET taxes/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
    response.send(await Tax.find(params.id))
  }

  /**
   * Render a form to update an existing tax.
   * GET taxes/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update tax details.
   * PUT or PATCH taxes/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a tax with id.
   * DELETE taxes/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
    response.send(await Tax.where('_id',params.id).delete())
  }
}

module.exports = TaxController
