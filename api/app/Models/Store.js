'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Store extends Model {
  
  static hidden = ['created_at', 'updated_at']

  static get fillable() {
    return ['_id','city', 'percentage', 'currency','empleyersNumber', 'vatNumber','postalCode','pais','region', 'email','legalStructure', 'country', 'username', 'name', 'nif', 'phone', 'file']
  }
  static fieldValidationRules() {
    return {
      percentage: 'required',
      currency: 'string|required',
      vatNumber: 'string|max:255',
      region: 'required|string',
      pais: 'required|string',
      postalCode: 'required|string|max:10',
      city: 'required|string',
      legalStructure: 'required|string',
      country: 'required|string',
      empleyersNumber: 'required|string',
      file: 'string',
      phone: 'required|string',
      nif: 'string|string',
      username: 'required|string',
      name: 'string|string',
      email: 'string|email',
      _id: 'string'
    }
  }
}

module.exports = Store
