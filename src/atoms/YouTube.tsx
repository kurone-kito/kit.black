import React from 'react';

/** Type of properties. */
interface IProps {
  /** YouTube video id. */
  id: string;

  /** YouTube video title. */
  title?: string;
}

const component: React.FC<IProps> = ({ id, title }) => (
  <div className="kit-youtube">
    <iframe
      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen={true}
      frameBorder={0}
      width="560"
      height="315"
      src={`https://www.youtube.com/embed/${id}`}
      title={title}
    />
  </div>
);

component.defaultProps = { title: '' };
component.displayName = 'YouTube';

export default component;
