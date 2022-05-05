import styled from 'styled-components/macro';
// import { Theme, sizes } from './Theme';

const Input = styled.input`
color: #000;
background: #fff;
width: 30%;
border-radius:10px;
height: 30px;
`;

const Select = styled.select`
width: 180px;
height: 60px;
background: #E5E5E5;
border: 2px solid #AFA9A9;
box-sizing: border-box;
box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;

const InputTextArea = styled.textarea`
  font-family: "Helvetica";
  font-size: 16px;
`;

const InputText = styled.input`
  width: 90%;
  height: 30px;
  font-family: "Helvetica";
  font-size: 16px;
`;

const DrugInput = styled(Input)`
  width: 200px;
  font-family: "Helvetica";
  font-size: 16px;
`;

const LimitInput = styled(Input)`
  width: 60px;
  font-family: "Helvetica";
  font-size: 16px;
  text-align: center;
  text-align-last: center;
`;

const DirectionInput = styled(Input)`
  width: 80%;
`;

const FrequencyInput = styled(Input)`
  width: 200px;
`;

const QuantityInput = styled(Input)`
  width: 200px;
`;

export {
  Input, Select, DirectionInput,
  InputTextArea, InputText, FrequencyInput,
  DrugInput, LimitInput, QuantityInput,
};
