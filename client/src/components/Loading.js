import React from 'react';
import { Spin, Alert } from 'antd';

render(
  <Spin tip="Loading...">
    <Alert
      message="서버 열일 중"
      description="잠시만 기다려주세요~~~"
      type="info"
    />
  </Spin>,
)