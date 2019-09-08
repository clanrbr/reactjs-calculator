import React from 'react'
import PropTypes from 'prop-types'

const Input = ({ onChange, inputPlaceholder, inputName, inputValue, inputReadOnly, inputType }) => (
  <input
    onChange={onChange}
    name={inputName}
    placeholder={inputPlaceholder}
    type={inputType}
    value={inputValue}
    className='form-control'
    readOnly={inputReadOnly} />
)

const { string, number, func, bool } = PropTypes

Input.propTypes = {
  inputPlaceholder: string.isRequired,
  inputName: string.isRequired,
  inputType: string,
  inputValue: PropTypes.oneOfType([string, number]),
  onChange: func,
  inputReadOnly: bool
}

export default Input
