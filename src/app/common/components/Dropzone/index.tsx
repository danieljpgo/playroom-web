import React, { useCallback, useState, memo } from 'react';
import { useDropzone } from 'react-dropzone';
import { FiUpload as Icon } from 'react-icons/fi';
import './styles.css';

interface Props {
  onFileUploaded: (file: File) => void;
}

const defaultProps = {
  onFileUploaded: () => null,
};

const Dropzone: React.FC<Props> = (props) => {
  const { onFileUploaded } = props;

  const [selectedFileUrl, setSelectedFileUrl] = useState<string>('');

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
              <span>
                { isDragActive ? 'Solte o arquivo aqui :)' : 'Imagem do local de coleta' }
              </span>
            </p>
          )
      }
    </div>
  );
};

Dropzone.defaultProps = defaultProps;

export default memo(Dropzone);
