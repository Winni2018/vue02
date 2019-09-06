<template>
  <div>
    <div>
    	<p style="padding-left: 220px;padding-top: 10px">标题:{{list.title}}</p>
    </div>
    <div >
    	<p style="padding-left: 220px;padding-top: 20px">电话:{{list.phone}}</p>
    </div>
    <div>
    	<p style="padding-left: 220px;padding-top: 20px">地址:{{list.address}}</p>
    </div>
    <div>
    	<p style="padding-left: 220px;padding-top: 20px">人均:{{list.avgMoeny}}</p>
    </div>
    <div>
    	<p style="padding-left: 220px;padding-top: 20px">内容:{{list.content}}</p>
    </div>
  </div>
</template>

<script>
    export default {

      data() {
        return {
          tableData: {},
          list:{

          }


        }
      },
      props: ["informationinfo"],
      created() {
        console.log(this.informationinfo)
        this.getlist()
      },
      methods: {
        getlist() {
          this._getData('admin/selectMerchantNow', {
            id: this.informationinfo.id,

          }, data => {
            console.log(data)
            this.list = data

          })
        },
      }
    }
</script>

<style scoped>
</style>
