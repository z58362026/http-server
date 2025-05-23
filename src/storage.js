/* eslint-disable no-plusplus */
// 默认缓存期限为7天
const DEFAULT_CACHE_TIME = 60 * 60 * 24 * 7;

/**
 * 创建本地缓存对象
 * @param {string=} prefixKey -
 * @param {Object} [storage=localStorage] - sessionStorage | localStorage
 */
export const createStorage = ({ prefixKey = '', storage = localStorage } = {}) => {
  /**
   * 本地缓存类
   * @class Storage
   */

  class Storage {
    constructor() {
      this.storage = storage;
      this.prefixKey = prefixKey;
    }

    getKey(key) {
      return `${this.prefixKey}${key}`;
    }

    /**
     * @description 设置缓存
     * @param {string} key 缓存键
     * @param {*} value 缓存值
     * @param expire 秒
     */
    set(key, value, expire = DEFAULT_CACHE_TIME) {
      const stringData = JSON.stringify({
        value,
        expire: expire !== null ? new Date().getTime() + expire * 1000 : null,
      });
      this.storage.setItem(this.getKey(key), stringData);
    }

    /**
     * 读取缓存
     * @param {string} key 缓存键
     * @param {*=} def 默认值
     */
    get(key, def = null) {
      const item = this.storage.getItem(this.getKey(key));
      if (item) {
        try {
          const data = JSON.parse(item);
          const { value, expire } = data;
          // 在有效期内直接返回
          if (expire === null || expire >= Date.now()) {
            return value;
          }
          this.remove(this.getKey(key));
        } catch (e) {
          return def;
        }
      }
      return def;
    }

    /**
     * 从缓存删除某项
     * @param {string} key
     */
    remove(key) {
      this.storage.removeItem(this.getKey(key));
    }

    /**
     * 清空所有缓存
     * @memberOf Cache
     */
    clear() {
      this.storage.clear();
    }

    /**
     * 设置cookie
     * @param {string} name cookie 名称
     * @param {*} value cookie 值
     * @param {number=} expire 过期时间
     * 如果过期时间为设置，默认关闭浏览器自动删除
     * @example
     */
    setCookie(name, value, expire = DEFAULT_CACHE_TIME) {
      const domain = window.location.hostname.split('.').slice(-2).join('.');
      const otherCookie = `Max-Age=${expire};domain=${domain};path=/`;
      document.cookie = `${this.getKey(name)}=${value};${otherCookie}`;
    }

    /**
     * 根据名字获取cookie值
     * @param name
     */
    getCookie(name) {
      const cookieArr = document.cookie.split('; ');
      for (let i = 0, { length } = cookieArr; i < length; i++) {
        const kv = cookieArr[i].split('=');
        if (kv[0] === this.getKey(name)) {
          return kv[1];
        }
      }
      return '';
    }

    /**
     * 根据名字删除指定的cookie
     * @param {string} key
     */
    removeCookie(key) {
      this.setCookie(key, 1, -1);
    }

    /**
     * 清空cookie，使所有cookie失效
     */
    // eslint-disable-next-line class-methods-use-this
    clearCookie() {
      const keys = document.cookie.match(/[^ =;]+(?==)/g);
      if (keys) {
        for (let i = keys.length; i--; ) {
          document.cookie = `${keys[i]}=0;Max-Age=-1`;
        }
      }
    }
  }
  return new Storage();
};

export const storage = createStorage();
