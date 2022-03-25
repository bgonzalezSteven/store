'use strict'

/** @type {import('@adonisjs/framework/src/Hash')} */
const Hash = use('Hash')

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class User extends Model {
  
  static hidden = ['created_at', 'updated_at']

  static get fillable() {
    return ['username', 'password', 'typeOfRegister', 'email']
  }
  static fieldValidationRules() {
    return {
      username: 'required|string',
      password: 'required|string',
      typeOfRegister: 'string|string',
      email: 'string|email',
      _id: 'string'
    }
  }
  static boot () {
    super.boot()
    /**
     * A hook to hash the user password before saving
     * it to the database.
     */
    this.addHook('beforeSave', async (userInstance) => {
      if (userInstance.dirty.password) {
        userInstance.password = await Hash.make(userInstance.password)
      }
    })
  }

  /**
   * A relationship on tokens is required for auth to
   * work. Since features like `refreshTokens` or
   * `rememberToken` will be saved inside the
   * tokens table.
   *
   * @method tokens
   *
   * @return {Object}
   */
  tokens () {
    return this.hasMany('App/Models/Token')
  }
}

module.exports = User
