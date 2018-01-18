<style lang="less" scoped>
	.partTime{
        width: 75%;
        height: auto;
        margin: 30px auto 0 auto;
        text-align: left;
	}
    .ivu-form-item,
    .addBTN
    {
        margin-bottom: 40px;
    }

</style>
<style lang="less">
    .job_exe,
    .job_timelimit,
    .job_addresscan,
    .job_priceday{
        .ivu-form-item-label{
            &:before{
                content: '*';
                display: inline-block;
                margin-right: 4px;
                line-height: 1;
                font-family: SimSun;
                font-size: 12px;
                color: #ed3f14;
            }
        }
    }
</style>
<template>
	<div>
		<Card class="partTime">
            <Form ref="formValidate"
                :model="formValidate"
                label-position="top"
                :rules="ruleValidate"
            >
                <Form-item label="目前状态" prop="now_status">
                    <Radio-group v-model ="formValidate.now_status">
                        <Radio label="在职"></Radio>
                        <Radio label="自由职业者"></Radio>
                    </Radio-group>
                </Form-item>

		        <Form-item label="可兼职时间" prop="job_timecan">
		            <Checkbox-group v-model="formValidate.job_timecan">
		                <Checkbox label="周六"></Checkbox>
		                <Checkbox label="周日"></Checkbox>
		                <Checkbox label="工作日下班后"></Checkbox>
		            </Checkbox-group>
		        </Form-item>
		 		<Form-item
		            v-for="(item, index) in formValidate.job_exe"
		            :key="index"
		            :label="'公司/职位 *' + (index + 1)"
                    class="job_exe"
                >
		            <Row>
		                <Col span="9">
                            <Form-item
                                style="margin-bottom:0;"
                                :prop="'job_exe.' + index + '.value1'"
                                :rules="{required: true, message: '公司*' + (index + 1) +'不能为空', trigger: 'blur'}">
    		                    <Input
                                   type="text"
                                   v-model="item.value1"
                                   placeholder="曾就职的最知名的公司简称"
                                ></Input>
                            </Form-item>
		                </Col>
		                <Col span="9">
                            <Form-item
                                style="margin-bottom:0;"
                                :prop="'job_exe.' + index + '.value2'"
                                :rules="{required: true, message: '职位*' + (index + 1) +'不能为空', trigger: 'blur'}">
                                <Input
                                   type="text"
                                   v-model="item.value2"
                                   placeholder="如：高级iOS工程师"
                                ></Input>
                            </Form-item>
		                </Col>
		                <Col span="6">
		                    <Button type="success" @click="handleRemove(index)" long v-if="index>0">删除</Button>
		                </Col>
		            </Row>
		        </Form-item>

                <Button type="dashed" long @click="handleAdd" icon="plus-round" class="addBTN">新增</Button>
		  		<Form-item label="工作年限" prop="job_timelimit" class="job_timelimit">
                    <Input-number :max="10" :min="1" v-model="formValidate.job_timelimit" style="width: 100%;" ></Input-number>
		        </Form-item>
		 		<Form-item
		            label="可兼职区域"
                    class="job_addresscan"
		        >
		            <Row>
		                <Col span="8">
                            <Form-item
                                style="margin-bottom:0;"
                                prop="job_addresscan.city"
                                :rules="{required: true, message: '请选择您期望的工作城市', trigger: 'change'}">
    				            <Select placeholder="城市" v-model="formValidate.job_addresscan.city">
    				            	<Option value="" @click.native = "areaJson={}">城市</Option>
    				                <Option
                                        v-for="(item,index) in cityJson"
                                        :key="index"
                                        :value="item.label"
                                        @click.native = "
                                            areaJson = item.children
                                        "
                                    >
                                            {{item.label}}
                                    </Option>
    				            </Select>
                            </Form-item>
		                </Col>
		                <Col span="8">
                            <Form-item
                                style="margin-bottom:0;"
                                prop="job_addresscan.area"
                                :rules="{required: true, message: '请选择您期望的工作区域范围', trigger: 'change'}">
    				            <Select placeholder="区域范围" v-model="formValidate.job_addresscan.area">
    				            	<Option value="">区域范围</Option>
                                    <Option
                                        v-for="(item,index) in areaJson"
                                        :key="index"
                                        :value="item.label"
                                    >
                                        {{ item.label }}
                                    </Option>
    				            </Select>
                            </Form-item>
		                </Col>
		                <Col span="8">
                            <Form-item
                                style="margin-bottom:0;"
                                prop="job_addresscan.detail"
                                :rules="{required: true, message: '请选择您期望的工作详细地址', trigger: 'blur'}">
		                        <Input type="text" v-model="formValidate.job_addresscan.detail"  placeholder="详细信息，如“xxx路xxx号"></Input>
                            </Form-item>

		                </Col>
		            </Row>
		        </Form-item>
		  		<Form-item label="日薪**工作8小时计为一天,请填写日薪" prop="job_priceday" class="job_priceday">
                    <Input-number :max="1000" :min="100" :step="100" v-model="formValidate.job_priceday" style="width: 100%;" ></Input-number>
		        </Form-item>
		  		<Form-item label="顾问角色" prop="user_type">
		            <Select placeholder="顾问角色" v-model="formValidate.user_type" >
		            	<Option value="">顾问角色</Option>
                        <Option v-for="(item,index) in roleJson" :key="index" :value="item.label" >
                             {{item.label}}
                        </Option>

		            </Select>
		        </Form-item>
                <Form-item label="请填写所需技能" prop="user_skills" class="user_skills">
                    <div style="overflow:hidden;">
                        <Input
                            v-model="user_skill_one"
                            placeholder="请输入职位所需要的技能"
                            style="float:left; width:60%;"
                            @on-enter="handleAdd2"
                        ></Input>
                        <Button
                            type="default"
                            style="float:right;width:40%;"
                            @click="handleAdd2"
                        >添加</Button>
                    </div>
                    <Tag
                        closable
                        color="green"
                        type="dot"
                        v-for="(item,index) in formValidate.user_skills"
                        :key="index"
                        :name="item"
                        @on-close="handleClose2"
                        class="skillTag"
                    >{{item}}</Tag>
                </Form-item>

                </Form-item>
                <Form-item label="技术详述" prop="user_skillsexe">
                    <Input
                        v-model="formValidate.user_skillsexe"
                        type="textarea"
                        :autosize="{minRows: 5,maxRows: 20}"
                        placeholder="
                        请详细填写您的技术经验和能力情况，展示您的实力，有利于更多公司预约您。请不要小于140字。例：
                        1.xxxxxxxxxxx
                        2.xxxxxxxxxxxxxx
                        3.xxxxx"
                    >
                    </Input>
                </Form-item>
                <Form-item label="项目经验" prop="user_projectexe">
                    <Input v-model="formValidate.user_projectexe" type="textarea" :autosize="{minRows: 5,maxRows: 20}" placeholder="请详细填写您在工作和业余时间参与过的项目，以及您在项目中所做的具体工作，有利于更多公司预约您。请不要小于70字。"></Input>
                </Form-item>
                <Form-item label="发布兼职">
                    <Button size="large" type="success" long @click="handleSubmit('formValidate')">提交申请</Button>
                </Form-item>
        	</Form>
		</Card>
		<perfect-info v-if="!perfectInfo"></perfect-info>

	</div>
</template>
<script>
	import PerfectInfo from "@/components/common/Dialog/PerfectInfo.vue";
	export default({
		data(){
			return{
				perfectInfo : true,
                cityJson : this.cityJson,
                roleJson : this.roleJson,
                areaJson : {},
                user_skill_one : '',
				formValidate : {
                    now_status : "在职",
                    job_timecan : ['周六'],
                    job_exe : [
                        {value1:"上海允梦网络科技公司", value2:"前端工程师"}
                    ],
                    job_timelimit : 1,
                    job_addresscan : {
                        city: "",
                        area: "",
                        detail : "万柏林区千峰南路"
                    },
                    job_priceday :100,
                    user_type : "前端工程师",
                    user_skills : ["js","css"],
                    user_skillsexe : "请详细填写您的技术经验和能力情况，展示您的实力，有利于更多公司预约您。请不要小于140字。",
                    user_projectexe : "请详细填写您在工作和业余时间参与过的项目，以及您在项目中所做的具体工作，有利于更多公司预约您。请不要小于70字。",
				},
				ruleValidate : {
       				now_status: [
                        { required: true, message: '请选择您现在的工作状态', trigger: 'change' }
                    ],
                    job_timecan: [
                        { required: true, type: 'array', min: 1, message: '至少选择一个时间端', trigger: 'change' },
                    ],
                    user_type:[
                        { required: true, message: '请选择顾问角色', trigger: 'change' }
                    ],
                    user_skills :[
                        { required: true, type: 'array',message: '至少添加一个技能', trigger: 'blur' },
                    ],
                    user_skillsexe :[
                        { required: true, min:14, message: '至少140字,1.xxx;\n2.xxx\n注意条理', trigger: 'blur' }
                    ],
                    user_projectexe :[
                        { required: true, min:7, message: '至少70字,1.xxx;\n2.xxx\n注意条理', trigger: 'blur' }
                    ]
				}
			}
		},
		components:{
            PerfectInfo : PerfectInfo
        },
		mounted(){
	        var _this = this;
	        _this.qs = require('querystring');
            _this.$ajax({
                url: _this.API_ROOT + '/personal/personalReal.php',
                method: 'POST',
                data : _this.qs.stringify({status: 'check'})
            }).then((response) => {
                if(response.data.status == "success"){
                    _this.perfectInfo = response.data.realInfo.idCard == "" ?  false :  true;
                }
            });
		},
        watch:{

        },
		methods:{
            handleAdd () {
                this.formValidate.job_exe.push({
                    value: ''
                });
            },
            handleRemove (index) {
                this.formValidate.job_exe.splice(index, 1);
            },
            handleAdd2 () {
                let a = this.user_skill_one;
                let arr = this.formValidate.user_skills;
                if (a !== "") {
                    arr.push( a );
                    this.formValidate.user_skills = [...new Set(arr)];
                    this.user_skill_one = "";
                } else {
                   this.$Message.info('不能为空');
                }
            },
            handleClose2 (event, name) {
                const index = this.formValidate.user_skills.indexOf(name);
                this.formValidate.user_skills.splice(index, 1);
            },
            handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.saveInfo();
                    } else {
                        this.$Message.error('表单验证失败!');
                    }
                })
            },
            saveInfo(){
                var _this = this;
                var data = this.formValidate;
                data['status'] = 'save';
                _this.$ajax({
                    url: _this.API_ROOT + '/personal/jobSeekers.php',
                    method: 'POST',
                    data : data
                }).then((response) => {
                    console.log(response.data);
                    if(response.data.status == 'success'){
                        _this.$Message.success(response.data.msg);
                    };
                });
            }
		},

	})
</script>
