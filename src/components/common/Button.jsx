import React from 'react'
import PropTypes from 'prop-types'

const Button = ({ btnHandler, btnClass, btnValue, disabled, btnText }) => (
  <button 
    onClick={btnHandler} 
    type='button' 
    data-value={btnValue} 
    disabled={disabled} 
    className={`btn ${btnClass}`}
  >
    {btnText}
    { !btnText && <i className={`fa fa-${btnValue}`}></i> }
  </button>
)

const { string, func, bool } = PropTypes

Button.propTypes = {
  btnClass: string.isRequired,
  btnValue: string.isRequired,
  btnHandler: func,
  disabled: bool
}

export default Button
