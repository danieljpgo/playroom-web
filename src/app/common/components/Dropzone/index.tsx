import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { FiUpload as Icon } from 'react-icons/fi';
import './styles.css';

interface Props {
  onFileUploaded: (file: File) => void;
}

const Dropzone: React.FC<Props> = (props) => {
  const { onFileUploaded } = props;

  const [selectedFileUrl, setSelectedFileUrl] = useState('');

  const onDrop = useCallback((selectedFiles) => {
    const file = selectedFiles[0];
    const fileUrl = URL.createObjectURL(file);
    setSelectedFileUrl(fileUrl);
    onFileUploaded(file);
  }, [onFileUploaded]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, accept: 'image/*' });

  return (
    <div className="dropzone" {...getRootProps()}>
      <input accept="image/*" {...getInputProps()} />
      {
        selectedFileUrl
          ? <img src={selectedFileUrl} alt="Point thumbnail" />
          : (
            <p>
              <Icon />
              { isDragActive ? 'Solte o arquivo' : 'Imagem do estabelecimento' }
            </p>
          )
      }
    </div>
  );
};

export default Dropzone;
