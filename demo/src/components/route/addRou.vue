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

		<div id="container"></div>
		<!--<div>
           <el-amap-search-box  :search-option="searchOption" :on-search-result="onSearchResult" :default="moren"></el-amap-search-box> 
      </div>-->
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
				n4: "",
				f1: "",
				f2:""
			}
		},
		created() {
			this.startAddress()
			this.getTaiWanCity()

		},
		methods: {
			baiduget1() {
				this._getData('admin/selectCityLonAndLat', {
					address:"台湾省" + this.value1.name + this.n1
				},data =>{
					console.log(data)
					if(data==null){
						console.log(1)
						this._getData('admin/selectCityLonAndLat', {
							address:"福建省" + this.value1.name + this.n1
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
					address:"台湾省" + this.value2.name + this.n2
				},data =>{
					if(data==null){
						console.log(1)
						this._getData('admin/selectCityLonAndLat', {
							address:"福建省" + this.value2.name + this.n2
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
					address:"台湾省" + this.value3.name + this.n3
				},data =>{
					if(data==null){
						console.log(1)
						this._getData('admin/selectCityLonAndLat', {
							address:"福建省" + this.value3.name + this.n3
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
					address:"台湾省" + this.value4.name + this.n4
				},data =>{
					if(data==null){
						console.log(1)
						this._getData('admin/selectCityLonAndLat', {
							address:"福建省" + this.value4.name + this.n4
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
				console.log("台湾省" + this.value1.name + this.n1)
				//	this.geoCode()
				this.baiduget1()
			},
			getJL2(val) {
				this.n2 = val;
				console.log("台湾省" + this.value2.name + this.n2)
				this.baiduget2()
			},
			getJL3(val) {
				this.n3 = val;
				console.log("台湾省" + this.value3.name + this.n3)
				this.baiduget3()
			},
			getJL4(val) {
				this.n4 = val;
				console.log("台湾省" + this.value4.name + this.n4)
				this.baiduget4()
			},
			//精华
			/*handlego(){
    		this.geoCode()
    	},*/
			/*handlew(e){
	    	if (e.keyCode === 13) {
	            geoCode();
	            return false;
	        }
	        return true;
    	},*/
			/*  geoCode() {
	    	var that=this
    	 	var map = new AMap.Map("container", {
        		resizeEnable: true
    		});
    
    	var geocoder,marker;
    	 if(!geocoder){
            geocoder = new AMap.Geocoder({
                
            });
        }
        /*var address  = document.getElementById('address').value;
        geocoder.getLocation(this.value1.name+this.n1, function(status, result) {
            if (status === 'complete'&&result.geocodes.length) {
                var lnglat = result.geocodes[0].location
                console.log(lnglat.lng,lnglat.lat)
                that.longitude1=lnglat.lng;
                that.latitude1=lnglat.lat
               /* document.getElementById('lnglat').value = lnglat;
                if(!marker){
                    marker = new AMap.Marker();
                    map.add(marker);
                }
                marker.setPosition(lnglat);
                map.setFitView(marker);
            }
            else{
            	that.longitude1="";
                that.latitude1=""
            }
        })
        },
         geoCode2() {
         	var that=this
    	 	var map = new AMap.Map("container", {
        		resizeEnable: true
    		});
    
    	var geocoder,marker;
    	 if(!geocoder){
            geocoder = new AMap.Geocoder({
                
            });
        }
        /*var address  = document.getElementById('address').value;
        geocoder.getLocation(this.value2.name+this.n2, function(status, result) {
            if (status === 'complete'&&result.geocodes.length) {
                var lnglat = result.geocodes[0].location
                console.log(lnglat.lng,lnglat.lat)
                that.longitude2=lnglat.lng;
                that.latitude2=lnglat.lat
               /* document.getElementById('lnglat').value = lnglat;
                if(!marker){
                    marker = new AMap.Marker();
                    map.add(marker);
                }
                marker.setPosition(lnglat);
                map.setFitView(marker);
            }
            else{
            	that.longitude2="";
                that.latitude2=""
            }
        })
        },
         geoCode3() {
         	var that=this
    	 	var map = new AMap.Map("container", {
        		resizeEnable: true
    		});
    
    	var geocoder,marker;
    	 if(!geocoder){
            geocoder = new AMap.Geocoder({
                
            });
        }
        /*var address  = document.getElementById('address').value;
        geocoder.getLocation(this.value3.name+this.n3, function(status, result) {
            if (status === 'complete'&&result.geocodes.length) {
                var lnglat = result.geocodes[0].location
                console.log(lnglat.lng,lnglat.lat)
                that.longitude3=lnglat.lng;
                that.latitude3=lnglat.lat
               /* document.getElementById('lnglat').value = lnglat;
                if(!marker){
                    marker = new AMap.Marker();
                    map.add(marker);
                }
                marker.setPosition(lnglat);
                map.setFitView(marker);
            }
            else{
            	that.longitude3="";
                that.latitude3=""
            }
        })
        },
         geoCode4() {
         	var that=this
    	 	var map = new AMap.Map("container", {
        		resizeEnable: true
    		});
    
    	var geocoder,marker;
    	 if(!geocoder){
            geocoder = new AMap.Geocoder({
                
            });
        }
        var address  = document.getElementById('address').value;
        geocoder.getLocation(this.value4.name+this.n4, function(status, result) {
            if (status === 'complete'&&result.geocodes.length) {
                var lnglat = result.geocodes[0].location
                console.log(lnglat.lng,lnglat.lat)
                that.longitude4=lnglat.lng;
                that.latitude4=lnglat.lat
               /* document.getElementById('lnglat').value = lnglat;
                if(!marker){
                    marker = new AMap.Marker();
                    map.add(marker);
                }
                marker.setPosition(lnglat);
                map.setFitView(marker);
            }
            else{
            	that.longitude4="";
                that.latitude4=""
            }
        })
        },*/

			//出发城市下拉框
			startAddress() {
				this._getData('admin/startAddress', {}, data => {
					this.options = data
				})
			},
			//出发城市下拉事件  获取到达城市二级联动
			change1(val) {
				console.log(val)
				this.reg1 = val;
				if(this.val4){
					this.val4=""
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
				console.log(this.val)
				this.f1 = val.name
				if(this.val) {
					this.val = ""
				}
				this._getData('common/getTaiWanAreaByCity', {
					parent: val.code
				}, data => {
					console.log(data)
					this.list = data

				})

			},
			changeCity2(val) {
				console.log(val,this.val1)
				if(this.val1) {
					this.val1 = ""
				}
				this._getData('common/getTaiWanAreaByCity', {
					parent: val.code
				}, data => {
					console.log(data)
					this.list1 = data
					this

				})
			},
			changeCity3(val) {
				console.log(val)
				if(this.val2) {
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
				console.log(val)
				if(this.val3) {
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

				if(this.value == "" || this.val == "" || this.val1 == "" || this.val2 == "" || this.val3 == "" || this.value1.name == "" || this.value2.name == "" || this.value3.name == "" || this.value4.name == "") {
					this.$message({
						message: '请填写完整',
						type: 'warning'

					})
					return
				}
				console.log(this.value1, this.value2, this.value3, this.value4)
				this._getData('admin/addPath', {
					longitude1: this.longitude1,
					latitude1: this.latitude1,
					longitude2: this.longitude2,
					latitude2: this.latitude2,
					longitude3: this.longitude3,
					latitude3: this.latitude3,
					longitude4: this.longitude4,
					latitude4: this.latitude4,
					startCity: this.value,
					endCity: this.val4,
					city1: this.value1.name,
					city3: this.value3.name,
					city2: this.value2.name,
					city4: this.value4.name,
					scenic1: this.val,
					scenic2: this.val1,
					scenic3: this.val2,
					scenic4: this.val3,
				}, data => {
					this.$message({
						message: '新增成功',
						type: 'success'

					})
					this.$emit("handleClose2")
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
	
	.amap-demo {
		height: 300px;
	}
</style>
