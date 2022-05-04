import styled from 'styled-components/macro';
import { Theme } from './Theme';

const Title = styled.h1`
${Theme}
  font-size: 50px;
`;

const Title2 = styled.h2`
  ${Theme}
  font-size:24px;
`;

const Text = styled.p`
  font-size:12px;
`;
export { Title, Title2, Text };
