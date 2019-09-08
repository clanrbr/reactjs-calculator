import React from 'react'
import { shallow } from 'enzyme'
import InputContainer from '../InputContainer'
import Input from '../common/Input'

const sandbox = sinon.createSandbox()
describe('InputContainer Component', () => {
  let wrapper, props, handleNumberChange
  beforeEach(() => {
    handleNumberChange = sandbox.stub()

    props = {
      handleNumberChange,
      inputPlaceholder: 'inputOne',
      inputName: 'inputOne',
      defaultValue: '1'
    }

    wrapper = shallow(<InputContainer {...props} />)
  })

  afterEach(() => {
    sandbox.restore()
  })

  context('Default behaviour',() => {
    it('should render the Input component', () => {
      expect(wrapper.find(Input)).have.length(1)
    })

    it('should render the Input component with correct props', () => {
      expect(wrapper.find(Input).props()).to.deep.equal({
        inputName: 'inputOne',
        inputPlaceholder: 'inputOne',
        inputReadOnly: false,
        inputType: 'number',
        inputValue: '1',
        onChange: handleNumberChange
      })
    })
  })
})
