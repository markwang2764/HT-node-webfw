require('should')
var merge = require('./merge.js')
it("should success", function(){
  var a = {
    name: 'Fundebug',
    type: 'Saa5'
  }
  var b = {
    service: 'real time bun monitoring',
    product: {
      fronted: 'javascript',
      backend: 'node.js',
      mobile: '测试'
    }
  }
  var c = merge(a,b)
  c.should.have.property('name',"Fundebug")
  c.should.have.propertyByPath('product',"fronted").equal('javascript')
})
it("should return undefind", function(){
  var a = {
    name: 'fundebug',
    type: 'saas'
  }
  var c = merge(a)
  (typeof c).should.equal('undefind')
})