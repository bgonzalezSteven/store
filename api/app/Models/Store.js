'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Store extends Model {
  
  static hidden = ['created_at', 'updated_at']

  static get fillable() {
    return ['_id', 'email', 'username', 'direction', 'name', 'nif', 'phone', 'file']
  }
  static fieldValidationRules() {
    return {
      file: 'required|string',
      phone: 'required|string',
      nif: 'string|string',
      username: 'required|string',
      direction: 'required|string',
      name: 'string|string',
      email: 'string|email',
      _id: 'string'
    }
  }
}

module.exports = Store
