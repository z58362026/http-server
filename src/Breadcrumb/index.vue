<!--
 * @Author: lifuhai
 * @Date: 2023-03-06 14:37:23
 * @LastEditTime: 2023-07-28 18:14:45
 * @LastEditors: lifuhai
 * @FilePath: /modelmagic-ui/src/components/Breadcrumb/index.vue
 * @Description: 
-->
<template>
  <el-breadcrumb class="app-breadcrumb" separator="/">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="(item, index) in levelList" :key="item.path">
        <span v-if="item.redirect === 'noRedirect' || index == levelList.length - 1" class="no-redirect">{{ item.meta.title }}</span>
        <span v-else>{{ item.meta.title }}</span>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script>
export default {
  data() {
    return {
      levelList: null,
    };
  },
  watch: {
    $route() {
      this.getBreadcrumb();
    },
  },
  created() {
    this.getBreadcrumb();
  },
  methods: {
    getBreadcrumb() {
      // only show routes with meta.title
      let matched = this.$route.matched.filter((item) => item.meta && item.meta.title);
      const first = matched[0];

      // if (!this.isDashboard(first)) {
      //   matched = [{ path: '/dashboard', meta: { title: 'Dashboard' } }].concat(matched);
      // }

      this.levelList = matched.filter((item) => item.meta && item.meta.title && item.meta.breadcrumb !== false);
    },
    isDashboard(route) {
      const name = route && route.name;
      if (!name) {
        return false;
      }
      return name.trim().toLocaleLowerCase() === 'Dashboard'.toLocaleLowerCase();
    },
    // pathCompile(path) {
    //   // To solve this problem https://github.com/PanJiaChen/vue-element-admin/issues/561
    //   const { params } = this.$route;
    //   var toPath = pathToRegexp.compile(path);
    //   return toPath(params);
    // },
    // handleLink(item) {
    //   const { redirect, path } = item;
    //   if (redirect) {
    //     this.$router.push(redirect);
    //     return;
    //   }
    //   this.$router.push(this.pathCompile(path));
    // },
  },
};
</script>

<style lang="less" scoped>
.app-breadcrumb.el-breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: @navbarHeight;
  margin-left: 8px;

  .no-redirect {
    color: @infoColor;
    cursor: text;
  }
}
</style>
