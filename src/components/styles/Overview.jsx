import styled from 'styled-components/macro';
import { ColumnContainer, RowContainer } from './Boxes';

const OverviewContainer = styled(ColumnContainer)`
  min-height: 80em;
  height: 100em;
  width: 80em;
  min-width: 60em;
  border-radius: 12px;
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
