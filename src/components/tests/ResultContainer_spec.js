import React from 'react'
import { shallow } from 'enzyme'
import ResultContainer from '../ResultContainer'
import Input from '../common/Input'

describe('ResultContainer Component', () => {
  let wrapper, props
  beforeEach(() => {
    props = {
      inputValue: '4',
    }

    wrapper = shallow(<ResultContainer {...props} />)
  })

  context('Default behaviour',() => {
    it('should render the Input component', () => {
      expect(wrapper.find(Input)).have.length(1)
    })

    it('should check for Input correct props', () => {
      expect(wrapper.find(Input).props()).to.deep.equal({
        inputValue: '4',
        inputType: 'text',
        inputPlaceholder: 'result',
        inputName: 'result',
        inputReadOnly: true
      })
    })
  })
})
