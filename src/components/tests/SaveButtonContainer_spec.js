import React from 'react'
import { shallow } from 'enzyme'
import SaveButtonContainer from '../SaveButtonContainer'
import Button from '../common/Button'

const sandbox = sinon.createSandbox()
describe('SaveButtonContainer Component', () => {
  let wrapper, props, btnHandler
  beforeEach(() => {
    btnHandler = sandbox.stub
    props = {
      btnHandler,
      enableButton: true,
      inputValue: '4',
    }

    wrapper = shallow(<SaveButtonContainer {...props} />)
  })

  afterEach(() => {
    sandbox.restore()
  })

  context('Default behaviour',() => {
    it('should render the Button component', () => {
      expect(wrapper.find(Button)).have.length(1)
    })

    it('should check for Button correct props', () => {
      expect(wrapper.find(Button).props()).to.deep.equal({
        btnHandler,
        btnClass: 'btn-success btn-block',
        btnValue: 'save',
        btnText: 'Save',
        disabled: false
      })
    })
  })
})
