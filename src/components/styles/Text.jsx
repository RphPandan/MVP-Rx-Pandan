import styled from 'styled-components/macro';
import { Theme } from './Theme';

const Title = styled.h1`
${Theme}
  font-size: 30px;
`;

const Title2 = styled.h2`
  ${Theme}
  font-size:24px;
`;
export default { Title, Title2 };
