import React from 'react';
import { useParams } from 'react-router-dom';
import { Follow } from '../components/index';

function Following() {
  const { username } = useParams();
  return (
    <div className="w-full">
      <Follow type="following" username={username} />
    </div>
  );
}

export default Following;
