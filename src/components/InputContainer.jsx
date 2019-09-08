import React from 'react'
import Input from './common/Input'
import PropTypes from 'prop-types'

const InputContainer = ({ handleNumberChange, inputPlaceholder, inputName, defaultValue }) => {
  const inputProps = {
    inputPlaceholder,
    inputName,
    inputValue: defaultValue,
    inputType: 'number',
    inputReadOnly: false,
    onChange: handleNumberChange,
  }

  return (
    <div className='justify-content-md-center row'>
      <div className='text-center mt-4 col-sm-4'>
        <Input {...inputProps} />
      </div>
    </div>
  )
}

const { string, func } = PropTypes

InputContainer.propTypes = {
  handleNumberChange: func.isRequired,
  inputPlaceholder: string.isRequired,
  inputName: string.isRequired
}

export default InputContainer
