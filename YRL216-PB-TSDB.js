const fz = require('zigbee-herdsman-converters/converters/fromZigbee');
const tz = require('zigbee-herdsman-converters/converters/toZigbee');
const exposes = require('zigbee-herdsman-converters/lib/exposes');
const reporting = require('zigbee-herdsman-converters/lib/reporting');
const e = exposes.presets;

const definition = {
    zigbeeModel: ['YRL216 PB'],
    model: 'YRL216 PB',
    vendor: 'Yale',
    description: 'Yale YRL216 Door Lock',
    fromZigbee: [fz.lock, fz.lock_operation_event, fz.battery, fz.lock_programming_event, fz.lock_pin_code_response, fz.lock_user_status_response],
    toZigbee: [tz.lock, tz.pincode_lock, tz.lock_userstatus],
    configure: async (device, coordinatorEndpoint, logger) => {
        const endpoint = device.getEndpoint(1);
        await reporting.bind(endpoint, coordinatorEndpoint, ['closuresDoorLock', 'genPowerCfg']);
        await reporting.lockState(endpoint);
        await reporting.batteryPercentageRemaining(endpoint);
    },
    exposes: [e.lock(), e.battery()],
};

module.exports = definition;


