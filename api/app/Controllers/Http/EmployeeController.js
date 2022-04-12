'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Employee = use('App/Models/Employee')
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
    name: "email",
    align: "center",
    label: "Email",
    field: "email",
  },
  {
    name: "workstation",
    align: "center",
    label: "Cargo",
    field: "workstation",
  },
  {
    name: "actions",
    align: "right",
    label: "Acciones",
    field: "actions",
  },
]
/**
 * Resourceful controller for interacting with employees
 */
class EmployeeController {
  /**
   * Show a list of all employees.
   * GET employees
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view ,  auth }) {
    const userLoggued = await auth.getUser()
    const logued = await Bussine.where('email', userLoggued.email).first()
    const date = (await Employee.where('bussine_id', logued._id).fetch()).toJSON()
    if (date.length === 0) {
      response.send(date)
    } else {
      const dates = []
      date.forEach(element => {
        dates.push({
          _id: element._id,
          name: element.name,
          email: element.email,
          workstation: element.workstation,
          actions: [
            {
              icon: "edit",
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
   * Render a form to be used for creating a new employee.
   * GET employees/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
  }

  /**
   * Create/save a new employee.
   * POST employees
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response, auth }) {
    const dateForUser = request.all()
    const userLoggued = await auth.getUser()
    const validation = await validate(request.all(), Employee.fieldValidationRules())
    if (validation.fails()) {
      response.unprocessableEntity(validation.messages())
    } else {
      if (((await Employee.where('bussine_id', (await Bussine.where('email', (await auth.getUser()).email).first())._id).fetch()).toJSON()).length === (parseInt(((await Bussine.where('email', userLoggued.email).first()).empleyersNumber).substr(-1)))) {
        response.status(422).unprocessableEntity([{
          message: 'Correo ya registrado, prueba con otro',
          status: 422
        }])
      } else {
        const logued = await Bussine.where('email', userLoggued.email).first()
        const employ = request.only(Employee.fillable)
        console.log(dateForUser, 'qlq')
        employ.bussine_id = logued._id
        if (employ._id) {
          response.send(await Employee.where('_id', employ._id).update(employ))
        } else {
          response.send(await Employee.create(employ))
        }
      }
    }
  }

  /**
   * Display a single employee.
   * GET employees/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
    response.send(await Employee.find(params.id))
  }

  /**
   * Render a form to update an existing employee.
   * GET employees/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update employee details.
   * PUT or PATCH employees/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a employee with id.
   * DELETE employees/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
    response.send(await Employee.where('_id',params.id).delete())
  }
}

module.exports = EmployeeController
