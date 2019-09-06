import axios from 'axios'
import {post, fetch, patch, put} from './http.js'
export default {
    install (Vue, options) {
    	//http://sscimage.oss-cn-beijing.aliyuncs.com/
        Vue.prototype.imggerUrl = "http://lanmili-test.oss-cn-beijing.aliyuncs.com/"
        Vue.prototype.fileUrl = "https://roer.oss-cn-beijing.aliyuncs.com/"
        Vue.prototype.$ali = {                                             //阿里云OSS key参数
            region: 'oss-cn-beijing',
            accessKeyId: 'LTAIj2WNv5w1Dkg1',
            accessKeySecret: 'sAtuWoTcHu4eVSTc4ilZ1uvukl5yMk',
            bucket: 'lanmili-test'
        }
        //http://123.56.97.151:8080/travel/
        //http://192.168.1.110:8082/travel/"
        //http://39.105.187.204:8080/travel/
        //http://192.168.1.110:8081/travel/
        //http://39.107.137.98:8080/travel/
        //http://39.107.70.80:8080/travel/
        //http://192.168.1.143:8888/
        //http://192.168.1.117:8080/
        Vue.prototype._getData = function (url, option, callback) {
        post("http://123.56.97.151:8080/travel/" + url, option).then(resp => {
         	 //post("http://192.168.1.143:8080/" + url, option).then(resp => {
           // post("http://39.107.70.80:8080/travel/" + url, option).then(resp => {
                if (resp.state == 1) {
                    callback(resp.data);
                } else {
                    Vue.prototype.$message({
                        message: resp.message,
                        type: 'warning'
                    });
                }
            }, error => {
                Vue.prototype.$message({
                    message: '服务器繁忙，请稍后再试',
                    type: 'error'
                });
            })
        }
    }
}
