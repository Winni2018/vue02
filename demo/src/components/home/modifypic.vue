<template>
	<div>
		<div class="disFlex">      
                    <div class="kuangzi">
                        <up-ali class="img_cha" ref="aliComponent2" @getUrl="imgUrl2($event, 1)" :fileNumber="1"
                                :imgWidth="210" :imgHeight="120" :defaultImg="formData.pic" :modifylist="modifylist"
                        ></up-ali>
                    </div>   
        </div>
        <div style="display: flex;justify-content: center;align-items: center;">
        <p style="margin-right: 10px;">排序</p>
        <el-select v-model="value" placeholder="请选择" @change="change" style="width: 170px;">
		    <el-option
		      v-for="item in options"
		      :key="item.value"
		      :label="item.label"
		      :value="item.value"	     
		      >
		    </el-option>
        </el-select>
        </div>
        <div style="display: flex;justify-content: center;align-items: center;margin-top: 10px;">
        	<p style="text-align: left;">超链接</p>
        	<el-input v-model="input" style="width: 170px;" disabled></el-input>
        </div>
	</div>
</template>
 
<script>
	import upAli from './upload1-ali'
	export default{
		 data () {
            return {
                form: {},
                formData: {},
                clearpic: '123',
                options: [{
			          value: '1',
			          label: '1'
			        }, {
			          value: '2',
			          label: '2'
			        }, {
			          value: '3',
			          label: '3'
			        }],
                value:1,
                input: '',
                val:"",
                modifylist:{}
			  
                
              
            }
        },
        props:["modifyinfo"],
		components: {
            upAli
        },
        methods: {
            change(val){
            	this.value=val
            },
            clearData () {
                this.form = {};
                this.formData = [];
                this.$refs.aliComponent2.clearUrl();
            },
            imgUrl2 (e, n) {
            	console.log(e,n)
                this.formData['headPhoto' + n] = e[0];
               	this.input=this.imggerUrl+this.formData['headPhoto' + n]
            },
            getinfo(val){
            	console.log(val)
            },
            add(){
            	if ((!this.formData.headPhoto1)) {
                    this.$message({
                        message: '请检查图片是否上传成功',
                        type: 'error'
                    });
                    return;
                }else{
                	 this._getData('admin/updateBanner', {
                	 	bannerUrl:this.input,
                	 	id:this.modifyinfo.id,
                	 	url:this.input,
                	 	number:this.value
		              }, data => {
		                this.$message({
				          message: '修改成功',
				          type: 'success'
				        });
		                this.$emit('closeUsermsg1');
		                 	
		              })
                }
            }
        }, 
        // 接受父组件的值
       
        created () {
            this.modifylist = this.modifyinfo
            console.log(this.modifyinfo)
            this.input=this.modifylist.url;
            this.value=this.modifylist.number
            
        },
        watch: {
            onlyid: {
                handler (newValue, oldValue) {
                    //父组件param对象改变会触发此函数
                    console.log(newValue)
                    if (newValue == '') {
                        return;
                    }
                    // this.getList();
                },
                deep: true,
            }
        }
    }
</script>
<style scoped>
    img {
        width: 100px;
    }

    .disFlex {
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-around;
        margin-bottom: 20px;
    }

    .kuangzi {
        border: 1px dashed #ccc;
        border-radius: 8px;
    }
    .redStar{
        content: '*';
        color: #f56c6c;
        margin-right: 4px;
    }
</style>

