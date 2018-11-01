

describe('should断言： ok', ()=>{
  it('NaN不为true', ()=>{
    (NaN).should.not.be.ok
  })
  
  it('1为true', ()=>{
    (1).should.be.ok
  })
})