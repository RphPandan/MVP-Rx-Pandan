import styled from 'styled-components/macro';
import { FaLeaf, FaPrescription } from 'react-icons/fa';
import { MdClose } from 'react-icons/md';
import { GrAdd } from 'react-icons/gr';

const LeafIcon = styled(FaLeaf)`
  width: 80px;
  height: 80px;
  padding: 10px;
  color: green;
`;
const RxIcon = styled(FaPrescription)`
  width: 80px;
  height: 80px;
  padding: 10px;
  color: white;
`;

const CloseModalButton = styled(MdClose)`
  cursor: pointer;
  width: 32px;
  height: 32px;
  padding: 0;
`;

const AddRx = styled(GrAdd)`
  height: 40px;
  width: 40px;
`;

export {
  LeafIcon, CloseModalButton,
  AddRx, RxIcon,
};
