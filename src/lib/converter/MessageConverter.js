


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

const columns = {
    default: {
        time: 'Time',
        topic: 'Topic',
        qos: 'QoS',
        message: 'Message'
    }
}

const collpasedColumns = {
    defaultFull: {
        cmd: 'Command',
        retain: 'Retained',
        dup: 'Duplicate',
    }
}

const messageConverter = {
    default: defaultShort,
    defaultFull
}

const types = [
    {value: 'default', label: 'Default'},
    {value: 'defaultFull', label: 'Default(Full)'},
]

export { messageConverter, columns, collpasedColumns, types };