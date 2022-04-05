'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class PaymentMethod extends Model {
  static hidden = ['created_at', 'updated_at', 'bussine_id']
  
  static get fillable() {
    return ['_id','name', 'description']
  }
  static fieldValidationRules() {
    return {
      description: 'string|required',
      name: 'string|required',
      _id: 'string'
    }
  }
}

module.exports = PaymentMethod
