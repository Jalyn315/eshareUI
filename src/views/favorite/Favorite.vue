<template>
  <div>
    <div class="infinite-list-wrapper" style="overflow:auto">
        <ul
          class="list"
          v-infinite-scroll="load"
          infinite-scroll-disabled="disabled">
          <li v-for="i in count" class="list-item" :key="i">
             <el-tooltip class="item" effect="dark" :content=" favoriteList[files[i - 1].id] ? '点击取消收藏' : '点击添加收藏'" placement="top">
               <button class="favoriteBtn" @click="favoriteEvent(files[i - 1].id)"><i :class=" favoriteList[files[i - 1].id] ? 'el-icon-star-on' : 'el-icon-star-off'"></i></button>
            </el-tooltip>
            <span class="fileName">{{files[i - 1].filename}}</span>
            <div class="uploadInfo">
                <span class="author">作者:<span>{{files[i - 1].username}}</span></span>
                <span class="time">时间:<span>{{files[i - 1].uploadTime}}</span></span>
            </div>
              <div class="btnGroup">
                <el-button class="check" type="info" @click="showFileInfo(i - 1)">查看详细</el-button>
                <el-button class="download" type="success" @click="download(files[i - 1].id, files[i - 1].filename)">文件下载</el-button>
              </div>
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
    //获取所有文件
      this.getRequest('/get_all_files').then(resp => {
        this.files = resp.object;
        this.isDateLoading = false;
        this.count = 10;
      });
      
    //获得当前用户收藏的信息
      this.getRequest('/user_favorite_info').then(resp => {
        let favorites = resp.object;
        favorites.forEach((item) => {
          this.$set(this.favoriteList, item.file_id, true)
        });
      });
  },
  
  data() {
    return {
      files: [],
      count: 0,
      loading: false,
      isDateLoading: true,
      fileDialogVisible: false,
      fileItemInfo:{},
      favoriteList: {
        2: false,
        19: true
      }
    }
  },

  computed: {
    noMore () {
        return this.count >= this.files.length && !this.isDateLoading
      },
      disabled () {
        return this.loading || this.noMore
      }
  },

  methods:{

    load () {
      this.loading = true;
      setTimeout(() => {
        if (this.count + 10 > this.files.length) {
          this.count = this.files.length;
        } else {
          this.count += 10;
        }
        this.loading = false;
      }, 800);
    },

    //显示文件信息
    showFileInfo(index) {
      this.fileItemInfo = this.files[index];
      this.fileDialogVisible = true;
    },

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
  .infinite-list-wrapper {
    height: 800px;
    
  }
  .infinite-list-wrapper .list {
    padding: 0;
    margin: 0;
    list-style: none;
  }
  .infinite-list-wrapper .list li {
    min-height: 50px;
    margin-bottom: 3px;
    border: black 1px solid;
    padding: 5px 15px 5px 15px;
    position: relative;
    display: flex;
    align-items: center;
    min-width: 1400px;
   }
  .fileName {
    display: inline-block;
    margin-left: 15px;
    font-family: "宋体";
    font-weight: bold;
    font-size: 20px;
    width: 50%;
    overflow-wrap:break-word;  /*文本换行 */
  }
  .btnGroup {
    display: inline-block;
    position:absolute;
    right: 0;
    padding-right: 25px;
  }

  .uploadInfo {
    display: inline-block;
    margin-left: 30px;
    margin-top: 40px;
    font-size: 15px;
  }

  .author > span {
    margin-left: 15px;
    font-weight: bold;
  }

  .time {
    margin-left: 50px;
  }
  .time > span {
    margin-left: 15px;
    font-weight: bold;
  }
  .fileInfoTitle {
    display: inline-block;
    height: 25px;
    font-size: 18px;
    margin: 5px 0px 5px 0;
    font-weight: bold;
  }
  .fileInfoContent {
    margin-left: 10px;
  }

  .favoriteBtn {
    height: 35px;
    width: 35px;
    font-size: 25px;
    background: none;
    border: none;
  }
</style>