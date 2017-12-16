<style lang="less" scoped>
    .PublicJob{
        width: 75%;
        height: 1000px;
        margin: 30px auto 0 auto;
        text-align: left;
    }
</style>

<template>
    <div>
        <Card class="PublicJob">
            <Form ref="formValidate"
                :model="formValidate"
                label-position="top"
            >
                <Form-item label="选择您的用人类别">
                    <Select v-model="formValidate.uClassify"  placeholder="请选择人才类别">
                        <Option value="">选择人才类别</Option>
                        <Option value="ios">iOS工程师</Option>
                        <Option value="android">Android工程师</Option>
                        <Option value="ui">UI设计师</Option>
                        <Option value="frontend">前端工程师</Option>
                        <Option value="backend">后端工程师</Option>
                        <Option value="pm">产品经理</Option>
                        <Option value="operator">运营/编辑</Option>
                        <Option value="tester">测试</Option>
                        <Option value="full_stack">全栈</Option>
                    </Select>
                </Form-item>
                <Form-item label="请选择您的项目类别">
                    <Select v-model="formValidate.wClassify"  placeholder="选择项目类别">
                        <Option value="">选择项目类别</Option>
                        <Option value="平面设计">平面设计</Option>
                        <Option value="APP/Web UI设计">APP/Web UI设计</Option>
                        <Option value="VI设计">VI设计</Option>
                        <Option value="插画设计">插画设计</Option>
                        <Option value="动画设计">动画设计</Option>
                        <Option value="其他">其他</Option>
                    </Select>
                </Form-item>
                <Form-item label="请输入项目名称">
                    <Input v-model="formValidate.wName" placeholder="项目名称"></Input>
                </Form-item>
                <Form-item label="请填写项目描述">
                    <Input v-model="formValidate.desc" type="textarea" :autosize="{minRows: 5,maxRows: 20}" placeholder="请条理清晰地列出兼职岗位职责，以及兼职要求。不少于100字"></Input>
                </Form-item>
                <Form-item label="请填写所需技能">
                    <div>
                        <Input
                            v-model="formValidate.skillsTag"
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
                        v-for="(item,index) in formValidate.skillsTagGroup"
                        :key="index"
                        :name="item"
                        @on-close="handleClose2"
                    >{{item}}</Tag>
                </Form-item>
                <Form-item label="请选择您期望的付款方式">
                    <Radio-group v-model="formValidate.radio">
                        <Radio label="项目制"></Radio>
                        <Radio label="日薪制"></Radio>
                    </Radio-group>

                    <div v-if="formValidate.radio == '项目制'">
                        <Input type="number"  v-model="formValidate.projectScheme.total"  placeholder="请输入总预算"></Input>
                        <Input type="number"  v-model="formValidate.projectScheme.date" placeholder="请输入工作时长（天）"></Input>
                        <p>平均日薪&nbsp;<strong><i>{{parseInt(formValidate.projectScheme.total / formValidate.projectScheme.date)}}</i></strong>&nbsp;元</p>
                    </div>
                    <div v-else-if="formValidate.radio == '日薪制'">
                        <Input type="number"  v-model="formValidate.dailyWageSystem.oneDay"  placeholder="请输入愿付日薪（每工作8小时计为一天）"></Input>
                        <Input type="number"  v-model="formValidate.dailyWageSystem.date" placeholder="请输入预估工期（天）"></Input>
                        <p>预计总金额&nbsp;<strong><i>{{parseInt(formValidate.dailyWageSystem.oneDay * formValidate.dailyWageSystem.date)}}</i></strong>&nbsp;元</p>
                    </div>
                </Form-item>

                <Form-item label="请选择您希望的工作方式">
                    <Select>
                        <Option value="like_office_worker">全程坐班</Option>
                        <Option value="like_scheduled">定期坐班</Option>
                        <Option value="like_soho">远程</Option>
                    </Select>
                </Form-item>
                <Form-item label="个人所在地或工作地点">
                    <Select style="width:50%; float:left;">
                        <Option value="">北京</Option>
                        <Option value="s">上海</Option>
                        <Option value="ss">深圳</Option>
                    </Select>
                    <Select style="width:49%; float:right;">
                        <Option value="as">1</Option>
                        <Option value="asas">2</Option>
                        <Option value="likeasas_soho">3</Option>
                    </Select>
                    <Input type="text" placeholder="个人所在地或工作地点，请尽量填写具体地址"></Input>
                </Form-item>
                <Form-item label="请输入您期望开始的工作日期">
                    <Date-picker type="date" placeholder="选择日期" v-model="formValidate.date" style="width:100%;"></Date-picker>
                </Form-item>
                <Form-item label="公司名称">
                     <Input type="text" placeholder="请输入公司名称"></Input>
                </Form-item>
                <Form-item label="发布需求">
                    <Button size="large" type="primary" long>发布需求</Button>
                </Form-item>
            </Form>
        </Card>
        <perfect-info/>
    </div>

</template>
<script>
    import PerfectInfo from "@/components/common/Dialog/PerfectWebsiteInfo.vue";
    export default {
        data () {
            return {
                ruleValidate: {
                    uClassify: [],
                    wClassify: [],
                    wName : [],
                    desc : [],
                    skillsTag : "",
                    skillsTagGroup : []
                },
                formValidate : {
                    uClassify: "",
                    wClassify: "",
                    wName : "",
                    desc: "",
                    skillsTag : "",
                    radio : "",
                    skillsTagGroup : [],
                    projectScheme: {
                        total : "",
                        date : "",
                        oneDay : 0
                    },
                    dailyWageSystem: {
                        oneDay : 0,
                        date : "",
                        total : ""
                    },
                    data: ""

                }
            }
        },
        components:{
            PerfectInfo : PerfectInfo
        },
        methods: {
            handleAdd () {
                let a = this.formValidate.skillsTag;
                let arr = this.formValidate.skillsTagGroup;
                if (a !== "") {
                    arr.push( a );
                    this.formValidate.skillsTagGroup = [...new Set(arr)];
                    this.formValidate.skillsTag = "";
                } else {
                   this.$Message.info('不能为空');
                }
            },
            handleClose2 (event, name) {
                const index = this.formValidate.skillsTagGroup.indexOf(name);
                this.formValidate.skillsTagGroup.splice(index, 1);
            },

            handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.$Message.success('提交成功!');
                    } else {
                        this.$Message.error('表单验证失败!');
                    }
                })
            },
            handleReset (name) {
                this.$refs[name].resetFields();
            }
        }
    }
</script>
