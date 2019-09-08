import React from 'react'
import { shallow } from 'enzyme'
import MemoryResultsContainer from '../MemoryResultsContainer'
import Input from '../common/Input'

const sandbox = sinon.createSandbox()
describe('MemoryResultsContainer Component', () => {
  let wrapper, props, loadCalculation
  beforeEach(() => {
    loadCalculation = sandbox.stub()
  })

  afterEach(() => {
    sandbox.restore()
  })

  context('When there is no memory results',() => {
    beforeEach(() => {
      props = {
        loadCalculation,
        memoryResults: []
      }

      wrapper = shallow(<MemoryResultsContainer {...props} />)
    })

    it('should not show the memory results list', () => {
      expect(wrapper.find('ul')).have.length(0)
    })
  })

  context('When there is saved memory results',() => {
    let instance
    beforeEach(() => {
      props = {
        loadCalculation,
        memoryResults: [{
          inputOne: '1',
          inputTwo: '2',
          operation: 'plus',
          result: '3'
        }, {
          inputOne: '3',
          inputTwo: '2',
          operation: 'minus',
          result: '1'
        }]
      }

      wrapper = shallow(<MemoryResultsContainer {...props} />)
      instance = wrapper.instance()
    })

    it('should show the memory results list', () => {
      expect(wrapper.find('ul')).have.length(1)
    })

    it('should show the two results', () => {
      expect(wrapper.find('li')).have.length(2)
    })

    it('should show formatted texts', () => {
      expect(wrapper.find('ul').text()).to.contain('1 + 2 = 3')
      expect(wrapper.find('ul').text()).to.contain('3 - 2 = 1')
    })
  })
})
