import React, { useState } from 'react';
import { Card, Typography, Modal } from 'antd';

const { Text, Title } = Typography;

const InsightReport = ({ report }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Card 
        size="small" 
        className="insight-report" 
        onClick={showModal}
        style={{ cursor: 'pointer' }}
        hoverable
      >
        <Title level={5}>版本 {report.version}</Title>
        <Text type="secondary">{report.date}</Text>
        <p>{report.content}</p>
      </Card>

      <Modal
        title={`洞察报告 ${report.version}`}
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
        width={800}
      >
        <div className="report-detail">
          <div className="report-section">
            <Title level={4}>客户近期需求</Title>
            <ul>
              {report.needs?.map((need, index) => (
                <li key={index}>{need}</li>
              ))}
            </ul>
          </div>

          <div className="report-section">
            <Title level={4}>客户洞察内容</Title>
            <ul>
              {report.insights?.map((insight, index) => (
                <li key={index}>{insight}</li>
              ))}
            </ul>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default InsightReport;
