<!--
 * @Author: wangming ming.wang24@gientech.com
 * @Date: 2025-04-27 09:11:46
 * @LastEditors: wangming ming.wang24@gientech.com
 * @LastEditTime: 2025-04-27 09:32:33
 * @FilePath: /rollup-starter-lib/examples/vue2/App.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div id="app">
    <h1>Vue2 Example</h1>
    <div>
      <button @click="getData">发送 GET 请求</button>
      <button @click="postData">发送 POST 请求</button>
      <button @click="setStorage">设置存储</button>
      <button @click="getStorage">获取存储</button>
    </div>
    <div>
      <h3>请求结果：</h3>
      <pre>{{ response }}</pre>
    </div>
    <div>
      <h3>存储结果：</h3>
      <pre>{{ storageData }}</pre>
    </div>
  </div>
</template>

<script>
import { http, createAxios ,storage} from '../../src/main.js';

export default {
  name: 'App',
  data() {
    return {
      response: null,
      storageData: null
    };
  },
  methods: {
    async getData() {
      try {
        const res = await http.get('https://jsonplaceholder.typicode.com/posts/1');
        this.response = res;
      } catch (error) {
        console.error('GET请求错误:', error);
      }
    },
    async postData() {
      try {
        const res = await http.post('https://jsonplaceholder.typicode.com/posts', {
          title: 'foo',
          body: 'bar',
          userId: 1
        });
        this.response = res;
      } catch (error) {
        console.error('POST请求错误:', error);
      }
    },
    setStorage() {
      storage.set('testKey', { name: 'test', value: 123 });
      this.storageData = '已设置存储';
    },
    getStorage() {
      const data = storage.get('testKey');
      this.storageData = data;
    }
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

button {
  margin: 10px;
  padding: 8px 16px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #45a049;
}

pre {
  background-color: #f5f5f5;
  padding: 10px;
  border-radius: 4px;
  text-align: left;
  max-width: 600px;
  margin: 0 auto;
}
</style> 