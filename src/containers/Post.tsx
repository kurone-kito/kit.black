import React from 'react';
import { Link, withRouteData } from 'react-static';
import { IPost } from '~/types';

interface IProps {
  post: IPost;
}

export default withRouteData(({ post }: IProps): React.ReactElement<{}> => (
  <div>
    <Link to="/blog/">&lt; Back</Link>
    <br />
    <h3>{post.title}</h3>
    <p>{post.body}</p>
  </div>
));
