'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Tax extends Model {
  static hidden = ['created_at', 'updated_at', 'bussine_id']
  
  static get fillable() {
    return ['_id','name', 'description', 'price']
  }
  static fieldValidationRules() {
    return {
      price: 'required|integer',
      description: 'string|required',
      name: 'string|required',
      _id: 'string'
    }
  }
}

module.exports = Tax
