import React from 'react'
import Input from './common/Input'
import PropTypes from 'prop-types'

const ResultContainer = ({ inputValue }) => {
  const inputProps = {
    inputValue,
    inputType: 'text',
    inputPlaceholder: 'result',
    inputName: 'result',
    inputReadOnly: true
  }

  return (
    <div className='justify-content-md-center row'>
      <div className='text-center mt-2 col-sm-4'>
        <Input {...inputProps} />
      </div>
    </div>
  )
}

const { string, number } = PropTypes

ResultContainer.propTypes = {
  inputValue: PropTypes.oneOfType([string, number])
}

export default ResultContainer
