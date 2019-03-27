import Subject from './Subject';

/* 
  观察者模式：
  将数据和观察者对象维护在应用内部
  + 提供接口修改内部数据，并监听数据变化-如数据有变化则通知调用所有观察者并向其注入已修改的数据
  + 提供接口注册和删除观察者对象，观察者有自己的方法和属性(每个注册的观察者对象的方法和属性名都一样)
 */
class WeatherData extends Subject {
  constructor(...args) {
    super();
    // 维护观察者对象
    this.observers = {};

    // 维护一份内部数据
    this.temperature = args[0];
    this.humidity = args[1];
    this.pressure = args[2];
  }

  registerObserver(observer) {
    // 注册观察者对象：观察者对象有自己的属性(id)和方法(update)
    this.observers[observer.id] = observer;
  }

  removeObserver(observer) {
    // 删除观察者对象
    delete this.observers[observer.id];
  }

  notifyObservers() {
    for (let observerId in this.observers) {
      if (this.observers.hasOwnProperty(observerId)) {
        // 每当数据改变时，通知所有注册的观察者并向其注入内部变化数据
        this.observers[observerId].update(this.temperature, this.humidity, this.pressure);
      }
    }
  }

  measurementsChanged() {
    this.notifyObservers();
  }

  // 提供修改内部数据的方法给外部
  // 同时监听内部数据变化
  setMeasurements(temperature, humidity, pressure) {
    this.temperature = temperature;
    this.humidity = humidity;
    this.pressure = pressure;

    this.measurementsChanged();
  }
}

export default WeatherData;
