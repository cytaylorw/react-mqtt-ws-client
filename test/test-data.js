const mqtt = require('mqtt');

let client  = mqtt.connect('mqtt://192.168.1.141:61883');

const publish = () => {
    let time = Date.now();
    client.publish('test/data', JSON.stringify({time}));
}

client.on('connect', function () {
    client.subscribe('test/data', function (err) {
      if (!err) {
        setInterval(() => {
            publish()
        },10)
      }
    })
  })