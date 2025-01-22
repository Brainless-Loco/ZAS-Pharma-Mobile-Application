import * as Device from 'expo-device';
import * as Battery from 'expo-battery';
import * as Network from 'expo-network';
import * as Storage from 'expo-file-system';

export const getDeviceInfo = async () => {
  const batteryLevel = await Battery.getBatteryLevelAsync();
  const networkState = await Network.getNetworkStateAsync();
  const diskInfo = await Storage.getFreeDiskStorageAsync();

  const deviceInfo = {
    brand: Device.brand,
    designName: Device.designName,
    deviceName: Device.deviceName,
    deviceType: Device.deviceType,
    deviceYearClass: Device.deviceYearClass,
    isDevice: Device.isDevice,
    manufacturer: Device.manufacturer,
    modelName: Device.modelName,
    modelId: Device.modelId,
    osName: Device.osName,
    osInternalBuildId : Device.osInternalBuildId,
    osVersion: Device.osVersion,
    productName: Device.productName,
    platformApiLevel: Device.platformApiLevel,
  };

  return deviceInfo;
};
