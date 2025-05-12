import React from 'react';
import { Card, Descriptions } from 'antd';

const CustomerInfo = ({ data }) => {
  return (
    <Card title="客户基本信息">
      <Descriptions column={1}>
        <Descriptions.Item label="姓名">{data.name}</Descriptions.Item>
        <Descriptions.Item label="邮箱">{data.email}</Descriptions.Item>
        <Descriptions.Item label="电话">{data.phone}</Descriptions.Item>
        <Descriptions.Item label="公司">{data.company}</Descriptions.Item>
        <Descriptions.Item label="职位">{data.position}</Descriptions.Item>
        <Descriptions.Item label="地址">{data.address}</Descriptions.Item>
      </Descriptions>
    </Card>
  );
};

export default CustomerInfo;