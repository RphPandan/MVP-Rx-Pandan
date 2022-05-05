import styled from 'styled-components/macro';
import { ColumnContainer, RowContainer } from './Boxes';

const OverviewContainer = styled(ColumnContainer)`
  height: 80em;
  width: 80em;
  min-width: 60em;
  border-radius: 12px;
  padding: 10px;
  margin: 10px;
`;

const OverviewRow = styled(RowContainer)`
  position: relative;
  justify-content: flex-start;
  align-items: center;
  border-radius: 12px;
  margin: 10px;
  padding: 10px;
`;

export { OverviewContainer, OverviewRow };
