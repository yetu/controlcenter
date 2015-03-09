var cx = require('react/lib/cx');

function ccFormInput (locals) {
  var formGroupClasses = {
    'cc-form-item': true,
    'cc-form-item--error': locals.hasError
  };

  var inputClasses = {
    'cc-form-item__input': true,
    'cc-form-item__input--error': locals.error
  };

  return (
    <div className={cx(formGroupClasses)}>
      {
        locals.label ?
          <div className='cc-form-item__label-container'>
            <label for='right-label' className='cc-form-item__label'>{locals.label}</label>
          </div> : null
        }

      <div className='cc-form-item__input-container'>
        <input
          disabled={locals.disabled}
          className={cx(inputClasses)}
          name={locals.name}
          placeholder={locals.label}
          onChange={(evt) => {
            locals.onChange(evt.target.value);
          }}
          type={locals.type}
          value={locals.value} />
      </div>
    </div>
  );
}

module.exports = ccFormInput;
