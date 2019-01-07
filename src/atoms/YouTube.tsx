import React from 'react';

/** Type of properties. */
interface IProps {
  /** YouTube video id. */
  id: string;
}

const component: React.FC<IProps> = ({ id }: IProps): React.ReactElement<IProps> => (
  <div className="kit-youtube">
    <iframe
      allowFullScreen={true}
      width="560"
      height="315"
      src={`https://www.youtube.com/embed/${id}`}
      frameBorder={0}
      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
    />
  </div>
);

component.displayName = 'YouTube';

export default component;
