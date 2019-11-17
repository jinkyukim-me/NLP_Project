import React from 'react';
import 'antd/dist/antd.css';
import './index.css';
import { Popconfirm, message } from 'antd';

function confirm(e) {
  console.log(e);
  message.success('Click on Yes');
}

function cancel(e) {
  console.log(e);
  message.error('Click on No');
}

  render(
      <Popconfirm
        title="저장하시겠습니까?"
        onConfirm={confirm}
        onCancel={cancel}
        okText="저장"
        cancelText="취소"
      >
        <a href="#">저장</a>
      </Popconfirm>
    )
  