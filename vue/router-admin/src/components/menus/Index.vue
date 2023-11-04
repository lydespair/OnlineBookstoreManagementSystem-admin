<template>
    <div>
        <UserHeader></UserHeader>
        <router-view></router-view>
    </div>
</template>

<script>
import UserHeader from './UserHeader'
export default {
  name: "Index",
  components: {
    UserHeader
  }
}
</script>

<style>
</style>