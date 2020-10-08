exports.zhTW = {
    props: {
      MuiBreadcrumbs: {
        expandText: '顯示路徑',
      },
      MuiTablePagination: {
        backIconButtonText: '上一頁',
        labelRowsPerPage: '每頁筆數：',
        labelDisplayedRows: ({ from, to, count }) =>
    `${from}-${to}  共${count !== -1 ? count : `大於 ${to}`}`,
        nextIconButtonText: '下一頁',
      },
      MuiRating: {
        getLabelText: value => `${value}星`,
        emptyLabelText: '無',
      },
      MuiAutocomplete: {
        clearText: '清除',
        closeText: '關閉',
        loadingText: '載入中…',
        noOptionsText: '無選項',
        openText: '開啟',
      },
      MuiAlert: {
        closeText: '關閉',
      },
      MuiPagination: {
        'aria-label': '分頁導覽',
        getItemAriaLabel: (type, page, selected) => {
          if (type === 'page') {
            return `第${page}頁`;
          }
          if (type === 'first') {
            return '第一頁';
          }
          if (type === 'last') {
            return '最後一頁';
          }
          if (type === 'next') {
            return '下一頁';
          }
          if (type === 'previous') {
            return '上一頁';
          }
          return undefined;
        },
      },
    },
    text: {
      MuiMqttCommon: {
        connect: '連線',
        disconnect: '中斷連線',
        subscribe: '訂閱',
        unsubscribe: '取消訂閱',
        publish: '發布',
      },
      MuiConfigActions: {
        settings: '設定'
      }
    }
  };