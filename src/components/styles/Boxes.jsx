import styled from 'styled-components/macro';
import { Theme, sizes } from './Theme';

const AlignmentWrapper = styled(Theme)`
  margin: ${(props) => props.margin || sizes.m};
  padding: ${(props) => props.padding || null};
`;

const ColumnContainer = styled(Theme)`
  display: flex;
  flex-direction: column;
  row-gap: ${(props) => props.rowGap || null};
  column-gap: ${(props) => props.columnGap || null};
  padding: ${(props) => sizes[props.padding] || null};
  margin: ${(props) => sizes[props.margin] || null};
`;

const RowContainer = styled(ColumnContainer)`
  flex-direction: row;
`;

const BigContainer = styled(RowContainer)`
  width: 100%;
  align-items: center;
  justify-content: center;

`;
const EmptyBoxes = styled(ColumnContainer)`
  max-width: 15%;
`;
const AppContainer = styled(ColumnContainer)`
  max-width: 70%;
  align-self: center;
`;

export {
  AlignmentWrapper, ColumnContainer, RowContainer, BigContainer, EmptyBoxes, AppContainer,
};
