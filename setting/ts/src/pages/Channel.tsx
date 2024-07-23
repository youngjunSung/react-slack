import React, { useState, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import WorkSpace from '../layouts/WorkSpace';

const Channel = () => {
  const location = useLocation();
  console.log(location)
  return (
    <WorkSpace>
      <p>채널 영역</p>
    </WorkSpace>
  );
};

export default Channel;
