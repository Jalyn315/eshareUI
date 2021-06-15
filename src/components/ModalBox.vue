<template>
    <div class="modal-backdrop">
        <div class="modal">
            <div class="modal-header" >
                <h3>我是一个模态</h3>
            </div>
            <div class="modal-body">
                <slot name="modal-body">
                     <p>I am the comtent of a modal</p>
                </slot>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn-close" @click="closeSelf">关闭</button>
                <button type="button" class="btn-confirm" @click="confirm">确认</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'modal',
    props: {
        
    },
    data() {
        return {

        }
    },
    methods: {
        closeSelf() {
            this.$emit("close")
        },
        confirm() {
            this.$message.success('submit');
        }
    }
}
</script>

<style>
    .modal-backdrop {
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background: rgba(0, 0, 0, .3);
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .modal {
        background-color: #fff;
        box-shadow: 2px 2px 20px 1px;
        overflow-x: auto;
        flex-direction: column;
        border-radius: 16px;
        width: 700px;
        min-height: 700px;
        position:relative;
    }
    .modal-header {
        border-bottom: 1px solid #eee;
        color: #313131;
        justify-content: space-between;
        padding: 15px;
        display: flex;
    }
    .modal-body {
        position:relative;
        padding: 20ox 10 px;
    }

    
    .btn-close, .btn-confirm {
        border-radius: 8px;
        margin-left: 15px;
        width: 100px;
        height: 45px;
        border: none;
        cursor: pointer;
    }
    .btn-close {
        color: #fff;
        background-color: gray;
      
    }

    .btn-confirm {
        color: #fff;
        background-color: #2d8cf0;
        margin-right: 16px;
    }

    .modal-footer{
        position:absolute;
        bottom: 5px;
        display: flex;
        justify-content: flex-end;
        align-items: flex-end;
        width: 100%;
    }
</style>