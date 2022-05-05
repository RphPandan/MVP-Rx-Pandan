import styled from 'styled-components/macro';
import { Theme } from './Theme';

const Title = styled(Theme)`
  font-size: 50px;
  padding: 10px;
`;

const MainTitle = styled(Title)`
  display: flex;
  flex-direction: row;
  align-items: center;

`;

const Title2 = styled(Theme)`
  font-size:42px;
  padding: 10px;
`;

const Header3 = styled(Theme)`
  font-size: 32px;
  padding: 10px;
`;

const Header4 = styled(Theme)`
  font-size: 24px;
  padding: 10px;
`;

const Text = styled(Theme)`
  font-size:12px;
`;

const Text2 = styled(Theme)`
  font-size: 20px;
`;
export {
  Title, Title2,
  Text, Header3, Text2,
  Header4, MainTitle,
};
