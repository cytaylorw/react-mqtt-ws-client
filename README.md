This MQTT client is made as a template to convert and filter messages from a single MQTT topic. It's not a good practice to use one topic for all devices but it can still happen at work.

### Demo
[GitHub Pages](https://cytaylorw.github.io/react-mqtt-ws-client)

### Limitation
- All messages are saved in memory so eventually the browser will run out of memory.
- Only simple filter on time range and string match on a single column.

### Add Converter
- Pure Javascript
- Add the new converter in `src\lib\converter\MessageConverter.js`

```js
/* 
    Example for new converter
*/
// const newConverter = (data) => {
//     let result = defaultFull(data);

//     // Add code here

//     return result;
// }

/* 
    Table columns for the message table. If not defined, "default" will be used.
*/
const columns = {
    default: {
        time: 'Time',
        topic: 'Topic',
        qos: 'QoS',
        message: 'Message'
    }
}

/* 
    Table columns for the collapsed table. If not defined, there won't be collapsed section. 
*/
const collpasedColumns = {
    defaultFull: {
        cmd: 'Command',
        retain: 'Retained',
        dup: 'Duplicate',
    }
}

/* 
    Exported converter functions called by the MqttProvider.
    - key: external function name
    - value: internal function name
*/
const messageConverter = {
    default: defaultShort,
    defaultFull
}

/* 
    Select options for converter.
    - value: key for messageConverter
    - label: display name
*/
const types = [
    {value: 'default', label: 'Default'},
    {value: 'defaultFull', label: 'Default(Full)'},
    {value: 'test', label: 'test'}, // Test option for absence of the converter function.
]
```
