import React from 'react';
import PatchEvent, { set, unset } from 'part:@sanity/form-builder/patch-event';
import PropTypes from 'prop-types';

const createPatchFrom = (value) =>
  PatchEvent.from(value === '' ? unset() : set(Number(value)));

const formatMoney = Intl.NumberFormat('be-nl', {
  style: 'currency',
  currency: 'EUR',
}).format;

const PriceInput = ({ type, value, onChange, inputComponent }) => (
  <div>
    <h2>
      {type.title} - {value && formatMoney(value / 100)}
    </h2>
    <p>{type.description}</p>
    <input
      type={type.name}
      value={value}
      onChange={(event) => onChange(createPatchFrom(event.target.value))}
      ref={inputComponent}
    />
  </div>
);

PriceInput.focus = () => this._inputElement.focus();
export default PriceInput;

PriceInput.propTypes = {
  type: PropTypes.object,
  value: PropTypes.number,
  onChange: PropTypes.func,
  inputComponent: PropTypes.element,
};
