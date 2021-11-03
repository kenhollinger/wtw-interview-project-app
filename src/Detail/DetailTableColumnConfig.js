import React from 'react';
import SelectCheckbox from './SelectCheckbox';

export const detailTableColumnConfig = [
  {
    label: 'License Name',
    dataKey: 'licenseName',
    width: 200,
    cellRenderer: (rowData) => rowData.licenseName,
  },
  {
    label: 'Is Required',
    dataKey: 'isRequired',
    width: 200,
    cellRenderer: (rowData) => rowData.isRequired ? "Yes":"No",
  },
  {
    label: 'Verified',
    dataKey: 'selected',
    width: 200,
    cellRenderer: (rowData) => <SelectCheckbox license={rowData} />,
  }
];
