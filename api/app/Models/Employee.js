'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Employee extends Model {
  static hidden = ['created_at', 'updated_at', 'bussine_id']
  
  static get fillable() {
    return ['_id','name','entryDate', 'lastname', 'nif', 'phone', 'email', 'workstation', 'percentage', 'neto']
  }
  static fieldValidationRules() {
    return {
      _id: 'string',
      name: 'string|required',
      lastname: 'string|required',
      nif: 'string|required',
      phone: 'string|required',
      email: 'string|required',
      workstation: 'string|required',
      percentage: 'integer',
      neto: 'string',
      entryDate: 'string',
      activate: 'boolean',
    }
  }
}

module.exports = Employee
