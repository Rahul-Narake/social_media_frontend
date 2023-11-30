import React from 'react';
import { useParams } from 'react-router-dom';
import { Follow } from '../components/index';

function Followers() {
  const { username } = useParams();
  return (
    <div className="w-full">
      <Follow type="followers" username={username} />
    </div>
  );
}

export default Followers;
