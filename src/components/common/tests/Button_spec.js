import React from 'react'
import { shallow } from 'enzyme'
import Button from '../button'

const sandbox = sinon.createSandbox()
describe('Button Component', () => {
  let wrapper, props, btnHandler
  beforeEach(() => {
    btnHandler = sandbox.stub()

    props = {
      btnHandler, 
      btnClass: 'btn-primary',
      btnValue: 'plus', 
      disabled: false, 
      btnText: '4'
    }
    wrapper = shallow(<Button {...props}/>)
  })

  afterEach(() => {
    sandbox.restore()
  })

  context('Default behaviour',() => {
    it('should render the button', () => {
      expect(wrapper.find('button')).to.have.length(1)
    })

    it('should contains classes', () => {
      expect(wrapper.find('.btn-primary')).to.have.length(1)
    })

    it('should contains data-value', () => {
      expect(wrapper.find('button').prop('data-value')).to.equal('plus')
    })

    it('should execute onClick event', () => {
      wrapper.find('button').simulate('click');
      expect(btnHandler).to.have.been.called()
    })
  })
})
