var request = require('supertest')
const should = require('should')

it("should return success",function(done){
  request('http://120.78.139.243')
          .post('/admin/login')
          .send({
            name: 'ww',
            password:  "ww"
          })
          .expect(200)
          .expect(function (res) {
            var data = res.body
            console.log(data)
            data.name.should.equal('ww')
          })
          .end(done)
})