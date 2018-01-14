<style lang="less" >
    .PublicJob{
        width: 75%;
        margin: 30px auto 0 auto;
        text-align: left;

        .job_addresscan,
        .total,
        .date,
        .oneday
        {
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
    }
    [long]{
        width: 100%;
    }
</style>

<template>
    <div>
        <Card class="PublicJob">
            <Form ref="formValidate"
                :model="formValidate"
                label-position="top"
                :rules="ruleValidate"
            >
                <Form-item label="选择您的用人类别" prop="user_type">
                    <Select v-model="formValidate.user_type"  placeholder="请选择人才类别">
                        <Option value="">选择人才类别</Option>
                        <Option v-for="(item,index) in roleJson" :key="index" :value="item.label" >
                             {{item.label}}
                        </Option>
                    </Select>
                </Form-item>
                <Form-item label="请选择您的项目类别" prop="projectClass">
                    <Select v-model="formValidate.projectClass"  placeholder="选择项目类别">
                        <Option value="">选择项目类别</Option>
                        <Option v-for="(item,index) in projectJson" :key="index" :value="item.label" >
                             {{item.label}}
                        </Option>
                    </Select>
                </Form-item>
                <Form-item label="请输入项目名称" prop="projectName">
                    <Input v-model="formValidate.projectName" placeholder="项目名称"></Input>
                </Form-item>
                <Form-item label="请填写项目描述" prop="projectDesc">
                    <Input v-model="formValidate.projectDesc" type="textarea" :autosize="{minRows: 5,maxRows: 20}" placeholder="请条理清晰地列出兼职岗位职责，以及兼职要求。不少于100字"></Input>
                </Form-item>
                <Form-item label="请填写所需技能" prop="user_skills">
                    <div style="overflow:hidden;">
                        <Input
                            v-model="user_skill_one"
                            placeholder="请输入职位所需要的技能"
                            style="float:left; width:90%;"
                            @on-enter="handleAdd"
                        ></Input>
                        <Button
                            type="default"
                            style="float:right;width:10%;"
                            @click="handleAdd"
                        >添加</Button>
                    </div>
                    <Tag
                        closable
                        color="blue"
                        type="dot"
                        v-for="(item,index) in formValidate.user_skills"
                        :key="index"
                        :name="item"
                        @on-close="handleClose2"
                    >{{item}}</Tag>
                </Form-item>
                <Form-item label="请选择您期望的付款方式" prop="payWay">
                    <Radio-group v-model="formValidate.payWay">
                        <Radio label="项目制"></Radio>
                        <Radio label="日薪制"></Radio>
                    </Radio-group>
                </Form-item>
                <div v-if="formValidate.payWay == '项目制'" style="padding: 0 5% 30px 5%;">
                    <Form-item label="请输入总预算" prop="projectScheme.total" class="total">
                        <Input-number :step=100 type="text" v-model="formValidate.projectScheme.total" long></Input-number>
                    </Form-item>
                    <Form-item label="请输入工作时长（天）" prop="projectScheme.date" class="date">
                        <Input-number v-model="formValidate.projectScheme.date" long></Input-number>
                    </Form-item>
                    <p>平均日薪&nbsp;<strong><i>{{parseInt(formValidate.projectScheme.total / formValidate.projectScheme.date)}}</i></strong>&nbsp;元</p>
                </div>
                <div v-else-if="formValidate.payWay == '日薪制'" style="padding: 0 5% 30px 5%;">
                    <Form-item label="请输入愿付日薪（每工作8小时计为一天）" prop="dailyWageSystem.oneDay" class="oneDay">
                        <Input-number :step=100 v-model="formValidate.dailyWageSystem.oneDay" long></Input-number>
                    </Form-item>
                    <Form-item label="请输入预估工期（天）" prop="dailyWageSystem.date" class="date">
                        <Input-number v-model="formValidate.dailyWageSystem.date" long></Input-number>
                    </Form-item>
                    <p>预计总金额&nbsp;<strong><i>{{parseInt(formValidate.dailyWageSystem.oneDay * formValidate.dailyWageSystem.date)}}</i></strong>&nbsp;元</p>
                </div>
                <Form-item label="请选择您希望的工作方式" prop="workWay">
                    <Select placeholder="请选择" v-model="formValidate.workWay">
                        <Option value="全程坐班">全程坐班</Option>
                        <Option value="定期坐班">定期坐班</Option>
                        <Option value="远程">远程</Option>
                    </Select>
                </Form-item>
                <Form-item label="请输入您期望的个人所在地或工作地点" class="job_addresscan">
                    <Form-item
                        style="margin-bottom:30px;width:50%; float:left;"
                        prop="job_addresscan.city"
                        :rules="{required: true, message: '请选择您期望的工作城市', trigger: 'change'}">
                        <Select placeholder="请选择城市" v-model="formValidate.job_addresscan.city">
                            <Option value="" @click.native = "areaJson={}">请选择城市</Option>
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
                    <Form-item
                        style="margin-bottom:0;width:49%; float:right;"
                        prop="job_addresscan.area"
                        :rules="{required: true, message: '请选择您期望的工作区域范围', trigger: 'change'}">
                        <Select placeholder="请选择区域范围" v-model="formValidate.job_addresscan.area">
                            <Option value="">请选择区域范围</Option>
                            <Option
                                v-for="(item,index) in areaJson"
                                :key="index"
                                :value="item.label"
                            >
                                {{ item.label }}
                            </Option>
                        </Select>
                    </Form-item>
                    <Form-item
                        style="margin-bottom:30px; clear:left;"
                        prop="job_addresscan.detail"
                        :rules="{required: true, message: '请选择您期望的工作详细地址', trigger: 'blur'}">
                        <Input type="text" placeholder="请输入您期望的个人所在地或工作地点，尽量填写具体地址" v-model="formValidate.job_addresscan.detail"></Input>
                    </Form-item>
                </Form-item>
                <Form-item label="请输入您期望开始的工作日期" prop="workTimeStart">
                    <Date-picker type="date" placeholder="选择日期" v-model="formValidate.workTimeStart" style="width:100%;"></Date-picker>
                </Form-item>
                <Form-item label="公司名称" prop="companyName">
                     <Input type="text" placeholder="请输入公司名称" v-model="formValidate.companyName"></Input>
                </Form-item>
                <Form-item label="发布需求">
                    <Button size="large" type="primary" long  @click="handleSubmit('formValidate')">发布需求</Button>
                </Form-item>
            </Form>
        </Card>
        <perfect-info v-if="!perfectInfo"></perfect-info>
    </div>

</template>
<script>
    import PerfectInfo from "@/components/common/Dialog/PerfectInfo.vue";
    export default {
        data () {
            return {
                perfectInfo : true,//第一次发布需完善个人信息
                cityJson : this.cityJson,
                areaJson : {},
                roleJson : this.roleJson,
                projectJson : this.projectJson,
                user_skill_one : "",
                formValidate : {
                    user_type: "iOS工程师",
                    projectClass: "平面设计",
                    projectName : "云公网",
                    projectDesc: "招聘",
                    user_skills : ["js", "css"],
                    payWay : "项目制",
                    projectScheme: {
                        total : 100,
                        date : 1
                    },//项目制
                    dailyWageSystem: {
                        oneDay : 100,
                        date : 1,
                        total: ""
                    },//日薪制
                    workWay : "定期坐班",
                    job_addresscan : {
                        city: "",
                        area: "",
                        detail : "万柏林区千峰南路"
                    },
                    workTimeStart: "2017-08-12",
                    companyName: "烈火天使科技公司",
                },
                ruleValidate: {
                    user_type:[
                        { required: true, message: '请选择人才类别', trigger: 'change' }
                    ],
                    projectClass:[
                        { required: true, message: '请选择您的项目类别', trigger: 'change' }
                    ],
                    projectName:[
                        { required: true, message: '请输入项目名称', trigger: 'blur' }
                    ],
                    projectDesc:[
                        { required: true, min:1, message: '请填写项目描述,不少于100字', trigger: 'blur' }
                    ],
                    user_skills:[
                        { required: true, type: 'array',message: '至少添加一个技能', trigger: 'blur' },
                    ],
                    payWay:[
                        { required: true, message: '请选择您期望的付款方式', trigger: 'change' }
                    ],
                    workWay:[
                        { required: true, message: '请选择您希望的工作方式', trigger: 'change' }
                    ],
                    workTimeStart:[
                        { required: true, type: 'date', message: '请输入您期望开始的工作日期', trigger: 'change' }
                    ],
                    companyName:[
                        { required: true, message: '请输入公司名称', trigger: 'blur' }
                    ]
                },
            }
        },
        components:{
            PerfectInfo : PerfectInfo
        },
        watch:{
        },
        mounted(){
            var _this = this;
            _this.qs = require('querystring');
            _this.$ajax({
                url: 'api/website/websiteCompany.php',
                method: 'POST',
                data : _this.qs.stringify({status: 'check'})
            }).then((response) => {
                if(response.data.status == "success"){
                    _this.perfectInfo = response.data.info.license == "" ?  false :  true;
                }
            });
        },
        methods: {
            handleAdd () {
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
                console.log(this.formValidate);
                var _this = this;
                var data = JSON.parse(JSON.stringify(this.formValidate));
                data['status'] = 'save';

                switch (data.payWay){
                    case "项目制":
                        delete data.dailyWageSystem;
                        break;
                    case "日薪制":
                        delete data.projectScheme;
                        break;
                };

                _this.$ajax({
                    url: 'api/website/publicJob.php',
                    method: 'POST',
                    data : data
                }).then((response) => {
                    console.log(response.data);
                    if(response.data.status == 'success'){
                        _this.$Message.success(response.data.msg);
                    };
                });
            }
        }
    }
</script>
