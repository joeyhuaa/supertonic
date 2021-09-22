import React from 'react';
import IconClickable from './IconClickable';
import PropTypes from 'prop-types';

const FancyFileInput = ({ 
  onChange = () => {}, // ! not working... onChange defaulting to null
  icon,
  multiple = false,
  accept = '*',
  className,
  label = '',
}) => {

  const handleChange = event => {
    const files = event.target.files;
    onChange(files, event);
  }

  return (
    <div id='fancy-file-input' className={className} style={{ display: 'flex' }}>
      <input 
        id='file' 
        style={{ display: 'none' }}
        type='file' 
        multiple={multiple} 
        onChange={handleChange} 
        accept={accept} 
      />
      <label htmlFor='file'>
        <IconClickable icon={icon} />
        {label}
      </label>
    </div>
  )
}

FancyFileInput.propTypes = {
  onChange: PropTypes.func.isRequired,
  icon: PropTypes.element.isRequired,
  multiple: PropTypes.bool,
  accept: PropTypes.string,
  className: PropTypes.string,
}

export default FancyFileInput;

