import React from 'react'
import { shallow } from 'enzyme'
import OperationButtonContainer from '../OperationButtonContainer'
import Button from '../common/Button'

const sandbox = sinon.createSandbox()
describe('OperationButtonContainer Component', () => {
  let wrapper, props, btnHandler
  beforeEach(() => {
    btnHandler = sandbox.stub()
    props = {
      btnHandler,
      activeButton: 'minus'
    }

    wrapper = shallow(<OperationButtonContainer {...props} />)
  })

  afterEach(() => {
    sandbox.restore()
  })

  context('Default behaviour',() => {
    it('should render the 4 operation buttons', () => {
      expect(wrapper.find(Button)).have.length(4)
    })

    it('should return props for selected button', () => {
      expect(wrapper.find(Button).at(1).props()).to.deep.equal({
        btnHandler,
        btnClass: 'btn-info mr-2',
        btnValue: 'minus'
      })
    })

    it('should return props for non selected button', () => {
      expect(wrapper.find(Button).at(0).props()).to.deep.equal({
        btnHandler,
        btnClass: 'btn-primary mr-2 btn-circle',
        btnValue: 'plus'
      })
    })
  })
})
