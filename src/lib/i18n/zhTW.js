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
      ConfigActions: {
        connect: '連線',
        disconnect: '中斷連線',
        subscribe: '訂閱',
        unsubscribe: '取消訂閱',
        publish: '發布',
        settings: '設定'
      },
      NavBar: {
        hideButton: '隱藏按鈕',
        showButton: '顯示按鈕'
      },
      MqttStatus: {
        connected: '已連線',
        reconnecting: '重新連線中',
        closed: '已關閉',
        offline: '離線'
      },
      ConfigDialog: {
        closeBtn: '關閉',
      },
      MqttConnectDialog: {
        connectBtn: '連線',
        disconnectBtn: '中斷連線',
        title: '連線至MQTT',
        contentText: '連線至 MQTT server (WebSocket)。',
        // urlLabel: 'URL',
        // clientIdLabel: 'Client ID',
        anomynousLabel: '匿名登入',
        basicAuthLabel: '基本認證',
        usernameLabel: '帳號',
        passwordLabel: '密碼'
      },
      AppSettingsDialog: {
        localeLabel: '語言',
        darkModeLabel: '黑暗模式',
        lightModeLabel: '明亮模式',
        startTimeLabel: '起始時間',
        endTimeLabel: '結束時間',
        filter: '過濾',
        filterOnLabel: '開啟過濾',
        filterOffLabel: '關閉過濾',
        filterKeyLabel: '過濾鍵值',
        filterTextLabel: '過濾內容',
        langauges: {
          enUS: 'English',
          zhTW: '繁體中文'
        },
        title: '設定',
        contentText: 'MQTT Websocket Client 設定。',
      },
      TopicTextField: {
        topicLabel: '主題',
      },
      QosSlider: {
        qosLabel: '品質設定',
      },
      MqttSubscribeDialog: {
        subscribeBtn: '訂閱',
        unsubscribeBtn: '取消訂閱',
        title: '訂閱',
        contentText: '訂閱 MQTT 主題。',
        converterLabel: '轉換器',
      },
      MqttPublishDialog: {
        publishBtn: '發布',
        title: '發布',
        contentText: '發布 MQTT 訊息。',
        messageLabel: '訊息',
        messagePlaceholder: '輸入 MQTT 訊息'
      }
    }
  };