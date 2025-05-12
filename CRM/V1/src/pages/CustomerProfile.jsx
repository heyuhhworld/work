const CustomerProfile = () => {
  const customerData = {
    // ... existing customer data ...
  };

  const insightReports = [
    {
      id: 1,
      version: 'v2.0',
      date: '2024-03-20',
      content: '经过深入沟通，发现客户在数据分析方面有更多需求...',
      needs: [
        '需要强大的数据分析功能',
        '希望能够生成自定义报表',
        '需要多维度的数据可视化展示'
      ],
      insights: [
        '客户业务增长迅速，数据量激增',
        '现有系统分析能力不足',
        '团队对数据分析有专业需求',
        '预算充足，愿意投入资源'
      ]
    },
    {
      id: 2,
      version: 'v1.0',
      date: '2024-03-15',
      content: '客户对我们的产品表现出浓厚兴趣，特别关注安全性能...',
      needs: [
        '需要一个安全可靠的数据存储解决方案',
        '希望能够实现数据的实时同步',
        '对系统的安全性能有较高要求'
      ],
      insights: [
        '客户对产品的安全性非常重视',
        '团队技术能力较强，可以接受较复杂的解决方案',
        '存在扩展需求的可能性',
        '决策链较长，需要多方评估'
      ]
    }
  ];

  // ... rest of the component ...
};

export default CustomerProfile; 