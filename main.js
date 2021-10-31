import { TankDevice, WindDevice, EnergyDevice, Facility } from "iot-sim";
import { Mqtt } from "azure-iot-device-mqtt";
import { Client as DeviceClient, Message } from "azure-iot-device";
import config from "./config";

const handle = connectionString => {
    const client = DeviceClient.fromConnectionString(connectionString, Mqtt);
    return data => {
        const message = new Message(JSON.stringify(data));
        client.sendEvent(message, error => {
            if (error) {
                console.error(`send error: ${error.toString()}`);
            } else {
                console.log(`${data.dsn} message sent`);
            }
        });
    };
};

// Facility 1 Devices

const tank_iot_01 = new TankDevice({
    dsn: "tank_iot_01",
    type: "tank",
    profile: null,
    log: false,
    handler: handle(config.connection_strings.device.tank_iot_01),
});

const wind_iot_01 = new WindDevice({
    dsn: "wind_iot_01",
    type: "wind",
    profile: "profile1",
    log: false,
    handler: handle(config.connection_strings.device.wind_iot_01),
});

const energy_iot_01 = new EnergyDevice({
    dsn: "energy_iot_01",
    type: "energy",
    profile: "profile1",
    log: false,
    handler: handle(config.connection_strings.device.energy_iot_01),
});

// Facility 2 Devices

const tank_iot_02 = new TankDevice({
    dsn: "tank_iot_02",
    type: "tank",
    profile: null,
    log: false,
    handler: handle(config.connection_strings.device.tank_iot_02),
});

const wind_iot_02 = new WindDevice({
    dsn: "wind_iot_02",
    type: "wind",
    profile: "profile2",
    log: false,
    handler: handle(config.connection_strings.device.wind_iot_02),
});

const energy_iot_02 = new EnergyDevice({
    dsn: "energy_iot_02",
    type: "energy",
    profile: "profile2",
    log: false,
    handler: handle(config.connection_strings.device.energy_iot_02),
});

// Facility 01

const facility_01 = new Facility({
    name: "facility_01",
    devices: [energy_iot_01, wind_iot_01, tank_iot_01],
    geolocation: {
        lat: 51.0447,
        lon: 114.0719,
    },
    frequency: 300000,
});

facility_01.setupFacility();
facility_01.putOnline();

// Facility 02

const facility_02 = new Facility({
    name: "facility_02",
    devices: [energy_iot_02, wind_iot_02, tank_iot_02],
    geolocation: { lat: 53.5461, lon: 113.4938 },
    frequency: 300000,
});

facility_02.setupFacility();
facility_02.putOnline();
