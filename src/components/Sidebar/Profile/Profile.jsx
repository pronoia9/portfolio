import React from 'react';
import Avatar from './Avatar';
import Name from './Name';
import Post from './Post';

export default function Profile() {
  return (
    <div className='art-header'>
      <Avatar />
      <Name />
      <Post />
    </div>
  );
}