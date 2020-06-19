import React, { useState, useEffect, memo } from 'react';
import Skeleton from '../../../../common/components/Skeleton';
import './styles.css';

interface Props {
  id: number;
  title?: string;
  imageUrl?: string;
  loading?: boolean;
  selected?: boolean;
  onSelect: (id: number) => void;
}

const Item: React.FC<Props> = (props) => {
  const {
    id,
    title,
    imageUrl,
    loading,
    selected,
    onSelect,
  } = props;

  const [show, setShow] = useState<boolean>(false);

  useEffect(() => {
    const image = new Image();
    image.src = imageUrl || '';
    image.onload = () => setShow(true);
  }, [imageUrl]);

  return (
    <li
      className={selected ? 'selected' : ''}
      onClick={() => onSelect(id)}
    >
      { show
        ? (<img src={imageUrl} alt={title} />)
        : (<Skeleton height={64} width={80} />)}
      <span>{loading ? (<Skeleton height={20} width={80} />) : title}</span>
    </li>
  );
};

export default memo(Item);
