<template>
  <el-dialog
        title="文件详细"
        :visible.sync="fileDialogVisible"
        :append-to-body="true"
        :close-on-click-modal = "false"
        width="30%"
        class="fileInfoDialog"
        >
        <div >
           <span class="fileInfoTitle">文件名:</span>
           <span class="fileInfoContent">{{fileItemInfo.filename}}</span>
        </div>
        <div>
          <span class="fileInfoTitle">作者:</span>
          <span class="fileInfoContent">{{fileItemInfo.username}}</span>
        </div>

        <div>
          <span class="fileInfoTitle">文件大小:</span>
          <span class="fileInfoContent">{{fileItemInfo.file_size}}</span>
        </div>

        <div>
          <span class="fileInfoTitle">文件类型:</span>
          <span class="fileInfoContent">{{fileItemInfo.typename}}</span>
        </div>

        <div>
          <span class="fileInfoTitle">上传时间:</span>
          <span class="fileInfoContent">{{fileItemInfo.uploadTime}}</span>
        </div>

        <div>
          <span class="fileInfoTitle">文件描述:</span>
          <span class="fileInfoContent">{{fileItemInfo.description}}</span>
        </div>

        <div>
          <span class="fileInfoTitle">下载量:</span>
          <span class="fileInfoContent">{{fileItemInfo.download_amount}}</span>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="fileDialogVisible = false">关 闭</el-button>
          <el-button type="primary" @click="download(fileItemInfo.id, fileItemInfo.filename)">下 载</el-button>
        </span>
      </el-dialog>

</template>

<script>
export default {
    name: 'FileInfoModal',

    props: {
        file: [],
    },
     data() {
        return {
          fileDialogVisible: false
        }
    },
    methods: {
        downlod() {
            this.$emit("downlod")
        },
        confirm() {
            this.$message.success('submit');
        }
    }


}
</script>

<style>

</style>