<template>
  <div id="myFiles">
      <div v-for="(item, index) in fileList" :key="index">
        {{item}}
      </div>
  </div>
</template>

<script>
export default {
    mounted: function() {
      this.getRequest('/get_my_file').then(resp => {
        this.fileList = resp.object;
      })
    },
    data() {
      return {
          fileList:[]
      }
    }
}
</script>

<style>

</style>