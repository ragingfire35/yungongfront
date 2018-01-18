exports.install = function (Vue, options) {
    Vue.prototype.youtuQM = function (){
        var _this = this;
        _this.qs = require('querystring');
        _this.$ajax({
            url: _this.API_ROOT + '/common/youtuQianMing.php',
            method: 'POST',
            data : ""
        }).then((response) => {
            _this.qianming= response.data;
        });
    };
};