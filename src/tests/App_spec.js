import React from 'react'
import { shallow } from 'enzyme'
import App from '../App'
import Calculator from '../components/Calculator'

const sandbox = sinon.createSandbox()
describe('App Component', () => {
  let wrapper
  beforeEach(() => {
    wrapper = shallow(<App />)
  })
  it('should render the Calculator', () => {
    expect(wrapper.find(Calculator)).have.length(1)
  })
})