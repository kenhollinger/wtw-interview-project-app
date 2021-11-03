import React from 'react'
import styled from 'styled-components';
import { useLocation } from 'react-router';
import queryString from 'query-string';
import { createHashHistory } from 'history';
import { detailTableColumnConfig } from './DetailTableColumnConfig';


const NameH1 = styled.h1`
  padding: 22px 0 22px 0px;
  text-align: center;
  margin: 0 auto;
  font-weight: bold;
  font-size: 30px;
`;
const SaveChangesButton = styled.button`
  background-color: #e7e7e7;
  color: black;
  border: none;
  padding: 12px 28px;
  text-align: center;
  border-radius: 8px;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: auto;
  display: flex;
  cursor: pointer;
  box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19);
  &:hover {
    background-color: #a6a6a6;
  }
  &:active {
    background-color: #a6a6a6;
    box-shadow: 0 5px #666;
    transform: translateY(4px);
  }
`;
const StyledTableRowDiv = styled.div`
  display: flex;
  flex-direction: row;
  border-bottom: 1px solid gray;
  padding: 0 0 10px 10px;
  width: fit-content;
  text-align: left;
  margin: 0 auto;
  background-color: ${props => props.backgroundColor}
`;
const StyledTableHeaderDiv = styled(StyledTableRowDiv)`
  border-bottom: 1px solid black;
  font-weight: bold;
  padding: 0 0 10px 10px;
`;
const StyledTableCellDiv = styled.div`
  width: ${props => props.width}px;
  min-width:${props => props.width}px;
  margin-top: 12px;
  margin-right: 15px;
`;
const StyledLine = styled.div`
  border-bottom: 1px solid black;
  font-weight: bold;
  padding: 0 0 44px 0px;
  width: 655px;
  margin: auto;
  display: flex;
`;

const history = createHashHistory();

async function fetchAgentDetailData(agentId) {
  return await fetch(`/GetAgentDetail?agentId=${agentId}`);
}

async function fetchAgentDetailPost(agentDetail) {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(agentDetail)
  };
  return await fetch('/UpdateAgentDetail', requestOptions);
}

async function saveChangesButtonClick(agentDetail) {
  await fetchAgentDetailPost(agentDetail);
  history.push(`/`);
};

function Row({ rowNumber, rowData, detailTableColumnConfig, hasAlternatingRowColors }) {
  return (
    <StyledTableRowDiv backgroundColor={hasAlternatingRowColors && rowNumber % 2 === 0 ? 'lightgray' : 'none'}>
      {
        detailTableColumnConfig.map((c, i) =>
          <StyledTableCellDiv key={i} width={c.width} >
            {c.cellRenderer(rowData)}
          </StyledTableCellDiv>
        )}
    </StyledTableRowDiv>
  );
}

function HeaderRow({ data, detailTableColumnConfig, idKey, hasAlternatingRowColors }) {
  return (
    <StyledTableHeaderDiv>
      {
        detailTableColumnConfig.map((c, i) =>
          <StyledTableCellDiv key={i} width={c.width} >
            {c.label}
          </StyledTableCellDiv>
        )}
    </StyledTableHeaderDiv>
  );
}

function Table({ licenses, detailTableColumnConfig, idKey, hasAlternatingRowColors }) {
  return (
    <>
      <HeaderRow detailTableColumnConfig={detailTableColumnConfig} />
      {licenses.map((d, i) =>
        <Row
          key={i}
          rowNumber={i + 1}
          rowData={d}
          detailTableColumnConfig={detailTableColumnConfig}
          hasAlternatingRowColors={hasAlternatingRowColors}
        />)}
      <StyledLine />
    </>
  );
}

function DetailPage() {
  const location = useLocation();
  const agentId = queryString.parse(location.search).id;
  const [agentDetail, setAgentDetail] = React.useState(null);

  React.useEffect(() => {
    async function getAgentDetailData(agentId) {
      const response = await fetchAgentDetailData(agentId)
      const data = await response.json();
      setAgentDetail(data);
    }
    getAgentDetailData(agentId);
  }, [agentId]);

  if (!agentDetail) return null;
  return (
    <>
      <NameH1>Licenses for {agentDetail.firstName} {agentDetail.lastName}</NameH1>
      <Table
        licenses={agentDetail.licenses}
        detailTableColumnConfig={detailTableColumnConfig}
        idKey="agentId"
        hasAlternatingRowColors
      />
      <div style={{ padding: 44 }}>
        <SaveChangesButton onClick={() => saveChangesButtonClick(agentDetail)}>Save Changes</SaveChangesButton>
      </div>
    </>
  );
}

export default DetailPage;
