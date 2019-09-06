<template>
	<div style="text-align: center;">
		{{info}}
	</div>
</template>

<script>
	export default{
		data(){
			return{
				info:""
			}
		},
		props:["remark"],
		created(){
			this.info=this.remark.remark
			console.log(this.remark.remark)
		},
		methods:{
			
		}
	}
</script>

<style>
</style>