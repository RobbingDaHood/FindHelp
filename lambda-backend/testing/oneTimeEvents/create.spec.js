'use strict'

const create = require('./../../oneTimeEvents/create.js')
const expect = require('chai').expect

describe('OneTimeEvents module', () => {
  describe('"create"', () => {
    it('should export a function', () => {
      expect(create.main).to.be.a('function')
    })
  })
})
