exports.install = function (Vue, options) {
    Vue.prototype.youtuQM = function (){
        this.$ajax({
            url: 'api/common/youtuQianMing.php',
            method: 'POST',
            data : ""
        }).then((response) => {
        	this.qianming= response.data;
        });
    };
};