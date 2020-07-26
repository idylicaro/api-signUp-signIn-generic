import sut from './phone-validator'

describe('Phone Validator', () => {
  test('Should returns true in this case (xx) xxxxx-xxxx ', () => {
    expect(sut.isPhone('(16) 91231-6165')).toBe(true)
  })
  test('Should returns true in this case (xx) xxxx-xxxx ', () => {
    expect(sut.isPhone('(16) 3231-6165')).toBe(true)
  })
  test('Should call formatter if false is first time and have correctly length ', () => {
    expect(sut.isPhone('79999632212')).toBe(true)
  })
  test('Should call formatter if false is first time and have correctly length ', () => {
    expect(sut.isPhone('7959632212')).toBe(true)
  })
  test('Should returns false if phone length is 10 and first number after DDD is 0 or 1 or 9 ', () => {
    expect(sut.isPhone('7909632212')).toBe(false)
    expect(sut.isPhone('7919632212')).toBe(false)
    expect(sut.isPhone('7999632212')).toBe(false)
  })
})
