<template>
  <div id="fileList" class="fileList">
      <!-- <div v-for="(item, index) in files" :key="index">
        {{item}}
      </div> -->

      <div class="infinite-list-wrapper" style="overflow:auto">
        <ul
          class="list"
          v-infinite-scroll="load"
          infinite-scroll-disabled="disabled">
          <li v-for="i in count" class="list-item" :key="i">
            <span class="">文件名</span>
             <el-button class="check" type="info">查看详细</el-button>
              <el-button class="download" type="success">下载</el-button>

          </li>
        </ul>
        <p v-if="loading">加载中...</p>
        <p v-if="noMore">没有更多了</p>
      </div>

  </div>
</template>

<script>

export default {
  name: 'flieList',
  mounted: function(){
        this.getRequest('/get_all_files').then(resp => {
         this.files = resp.object
      })
      
  },

  computed: {
    noMore () {
        return this.count >= 100
      },
      disabled () {
        return this.loading || this.noMore
      }
  },

  data() {
    return {
      files: [],
      count: 20,
      loading: false
    }
  },
  methods: {
      load () {
        this.loading = true
        setTimeout(() => {
          this.count += 10
          this.loading = false
        }, 800)
      }
    }
}
</script>
    
<style>
  .infinite-list-wrapper {
      height: 800px;
      text-align: center;
  }
  .infinite-list-wrapper .list {
    padding: 0;
    margin: 0;
    list-style: none;
  }
   .infinite-list-wrapper .list li {
     background: green;
     height: 40px;
     margin-bottom: 3px;
     border: black 1px solid;
   }
</style>