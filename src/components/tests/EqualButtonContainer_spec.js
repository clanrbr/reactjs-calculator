import React from 'react'
import { shallow } from 'enzyme'
import EqualButtonContainer from '../EqualButtonContainer'
import Button from '../common/Button'

describe('EqualButtonContainer Component', () => {
  let wrapper
  beforeEach(() => {
    wrapper = shallow(<EqualButtonContainer />)
  })

  context('Default behaviour',() => {
    it('should render the Button component', () => {
      expect(wrapper.find(Button)).have.length(1)
    })
  })
})
