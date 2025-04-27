<!--
 * @Author: wangming ming.wang24@gientech.com
 * @Date: 2025-04-27 09:11:56
 * @LastEditors: wangming ming.wang24@gientech.com
 * @LastEditTime: 2025-04-27 09:27:38
 * @FilePath: /rollup-starter-lib/examples/vue3/App.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="app">
    <h1>Vue3 Example</h1>
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

<script setup>
import { ref } from "vue";
import { http, createAxios, storage } from "../../src/main.js";

const response = ref(null);
const storageData = ref(null);

const getData = async () => {
  try {
    const res = await http.get("https://jsonplaceholder.typicode.com/posts/1");
    response.value = res;
  } catch (error) {
    console.error("GET请求错误:", error);
  }
};

const postData = async () => {
  try {
    const res = await http.post("https://jsonplaceholder.typicode.com/posts", {
      title: "foo",
      body: "bar",
      userId: 1,
    });
    response.value = res;
  } catch (error) {
    console.error("POST请求错误:", error);
  }
};

const setStorage = () => {
  storage.set("testKey", { name: "test", value: 123 });
  storageData.value = "已设置存储";
};

const getStorage = () => {
  const data = storage.get("testKey");
  storageData.value = data;
};
</script>

<style scoped>
.app {
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
  background-color: #4caf50;
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
