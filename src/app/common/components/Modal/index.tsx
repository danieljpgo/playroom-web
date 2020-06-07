import React from 'react';
import { FiCheckCircle } from 'react-icons/fi';
import './styles.css';

interface Props {
  show: boolean,
}

const Modal: React.FC<Props> = (props) => {
  const { show } = props;

  const showHideClassName = show ? 'modal display-block' : 'modal display-none';

  return (
    <div className={showHideClassName}>
      <div className="modal-main">
        <FiCheckCircle size={100} color="#ffffff" />
        <h1>Cadastro concluído!</h1>
      </div>
    </div>
  );
};

// size?: string | number;
// color?: string;
// title?: string;

Modal.defaultProps = {
  show: false,
};

export default Modal;
