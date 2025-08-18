// インターフェース分離の原則

// 原則を満たさないコード例

// インターフェースを分離していないため、
// 不要なメソッドの実装を強制されるクラスが存在してしまう
class CameraDevice {
  takePhoto() {}
  recordVideo() {}
  connectToWiFi() {}
}

// eslint-disable-next-line no-unused-vars
class SimpleCamera extends CameraDevice {
  takePhoto() {}
  recordVideo() {
    // 不要だが実装を強制される
    throw new Error("This camera does not support video recording.");
  }
  connectToWiFi() {
    // 不要だが実装を強制される
    throw new Error("This camera does not support WiFi connection.");
  }
}

// 原則を満たすコード例

class PhotoCamera {
  takePhoto() {}
}

// eslint-disable-next-line no-unused-vars
class VideoCamera {
  recordVideo() {}
}

// eslint-disable-next-line no-unused-vars
class WiFiCamera {
  connectToWiFi() {}
}

// eslint-disable-next-line no-unused-vars
class NormalCamera extends PhotoCamera {
  takePhoto() {
    // 写真を撮る機能のみで十分になる
  }
}

// eslint-disable-next-line no-unused-vars
class AdvancedCamera extends PhotoCamera {
  takePhoto() {}
  recordVideo() {}
  connectToWiFi() {}
}
