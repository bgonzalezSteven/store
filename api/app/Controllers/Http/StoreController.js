'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const Bussine = use('App/Models/Bussine')
const Store = use('App/Models/Store')
const Helpers = use('Helpers')
const { validate } = use("Validator")

/**
 * Resourceful controller for interacting with stores
 */
class StoreController {
  /**
   * Show a list of all stores.
   * GET stores
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view, auth }) {
    const getUserLog = await auth.getUser()
    const infoHotel = (await Bussine.where('email', getUserLog.email).first()).toJSON()
    response.send(infoHotel)
  }

  /**
   * Render a form to be used for creating a new store.
   * GET stores/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
  }

  /**
   * Create/save a new store.
   * POST stores
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    const photo = request.file('file', {
      size: '10mb'
    })
    const datess = (request.post()) //Datos que traigo del Front)
    let info = JSON.parse(datess.dates) // JSETEO la información para que me quede no más que los datos que necesito
    const dir = 'public/profilePhotos/' // Directorio donde se guardan las fotos
    // Si hay un documento cargado guardo ese betax
    if (photo) {
      const fileName = `${info._id}__profilePhoto.${photo.extname}`
      await photo.move(dir, {
        name: fileName,
        overwrite: true
      })
      if (!photo.moved()) {
        return response.status(422).send({
          status: true,
          message: 'Ocurrio un error al cargar los archivos',
          icon: 'warning',
          color: 'negative'
        })
      } else {
        info.file = `${dir}${fileName}`
        await response.send(this.saveInformation(info))
      }
    }
  }

  async saveInformation (info) {
    const validation = await validate(info, Store.fieldValidationRules())
    if (!validation.fails()) {
      return await Bussine.where('_id', info._id).update(info)
    }
  }
  async getFile ({ request, response, params }) {
    console.log(params.dir)
    response.download(Helpers.appRoot(`public/profilePhotos/${params.dir}`))
  }


  /**
   * Display a single store.
   * GET stores/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing store.
   * GET stores/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update store details.
   * PUT or PATCH stores/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a store with id.
   * DELETE stores/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
  }
}

module.exports = StoreController
