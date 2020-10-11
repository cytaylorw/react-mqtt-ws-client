const mqtt = require('mqtt');

let client  = mqtt.connect('mqtt://test.mosquitto.org:1883');

const publish = () => {
    let time = Date.now();
    client.publish('test/data', JSON.stringify({time}));
}

client.on('connect', function () {
    client.subscribe('test/data', function (err) {
      if (!err) {
        setInterval(() => {
            publish()
        },1000)
      }
    })
  })