<template>
	<div>
		<div class="aa5">
			<span class="aa6">起点</span>
			<el-select v-model="value" placeholder="请选择" @change="change1">
				<el-option v-for="item in options" :key="item.startAddress" :label="item.startAddress" :value="item.startAddress">
				</el-option>
			</el-select>
		</div>
		<div class="aa5">
			<span class="aa6">城市</span>
			<el-select v-model="value1" placeholder="请选择" @change="changeCity1" value-key="name">
				<el-option v-for="item in options1" :key="item.name" :label="item.name" :value="item">
				</el-option>
			</el-select>
		</div>
		<div class="aa5">
			<span class="aa6">推荐景点</span>
			<el-select v-model="val" placeholder="请选择" @change="getJL1">
				<el-option v-for="item in list" :key="item.name" :label="item.name" :value="item.name">
				</el-option>
			</el-select>
		</div>
		<div class="aa5">
			<span class="aa6">城市</span>
			<el-select v-model="value2" placeholder="请选择" @change="changeCity2" value-key="name">
				<el-option v-for="item in options2" :key="item.name" :label="item.name" :value="item">
				</el-option>
			</el-select>
		</div>
		<div class="aa5">
			<span class="aa6">推荐景点</span>
			<el-select v-model="val1" placeholder="请选择" @change="getJL2">
				<el-option v-for="item in list1" :key="item.name" :label="item.name" :value="item.name">
				</el-option>
			</el-select>
		</div>
		<div class="aa5">
			<span class="aa6">城市</span>
			<el-select v-model="value3" placeholder="请选择" @change="changeCity3" value-key="name">
				<el-option v-for="item in options3" :key="item.name" :label="item.name" :value="item">
				</el-option>
			</el-select>
		</div>
		<div class="aa5">
			<span class="aa6">推荐景点</span>
			<el-select v-model="val2" placeholder="请选择" @change="getJL3">
				<el-option v-for="item in list2" :key="item.name" :label="item.name" :value="item.name">
				</el-option>
			</el-select>
		</div>
		<div class="aa5">
			<span class="aa6">城市</span>
			<el-select v-model="value4" placeholder="请选择" @change="changeCity4" value-key="name">
				<el-option v-for="item in options4" :key="item.name" :label="item.name" :value="item">
				</el-option>
			</el-select>
		</div>
		<div class="aa5">
			<span class="aa6">推荐景点</span>
			<el-select v-model="val3" placeholder="请选择" @change="getJL4">
				<el-option v-for="item in list3" :key="item.name" :label="item.name" :value="item.name">
				</el-option>
			</el-select>
		</div>
		<div class="aa5">
			<span class="aa6">终点</span>
			<el-select v-model="val4" placeholder="请选择">
				<el-option v-for="item in list4" :key="item.value" :label="item.endAddress" :value="item.endAddress">
				</el-option>
			</el-select>
		</div>
	</div>
</template>

<script>

	export default {
		data() {
			return {
				options: [],
				options1: [],
				options2: [],
				options3: [],
				options4: [],
				value: "",
				value1: "",
				value2: "",
				value3: "",
				value4: "",
				val: "",
				val1: "",
				val2: "",
				val3: "",
				val4: "",
				list: [],
				list1: [],
				list2: [],
				list3: [],
				list4: [],
				reg1: "",
				add1: "",
				add2: "",
				add3: "",
				add4: "",
				longitude1: "",
				longitude2: "",
				longitude3: "",
				longitude4: "",
				latitude1: "",
				latitude2: "",
				latitude3: "",
				latitude4: "",
				n1: "",
				n2: "",
				n3: "",
				n4: ""
			}
		},
		props: ['info', 'info1'],
		created() {
			console.log(this.info, this.info1)
			this.value = this.info.startCity;
			this.value1 = this.info.city1;
			this.value2 = this.info.city2;
			this.value3 = this.info.city3;
			this.value4 = this.info.city4;
			this.val = this.info.scenic1;
			this.val1 = this.info.scenic2;
			this.val2 = this.info.scenic3;
			this.val3 = this.info.scenic4;
			this.val4 = this.info.endCity;
			this.longitude1 = this.info.longitude1;
			this.latitude1 = this.info.latitude1;
			this.longitude2 = this.info.longitude2;
			this.latitude2 = this.info.latitude2;
			this.longitude3 = this.info.longitude3;
			this.latitude3 = this.info.latitude3;
			this.longitude4 = this.info.longitude4;
			this.latitude4 = this.info.latitude4;
			this.startAddress()
			//this.getTaiWanCity()
			this._getData('common/getTaiWanCity', {}, data => {
				this.options1 = data
				this.options2 = data
				this.options3 = data
				this.options4 = data
				this.options1.map((item, index) => {
					if(item.name == this.value1) {
						this.changeCity1(item)
					} else {
						item = {}
					}
				})
				this.options2.map((item, index) => {
					if(item.name == this.value2) {
						this.changeCity2(item)
					}
				})
				this.options3.map((item, index) => {
					if(item.name == this.value3) {
						this.changeCity3(item)
					}
				})
				this.options4.map((item, index) => {
					if(item.name == this.value4) {
						this.changeCity4(item)
					}
				})
			});
			this._getData('admin/endAddress', {
					startAddress: this.info.startCity
				}, data => {
					console.log(data)
					this.list4 = data
				})
		},
		methods: {
			baiduget1() {
				this._getData('admin/selectCityLonAndLat', {
					address:"台湾省" + this.value1 + this.n1
				},data =>{
					/*console.log(data)
					this.longitude1 = data.location.lng;
					this.latitude1 = data.location.lat;
					*/
					if(data==null){
						console.log(1)
						this._getData('admin/selectCityLonAndLat', {
							address:"福建省" + this.value1 + this.n1
						},res=>{
							console.log(res.location)
							this.longitude1 = res.location.lng;
							this.latitude1 = res.location.lat;
						})
					}else{
					this.longitude1 = data.location.lng;
					this.latitude1 = data.location.lat;
					}

				})

			},
			baiduget2() {
				this._getData('admin/selectCityLonAndLat', {
					address:"台湾省" + this.value2 + this.n2
				},data =>{
					if(data==null){
						
						this._getData('admin/selectCityLonAndLat', {
							address:"福建省" + this.value2 + this.n2
						},res=>{
							console.log(res.location)
							this.longitude2 = res.location.lng;
							this.latitude2 = res.location.lat;
						})
					}else{
					this.longitude2 = data.location.lng;
					this.latitude2 = data.location.lat;
					}

				})

			},
			baiduget3() {
				this._getData('admin/selectCityLonAndLat', {
					address:"台湾省" + this.value3 + this.n3
				},data =>{
					if(data==null){
						console.log(1)
						this._getData('admin/selectCityLonAndLat', {
							address:"福建省" + this.value3 + this.n3
						},res=>{
							console.log(res.location)
							this.longitude3 = res.location.lng;
							this.latitude3 = res.location.lat;
						})
					}else{
					this.longitude3 = data.location.lng;
					this.latitude3 = data.location.lat;
					}

				})

			},
			baiduget4() {
				this._getData('admin/selectCityLonAndLat', {
					address:"台湾省" + this.value4 + this.n4
				},data =>{
					if(data==null){
						console.log(1)
						this._getData('admin/selectCityLonAndLat', {
							address:"福建省" + this.value4 + this.n4
						},res=>{
							console.log(res.location)
							this.longitude4 = res.location.lng;
							this.latitude4 = res.location.lat;
						})
					}else{
					this.longitude4 = data.location.lng;
					this.latitude4 = data.location.lat;
					}

				})
			},
			getJL1(val) {
				this.n1 = val;
				console.log("台湾省" + this.value1 + this.n1)
				//	this.geoCode()
				this.baiduget1()
			},
			getJL2(val) {
				this.n2 = val;
				console.log("台湾省" + this.value2 + this.n2)
				this.baiduget2()
			},
			getJL3(val) {
				this.n3 = val;
				console.log("台湾省" + this.value3 + this.n3)
				this.baiduget3()
			},
			getJL4(val) {
				this.n4 = val;
				console.log("台湾省" + this.value4 + this.n4)
				this.baiduget4()
			},
			//出发城市下拉框
			startAddress() {
				this._getData('admin/startAddress', {}, data => {
					this.options = data
				})
			},
			//出发城市下拉事件  获取到达城市二级联动
			change1(val) {
				console.log(val)
				this.reg1 = val
				if(val != this.info.startCity) {
					this.val4 = ""
				}
				this._getData('admin/endAddress', {
					startAddress: val
				}, data => {
					console.log(data)
					this.list4 = data
				})
			},
			//城市1的下拉事件
			changeCity1(val) {
				console.log(val)
				this.value1 = val.name
				if(val.name != this.info.city1) {
					this.val = ""
				}
				console.log(val)
				this._getData('common/getTaiWanAreaByCity', {
					parent: val.code
				}, data => {
					console.log(data)
					this.list = data

				})
			},
			changeCity2(val) {
				this.value2 = val.name
				console.log(val)
				if(val.name != this.info.city2) {
					this.val1 = ""
				}
				this._getData('common/getTaiWanAreaByCity', {
					parent: val.code
				}, data => {
					console.log(data)
					this.list1 = data

				})
			},
			changeCity3(val) {
				this.value3 = val.name
				console.log(val)
				if(val.name != this.info.city3) {
					this.val2 = ""
				}
				this._getData('common/getTaiWanAreaByCity', {
					parent: val.code
				}, data => {
					console.log(data)
					this.list2 = data

				})
			},
			changeCity4(val) {
				this.value4 = val.name
				console.log(val)
				if(val.name != this.info.city4) {
					this.val3 = ""
				}
				this._getData('common/getTaiWanAreaByCity', {
					parent: val.code
				}, data => {
					console.log(data)
					this.list3 = data

				})
			},
			//城市字典表
			getTaiWanCity() {
				this._getData('common/getTaiWanCity', {}, data => {
					this.options1 = data
					this.options2 = data
					this.options3 = data
					this.options4 = data

				})
			},
			add() {
				if(this.val == "" || this.val1 == "" || this.val2 == "" || this.val3 == "" || this.val4 == "") {
					this.$message({
						message: '请填写完整',
						type: 'warning'

					})
					return
				}
				console.log(this.value1, this.value2, this.value3, this.value4)
				this._getData('admin/updatePath', {
					longitude1: this.longitude1,
					latitude1: this.latitude1,
					longitude2: this.longitude2,
					latitude2: this.latitude2,
					longitude3: this.longitude3,
					latitude3: this.latitude3,
					longitude4: this.longitude4,
					latitude4: this.latitude4,
					id: this.info1.id,
					startCity: this.value,
					endCity: this.val4,
					city1: this.value1,
					city3: this.value3,
					city2: this.value2,
					city4: this.value4,
					scenic1: this.val,
					scenic2: this.val1,
					scenic3: this.val2,
					scenic4: this.val3,
				}, data => {
					this.$message({
						message: '修改成功',
						type: 'success'

					})
					this.$emit("handleClose1")
				})
			}
		}
	}
</script>

<style scoped="scoped">
	.aa5 {
		display: flex;
		justify-content: center;
		align-items: center;
		margin-bottom: 10px;
	}
	
	.aa6 {
		width: 100px;
		text-align: right;
		margin-right: 5px;
	}
</style>
