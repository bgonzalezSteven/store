'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Customer extends Model {
  
  static hidden = ['created_at', 'updated_at', 'bussine_id']
}

module.exports = Customer
