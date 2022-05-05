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
  min-width:80em;
  height: 100em;
`;

const Header = styled(RowContainer)`
  font-size:50px;
  padding: 10px;
  border-radius: 12px;
`;

const HeaderRow = styled(RowContainer)`
  justify-content: space-between;
  align-items: center;
  padding: 15px 0 15px 0;
  border-radius: 12px;
`;

const MainHeader = styled(RowContainer)`
  justify-content: space-between;
  align-content: space-around;
  align-items: center;
  min-height: 100px;
  /* background-color: #3e3e3e; */
  border-radius: 20px;
  margin: 10px 0 10px 0;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;

const ButtonTheme = styled.button`
  color:  ${(props) => {
    if (props.primary) {
      return '#3e3e3e';
    }
    if (props.secondary) {
      return '#fffffff0';
    }
    return '#3e3e3e';
  }};
  background-color: ${(props) => {
    if (props.primary) {
      return '#fffffff0';
    }
    if (props.secondary) {
      return '#3e3e3e';
    }
    return '#fffffff0';
  }};
    text-decoration: ${(props) => {
    let decoration = '';
    if (props.line_through) {
      decoration += 'line-through';
    }
    if (props.underline) {
      decoration += 'underline';
    }
    if (props.overline) {
      decoration += 'overline';
    }
    return decoration;
  }};
  font-style: ${(props) => { const italic = props.italic ? 'italic' : null; return italic; }};
  border: ${(props) => {
    let border;
    if (props.border) {
      border = '2px solid #3e3e3e';
    }
    return border;
  }};
  font-family: "Helvetica";
  &:hover {
  transition-duration: .3s;
  transform: scale(1.05);
  background-color: '#3e3e3e';
  color: '#fffffff0';
  };
`;

const Button = styled(ButtonTheme)`
  border: 2px solid #000;
  border-radius: 12px;
  &:hover {
    transition-duration: .3s;
    transform: scale(1.1);
    background: #3e3e3e;
    color: #e4e4e4;
  };
`;

const ModalBackground = styled(RowContainer)`
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  position: fixed;
  top: 0%;
  right: 0%;
  bottom: 0%;
  left: 0%;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  align-content: flex-start;
  opacity: ${(props) => { const opacity = props.isRender ? 1 : 0; return opacity; }};
  transition: opacity 0.6s linear;
`;

const CloseButton = styled(Button)`
  position: absolute;
  right: 10px;
  border-radius: 12px;
`;
export {
  Header, AlignmentWrapper,
  ColumnContainer, RowContainer,
  BigContainer, EmptyBoxes,
  AppContainer, Button, CloseButton,
  MainHeader, ModalBackground,
  HeaderRow,
};
