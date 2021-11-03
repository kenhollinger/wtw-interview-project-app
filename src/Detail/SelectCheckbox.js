import React from 'react';

const SelectCheckbox = ({license}) =>
  <input defaultChecked={license.selected} onClick={()=>license.selected = license.selected===false} type="checkbox" />
export default SelectCheckbox;
