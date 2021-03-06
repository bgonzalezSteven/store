'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const Customer = use('App/Models/Customer')
const Bussine = use('App/Models/Bussine')
const titles = [
  {
    name: "name",
    required: true,
    label: "Nombre",
    align: "left",
    field: "name",
  },
  {
    name: "contact_type",
    align: "center",
    label: "Tipo de contacto",
    field: "contact_type",
  },
  {
    name: "nfi",
    align: "center",
    label: "NFI",
    field: "nfi",
  },
  {
    name: "phone",
    align: "center",
    label: "Teléfono",
    field: "phone",
  },
  {
    name: "email",
    align: "center",
    label: "Correo",
    field: "email",
  },
  {
    name: "actions",
    align: "right",
    label: "Acciones",
    field: "actions",
  },
]
const typesContacts = [
  {
    label: "No especificado",
    value: "unspecified",
  },
  {
    label: "Cliente",
    value: "customer",
  },
  {
    label: "Proveedor",
    value: "supplier",
  },
  {
    label: "Deudor",
    value: "debtor",
  },
  {
    label: "Acreedor",
    value: "creditor",
  },
]
/**
 * Resourceful controller for interacting with customers
 */
class CustomerController {
  /**
   * Show a list of all customers.
   * GET customers
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view, auth }) {
    const userLoggued = await auth.getUser()
    const logued = await Bussine.where('email', userLoggued.email).first()
    const date = (await Customer.where('bussine_id', logued._id).fetch()).toJSON()
    if (date.length === 0) {
      response.send(date)
    } else {
      const dates = []
      date.forEach(element => {
        dates.push({
          _id: element._id, name: element.name, contact_type: typesContacts.find(x => x.value == element.contact_type).label, nfi: element.nfi, phone: element.phone ? element.phone : '', email: element.email ? element.email : '', actions: [
            {
              icon: "edit",
              to: `/customer/edit_customer/${element._id}`,
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
   * Render a form to be used for creating a new customer.
   * GET customers/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
  }

  /**
   * Create/save a new customer.
   * POST customers
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response , auth }) {
    const userLoggued = await auth.getUser()
    const logued = await Bussine.where('email', userLoggued.email).first()
    const customerData = request.all()
    customerData.bussine_id = logued._id
    if (customerData._id) {
      response.status(204).send(await Customer.where('_id', customerData._id).update(customerData))
    } else {
      response.status(200).send(await Customer.create(customerData))
    }
  }

  /**
   * Display a single customer.
   * GET customers/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
    response.send(await Customer.find(params.id))
  }

  /**
   * Render a form to update an existing customer.
   * GET customers/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update customer details.
   * PUT or PATCH customers/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a customer with id.
   * DELETE customers/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
    response.send(await Customer.where('_id',params.id).delete())
  }
}

module.exports = CustomerController
