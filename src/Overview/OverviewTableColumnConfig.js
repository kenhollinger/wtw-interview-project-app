import React from 'react';

import EditButton from './EditButton';

export const overviewTableColumnConfig = [
  {
    label: 'Agent Id',
    dataKey: 'agentId',
    width: 100,
    cellRenderer: (rowData) => rowData.agentId,
  },
  {
    label: 'First Name',
    dataKey: 'firstName',
    width: 100,
    cellRenderer: (rowData) => rowData.firstName,
  },
  {
    label: 'Last Name',
    dataKey: 'lastName',
    width: 100,
    cellRenderer: (rowData) => rowData.lastName,
  },
  {
    label: 'Status',
    dataKey: 'status',
    width: 100,
    cellRenderer: (rowData) => rowData.status=== 1 ? 'Active' : rowData.status=== 2 ? 'InProgress': 'Inactive',
  },
  {
    label: '',
    dataKey: 'personId',
    width: 100,
    cellRenderer: (rowData) => <EditButton personId={rowData.agentId} />,
  },
];
