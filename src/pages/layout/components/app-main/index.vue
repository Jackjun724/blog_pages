<template>
  <div>
    <transition name="fade-transform" mode="out-in">
      <router-view :key="$route.fullPath"></router-view>
    </transition>
  </div>
</template>

<script>
  export default {
    name: 'index'
  }
</script>

<style scoped>
/*fade-transform*/
.fade-transform-leave-active,
.fade-transform-enter-active {
  transition: all .3s;
  overflow: hidden;
}

.fade-transform-enter {
  opacity: 0;
  transform: translateX(-30px);
  overflow: hidden;
}

.fade-transform-leave-to {
  opacity: 0;
  transform: translateX(30px);
  overflow: hidden;
}
</style>
