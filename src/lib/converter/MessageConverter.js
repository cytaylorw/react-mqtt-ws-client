
const defaultShort = (data) => {
    return {
        topic: data.topic, 
        message: data.message.toString(), 
        qos: data.packet.qos, 
        time: Date.now()
    }
}
const defaultFull = (data) => {
    return {
        ...defaultShort(data),
        retain: data.packet.retain.toString(), 
        dup: data.packet.dup.toString(), 
        cmd: data.packet.cmd,
    }
}

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

export { messageConverter, columns, collpasedColumns, types };