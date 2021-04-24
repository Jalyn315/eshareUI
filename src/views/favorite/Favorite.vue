<template>
  <div>
     收藏夹
      <button @click="download(52)">下载</button>
  </div>
</template>

<script>
export default {
  methods:{
    download(id) {
      this.getDownload('/download/' + id).then(resp => {

        let filename = resp.headers.filename
        let blob = new Blob([resp.data], {type:"application/octet-stream"});

        if (window.navigator.msSaveOrOpenBlob) {
          navigator.msSaveBlob(blob, filename);
        }

        var link = document.createElement('a');
        link.href = URL.createObjectURL(blob)
        link.download = filename;
        link.click();
        window.URL.revokeObjectURL(link.href)

        // let objectUrl = URL.createObjectURL(blob) // 创建URL
        // window.location.href = objectUrl;
        // URL.revokeObjectURL(objectUrl); // 释放内存
      })
    }
  }
}
</script>

<style>

</style>