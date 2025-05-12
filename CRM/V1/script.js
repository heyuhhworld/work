const reportData = {
    report1: {
        title: '洞察报告 v1.0',
        date: '2024-03-15',
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
    },
    report2: {
        title: '洞察报告 v2.0',
        date: '2024-03-20',
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
    }
};

const modal = document.getElementById('reportModal');

let currentReportId = null;
let selectedText = '';
let comments = {};

// 添加分享相关的变量和函数
const shareModal = document.getElementById('shareModal');
let isSharedView = false;

// 修改时间轴事件数据的顺序
const timelineEvents = [
    {
        id: 'report2',
        type: 'report',
        data: reportData.report2,
        date: '2024-03-20',
        content: '经过深入沟通，发现客户在数据分析方面有更多需求...'
    },
    {
        id: 'order-1',
        type: 'order',
        data: {
            orderNo: 'ORD20240316001',
            product: '数据分析基础版',
            amount: '50,000',
            date: '2024-03-18'  // 修改日期到产品经理评论之前
        }
    },
    {
        id: 'pm-comment-1',
        type: 'pm-comment',
        data: {
            user: '产品经理',
            content: '客户对数据分析需求强烈，建议重点展示我们的数据可视化功能',
            date: '2024-03-17'  // 修改日期
        }
    },
    {
        id: 'report1',
        type: 'report',
        data: reportData.report1,
        date: '2024-03-15',
        content: '客户对我们的产品表现出浓厚兴趣，特别关注安全性能...'
    }
];

// 初始化时检查是否是分享链接
function initPage() {
    const urlParams = new URLSearchParams(window.location.search);
    const sharedReportId = urlParams.get('report');
    const shared = urlParams.get('shared');
    
    // 首先渲染时间轴
    renderTimelineItems();
    
    if (sharedReportId && shared) {
        isSharedView = true;
        document.body.classList.add('shared-view');
        openReport(sharedReportId);
    }
}

function openReport(eventId) {
    // 找到对应的报告事件
    const event = timelineEvents.find(e => e.id === eventId && e.type === 'report');
    if (!event) {
        alert('报告不存在');
        return;
    }
    
    currentReportId = eventId;
    const report = event.data;
    
    document.getElementById('reportTitle').textContent = report.title;
    document.getElementById('reportDate').textContent = report.date;
    
    renderLists();
    renderComments();
    
    modal.style.display = 'block';
}

function renderLists() {
    const report = reportData[currentReportId];
    
    // 渲染需求列表
    document.getElementById('customerNeeds').innerHTML = 
        report.needs.map(need => `<li class="content-item">${need}</li>`).join('');
    
    // 渲染洞察列表
    document.getElementById('customerInsights').innerHTML = 
        report.insights.map(insight => `<li class="content-item">${insight}</li>`).join('');
    
    // 为内容添加选中事件监听
    document.querySelectorAll('.content-item').forEach(item => {
        item.addEventListener('mouseup', handleTextSelection);
    });
}

function handleTextSelection(e) {
    const selection = window.getSelection();
    const text = selection.toString().trim();
    
    if (text) {
        selectedText = text;
        showSelectionTooltip(e);
    }
}

function showSelectionTooltip(e) {
    const tooltip = document.createElement('div');
    tooltip.className = 'selection-tooltip';
    tooltip.innerHTML = `
        <button onclick="addCommentToSelection()">添加评论</button>
    `;
    
    document.body.appendChild(tooltip);
    
    // 定位tooltip
    const rect = window.getSelection().getRangeAt(0).getBoundingClientRect();
    tooltip.style.top = `${rect.bottom + window.scrollY + 5}px`;
    tooltip.style.left = `${rect.left + window.scrollX}px`;
    tooltip.style.display = 'block';
    
    // 点击其他地方关闭tooltip
    document.addEventListener('mousedown', function closeTooltip(e) {
        if (!tooltip.contains(e.target)) {
            tooltip.remove();
            document.removeEventListener('mousedown', closeTooltip);
        }
    });
}

function addComment() {
    const commentText = document.getElementById('newComment').value.trim();
    if (commentText) {
        addCommentToTimeline(commentText);
        document.getElementById('newComment').value = '';
    }
}

function addCommentToSelection() {
    const comment = prompt('请输入评论：');
    if (comment) {
        if (!comments[currentReportId]) {
            comments[currentReportId] = [];
        }
        
        const newComment = {
            text: selectedText,
            comment: comment,
            date: new Date().toLocaleString(),
            user: '访客'
        };
        
        comments[currentReportId].push(newComment);
        
        // 添加评论到时间轴
        addCommentToTimeline(comment);
        
        renderComments();
    }
    
    document.querySelector('.selection-tooltip').remove();
}

function renderComments() {
    const commentsList = document.getElementById('commentsList');
    const reportComments = comments[currentReportId] || [];
    
    commentsList.innerHTML = reportComments.map(comment => `
        <div class="comment-item">
            <div class="comment-header">
                <span class="comment-user">${comment.user}</span>
                <span class="comment-date">${comment.date}</span>
            </div>
            <div class="comment-content">
                <strong>选中内容：</strong> "${comment.text}"<br>
                <strong>评论：</strong> ${comment.comment}
            </div>
        </div>
    `).join('');
}

function toggleEdit(type) {
    const editor = document.getElementById(`${type}Editor`);
    const list = document.getElementById(`customer${type.charAt(0).toUpperCase() + type.slice(1)}`);
    const content = reportData[currentReportId][type].join('\n');
    
    editor.style.display = 'block';
    list.style.display = 'none';
    document.getElementById(`${type}Text`).value = content;
}

function saveEdit(type) {
    const newContent = document.getElementById(`${type}Text`).value
        .split('\n')
        .filter(item => item.trim());
    
    reportData[currentReportId][type] = newContent;
    
    const editor = document.getElementById(`${type}Editor`);
    const list = document.getElementById(`customer${type.charAt(0).toUpperCase() + type.slice(1)}`);
    
    editor.style.display = 'none';
    list.style.display = 'block';
    
    renderLists();
}

function cancelEdit(type) {
    const editor = document.getElementById(`${type}Editor`);
    const list = document.getElementById(`customer${type.charAt(0).toUpperCase() + type.slice(1)}`);
    
    editor.style.display = 'none';
    list.style.display = 'block';
}

function closeModal() {
    modal.style.display = 'none';
}

// 点击模态框外部关闭
window.onclick = function(event) {
    if (event.target == modal) {
        closeModal();
    }
}

// 分享相关函数
function shareReport() {
    const shareLink = generateShareLink();
    document.getElementById('shareLink').value = shareLink;
    shareModal.style.display = 'block';
}

function generateShareLink() {
    const baseUrl = window.location.origin + window.location.pathname;
    return `${baseUrl}?report=${currentReportId}&shared=true`;
}

function copyShareLink() {
    const shareLink = document.getElementById('shareLink');
    shareLink.select();
    document.execCommand('copy');
    
    // 显示复制成功提示
    const button = event.target;
    const originalText = button.textContent;
    button.textContent = '已复制';
    setTimeout(() => {
        button.textContent = originalText;
    }, 2000);
}

function closeShareModal() {
    shareModal.style.display = 'none';
}

// 添加评论到时间轴的函数
function addCommentToTimeline(comment) {
    const timelineContainer = document.querySelector('.timeline');
    const firstItem = timelineContainer.firstChild;
    
    const timelineItem = document.createElement('div');
    timelineItem.className = 'timeline-item comment-timeline-item';
    timelineItem.innerHTML = `
        <div class="timeline-dot comment-dot"></div>
        <div class="timeline-content">
            <div class="report-card comment-card">
                <div class="comment-tag">洞察报告评论</div>
                <p class="date">${new Date().toLocaleString()}</p>
                <p class="content">
                    <strong>访客：</strong>
                    ${comment}
                </p>
            </div>
        </div>
    `;
    
    // 将评论插入到时间轴最前面
    timelineContainer.insertBefore(timelineItem, firstItem);
    
    // 30秒后自动移除评论
    setTimeout(() => {
        timelineItem.style.opacity = '0';
        timelineItem.style.transform = 'translateY(-20px)';
        setTimeout(() => {
            timelineItem.remove();
        }, 300);
    }, 30000);
}

// 修改渲染时间轴的函数
function renderTimelineItems() {
    const timelineContainer = document.querySelector('.timeline');
    timelineContainer.innerHTML = timelineEvents.map(event => {
        switch(event.type) {
            case 'report':
                return `
                    <div class="timeline-item">
                        <div class="timeline-dot"></div>
                        <div class="timeline-content">
                            <div class="report-card" onclick="openReport('${event.id}')" data-report-id="${event.id}">
                                <h3>${event.data.title}</h3>
                                <p class="date">${event.date}</p>
                                <p class="content">${event.content}</p>
                            </div>
                        </div>
                    </div>
                `;
            case 'pm-comment':
                return `
                    <div class="timeline-item">
                        <div class="timeline-dot pm-dot"></div>
                        <div class="timeline-content">
                            <div class="report-card pm-card">
                                <div class="pm-tag">产品经理评论</div>
                                <p class="date">${event.data.date}</p>
                                <p class="content">
                                    <strong>${event.data.user}：</strong>
                                    ${event.data.content}
                                </p>
                            </div>
                        </div>
                    </div>
                `;
            case 'order':
                return `
                    <div class="timeline-item">
                        <div class="timeline-dot order-dot"></div>
                        <div class="timeline-content">
                            <div class="report-card order-card">
                                <div class="order-tag">客户下单</div>
                                <p class="date">${event.data.date}</p>
                                <div class="order-details">
                                    <p><strong>订单号：</strong>${event.data.orderNo}</p>
                                    <p><strong>产品：</strong>${event.data.product}</p>
                                    <p><strong>金额：</strong>￥${event.data.amount}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
        }
    }).join('');
}

// 页面加载时初始化
document.addEventListener('DOMContentLoaded', initPage); 