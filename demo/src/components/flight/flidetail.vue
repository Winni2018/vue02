<template>
	<div>
		<div class="aa5">
			<span class="aa6">出发时间:</span>
			<span class="aa7">{{info.startTime}}</span>
		</div>
		<div class="aa5">
			<span class="aa6">出发机场:</span>
            <span class="aa7">{{info.startAirport}}</span>
		</div>
		<div class="aa5">
			<span class="aa6">中转到达时间:</span>
			<span class="aa7">{{info.transferStartTime}}</span>
		</div>
		<div class="aa5">
			<span class="aa6">中转开始时间:</span>
			<span class="aa7">{{info.transferEndTime}}</span>
		</div>
		<div class="aa5">
			<span class="aa6">中转机场:</span>
           	<span class="aa7">{{info.transferAirport}}</span>
		</div>
		<div class="aa5">
			<span class="aa6">落地时间</span>
			<span class="aa7">{{info.overTime}}</span>	
		</div>
		<div class="aa5">
			<span class="aa6">落地机场:</span>
            <span class="aa7">{{info.overAirport}}</span>
		</div>
		<div class="aa5">
			<span class="aa6">航空公司:</span>
            <span class="aa7">{{info.airlineAirway}}</span>
		</div>
		<div class="aa5">
			<span class="aa6">中转航空公司:</span>
            <span class="aa7">{{info.transferAirlineAirway}}</span>
		</div>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				
				info:{}
				
			}
		},
		props:['info2'],
		created(){
			console.log(this.info2)
			this.info=this.info2
		},
		methods:{
		}
	}
</script>

<style>
	.aa5{
		
		display: flex;
		justify-content: center;
		align-items: center;
		margin-bottom: 10px;
	}
	.aa6{
		width: 120px;
		text-align: right;
		margin-right: 5px;
	}
	.aa7{
		margin-left: 10px;
		width: 120px;
		text-align: left;
	}
</style>