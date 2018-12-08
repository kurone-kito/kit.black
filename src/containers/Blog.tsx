import React from 'react';
import { Link, withRouteData } from 'react-static';
import { IPost } from '~/types';

interface IProps {
  posts: IPost[];
}

const renderItems: ((posts: IPost[]) => React.ReactNodeArray) =
  (posts: IPost[]): React.ReactNodeArray =>
    posts.map((post: IPost) => (
      <li key={post.id}>
        <Link to={`/blog/post/${post.id}/`}>{post.title}</Link>
      </li>
    ));

export default withRouteData(({ posts }: IProps) => (
  <div>
    <h1>It's blog time.</h1>
    <br />
    All Posts:
    <ul>
      {renderItems(posts)}
    </ul>
  </div>
));
