import React from 'react'
import { shallow } from 'enzyme'
import Input from '../Input'

const sandbox = sinon.createSandbox()
describe('Input Component', () => {
  let wrapper, props, onChangeHandler
  beforeEach(() => {
    onChangeHandler = sandbox.stub()

    props = {
      onChange: onChangeHandler,
      inputPlaceholder: 'field1',
      inputName: 'inputOne',
      inputValue: '1',
      inputReadOnly: false,
      inputType: 'number'
    }
    wrapper = shallow(<Input {...props}/>)
  })

  afterEach(() => {
    sandbox.restore()
  })

  context('Default behaviour',() => {
    it('should the input', () => {
      expect(wrapper.find('input')).to.have.length(1)
    })

    it('should contains name', () => {
      expect(wrapper.find('input').prop('name')).to.equal('inputOne')
    })

    it('should contains value', () => {
      expect(wrapper.find('input').props().value).to.equal('1')
    })

    it('should contains placeholder', () => {
      expect(wrapper.find('input').prop('placeholder')).to.equal('field1')
    })

    it('should execute onChange event', () => {
      const event = {target: {name: 'inputOne', value: '2'}};
      wrapper.find('input').simulate('change', event)
      expect(onChangeHandler).to.have.been.called()
    })
  })
})
