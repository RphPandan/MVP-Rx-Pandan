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
  height: 100em;
  width: 100%;
  justify-content: center;

`;
const EmptyBoxes = styled(ColumnContainer)`
  max-width: 15%;
`;
const AppContainer = styled(ColumnContainer)`
  max-width: 100em;
  min-width: 50em;
  height: 100em;
  align-self: center;
  align-items: center;
`;

const Header = styled(RowContainer)`
  font-size:50px;
`;

const Button = styled(Theme)`

`;

export {
  Header, AlignmentWrapper,
  ColumnContainer, RowContainer,
  BigContainer, EmptyBoxes,
  AppContainer, Button,
};
