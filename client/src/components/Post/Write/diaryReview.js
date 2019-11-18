import React from 'react';
import 'antd/dist/antd.css';
import './index.css';
import { Result, Button } from 'antd';

render(
  <Result
    date="쓴 날짜"
    data
    title="일기 본문 보여지도록..."
    extra={<Button type="primary">'읽기'로
    </Button>}
  />
);
          