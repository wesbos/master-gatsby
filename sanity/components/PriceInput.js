import React from 'react';
import PatchEvent, { set, unset } from 'part:@sanity/form-builder/patch-event';

const createPatchFrom = value =>
  PatchEvent.from(value === '' ? unset() : set(Number(value)));

const formatMoney = Intl.NumberFormat('en-CA', {
  style: 'currency',
  currency: 'CAD',
}).format;

export default function PriceInput({ type, value, onChange, inputComponent }) {
  return (
    <div>
      <h2>
        {type.title} {formatMoney(value / 100)}
      </h2>
      <p>{type.description}.</p>
      <input
        type="number"
        value={value}
        onChange={event => onChange(createPatchFrom(event.target.value))}
        ref={inputComponent}
      />
    </div>
  );
}

// this is called by the form builder whenever this input should receive focus
PriceInput.focus = function() {
  this._inputElement.focus();
};
