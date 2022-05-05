import styled from 'styled-components/macro';

const colors = {
  primary: '#30323a',
  secondary: '#fdfdfdef',
  warning: '#da5050dc',
  accent: '#9bbaeb',
  other: '#8D93AB',
  main: '#f5f5f5',
  text: '#121212',
};

const sizes = {
  xs: '2px',
  sm: '5px',
  m: '10px',
  xm: '15px',
  l: '20px',
  xl: '25px',
};

const Theme = styled.div`
  font-family: "Helvitca", sans-serif;

  ${(props) => {
    if (props.inverted) {
      [colors.primary, colors.secondary] = [colors.secondary, colors.primary];
    }
  }}


  background: ${(props) => colors[props.background] || colors.secondary};
  color: ${(props) => colors[props.color] || colors.primary};

  border: ${(props) => (props.border ? `2px solid ${colors.primary}` : null)};

  /* opacity: ${(props) => (props.opacity ? 1 : 0)};

  transition: opacity 0.2s ease-out;

  @keyframes rollout {
  0% { transform: translateY(-100px); }
  100% { transform: none; }
  }

.roll-out {
  animation: rollout 0.4s;
} */

`;

export { Theme, sizes, colors };
