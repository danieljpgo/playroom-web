import React from 'react';

interface Props {
  title: string,
  subtitle?: string
}

const defaultProps = {
  title: 'Untitle',
  subtitle: undefined,
};

const Fieldset: React.FC<Props> = (props) => {
  const { title, subtitle, children } = props;

  return (
    <fieldset>
      <legend>
        <h2>{title}</h2>
        {
          subtitle && (<span>{subtitle}</span>)
        }
      </legend>
      {children}
    </fieldset>
  );
};

Fieldset.defaultProps = defaultProps;

export default Fieldset;
