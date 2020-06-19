import React from 'react';
import './styles.css';

interface Props {
  height?: number,
  width?: number,
}

const defaultProps = {
  height: 100,
  width: 100,
};

const Skeleton: React.FC<Props> = (props) => {
  const { height, width } = props;

  return (
    <div
      className="skeleton"
      style={{ height: `${height}px`, width: `${width}px` }}
    >
      <div />
    </div>
  );
};

Skeleton.defaultProps = defaultProps;

export default Skeleton;
