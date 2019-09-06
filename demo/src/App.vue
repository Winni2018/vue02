<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  
}
</script>

<style>
	
	  #app {
        width: 100%;
        height: 100%;
        min-width: 1000px;
    }

    .act {
        width: calc(100vw - 40px);
        padding-top: 20px;
        box-sizing: border-box;
    }

    /* 表格行高重置 */
    .el-table th,
    .el-table tr {
        height: 30px;
    }

    .el-table th td,
    .el-table tr td {
        padding: 0px;
    }

    .el-table td,
    .el-table th {
        padding: 2px;
        height: 30px;
    }

    /* 下拉框样式 */
    .titleText {
        font-size: 14px;
        color: #606266;
        margin-right: 4px;
    }

    .tableFunc {
        width: 98%;
        margin: 10px auto;
        display: flex;
        justify-content: flex-end;
        position: relative;
        box-sizing: border-box;
        padding-left: 60px;
    }

    .tableFunc > div {
        width: auto;
        margin-right: 10px;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        flex-wrap: wrap;
    }

    .tableFuncs > div {
        display: inline-block;
        width: 215px;
    }

    .tableFunc .btnBox {
        display: inline-block;
        width: 162px;
        text-align: right;
    }

    .tableFunc1 .btnBox {
        width: 135px;
    }

    .tableFunc .addBox {
        position: absolute;
        left: 0;
    }

    /* 分页 */
    .pageBox {
        width: 98%;
        margin-left: 1%;
        display: flex;
        justify-content: flex-end;
    }
    /*弹出框列表样式*/
    .titleBox > div {
        margin-bottom: 10px;
        text-align: center;
        border-bottom: 1px solid #ddd;
        padding-bottom: 5px;
    }

    .titleBox label {
        display: inline-block;
        float: left;
    }

    .listBox {
        display: inline-block;
    }

    .el-dialog {
        border-radius: 10px;
    }

    .dataBox .el-range-editor--mini.el-input__inner {
        width: 207px !important;
    }

    /*详情标签页样式*/
    .el-tabs--border-card > .el-tabs__content {
        padding: 0px;
    }
    /*颜色*/
    .redWord{
        color: #f56c6c;
    }
    .el-submenu__title{
		padding-left: 40px !important;
	}
	.el-menu-item{
		padding-left: 40px !important;
	}
	.p-60{
		padding-left: 60px !important;
	}
</style>
