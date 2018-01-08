<style lang="less" scoped>
	.partTime{
        width: 75%;
        height: auto;
        margin: 30px auto 0 auto;
        text-align: left;
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
                <Form-item label="目前状态" prop="radio">
                    <Radio-group v-model="formValidate.radio">
                        <Radio label="在职"></Radio>
                        <Radio label="自由职业者"></Radio>
                    </Radio-group>
                </Form-item>

		        <Form-item label="可兼职时间" prop="checkbox">
		            <Checkbox-group v-model="formValidate.checkbox">
		                <Checkbox label="周六"></Checkbox>
		                <Checkbox label="周日"></Checkbox>
		                <Checkbox label="工作日下班后"></Checkbox>
		            </Checkbox-group>
		        </Form-item>
		 		<Form-item
		            v-for="(item, index) in formValidate.items"
		            :key="index"
		            :label="'公司/职位 *' + (index + 1)"
		            :prop="'items.' + index + '.value'"
		            :rules="{required: true, message: '项目' + (index + 1) +'不能为空', trigger: 'blur'}">
		            <Row>
		                <Col span="9">
		                    <Input type="text" v-model="item.value" placeholder="曾就职的最知名的公司简称"></Input>
		                </Col>
		                <Col span="9">
		                    <Input type="text" v-model="item.value" placeholder="如：高级iOS工程师"></Input>
		                </Col>
		                <Col span="6">
		                    <Button type="success" @click="handleRemove(index)" long>删除</Button>
		                </Col>
		            </Row>
		        </Form-item>
		        <Form-item>
		            <Row>
		                <Col span="24">
		                    <Button type="dashed" long @click="handleAdd" icon="plus-round">新增</Button>
		                </Col>
		            </Row>
		        </Form-item>
		  		<Form-item label="工作年限" prop="FixedYear">
		            <Select v-model="formValidate.FixedYear" placeholder="请选择您工作的年限">
		            	<Option value="">请选择您工作的年限</Option>
		                <Option value="12">12</Option>
		            </Select>
		        </Form-item>
		 		<Form-item
		            label="可兼职区域"
		            prop="placeNames"
		        >
		            <Row>
		                <Col span="8">
				            <Select placeholder="城市">
				            	<Option value="">城市</Option>
				                <Option value="beijing">北京市</Option>
				            </Select>
		                </Col>
		                <Col span="8">
				            <Select placeholder="区域范围">
				            	<Option value="">区域范围</Option>
				                <Option value="chaoyang">朝阳区</Option>
				            </Select>
		                </Col>
		                <Col span="8">
		                    <Input type="text"  placeholder="区域范围，如“中关村西” “上地” “五道口"></Input>
		                </Col>
		            </Row>
		        </Form-item>
		  		<Form-item label="日薪" prop="dayMoney">
		            <Select v-model="formValidate.dayMoney" placeholder="**工作8小时计为一天,请选择日薪">
		            	<Option value="">**工作8小时计为一天,请选择日薪</Option>
		                <Option value="1000">1000</Option>
		            </Select>
		        </Form-item>
		  		<Form-item label="顾问角色" prop="workType">
		            <Select v-model="formValidate.workType" placeholder="顾问角色">
		            	<Option value="">顾问角色</Option>
		                <Option value="1000">Ios工程师</Option>
		            </Select>
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
                            @click="handleAdd2"
                        >添加</Button>
                    </div>
                    <Tag
                        closable
                        color="green"
                        type="dot"
                        v-for="(item,index) in formValidate.skillsTagGroup"
                        :key="index"
                        :name="item"
                        @on-close="handleClose2"
                    >{{item}}</Tag>
                </Form-item>
                <Form-item label="技术经验">
                    <Input v-model="formValidate.technologyDesc" type="textarea" :autosize="{minRows: 5,maxRows: 20}" placeholder="请详细填写您的技术经验和能力情况，展示您的实力，有利于更多公司预约您。请不要小于140字。"></Input>
                </Form-item>
                <Form-item label="项目经验">
                    <Input v-model="formValidate.technologyDesc" type="textarea" :autosize="{minRows: 5,maxRows: 20}" placeholder="请详细填写您在工作和业余时间参与过的项目，以及您在项目中所做的具体工作，有利于更多公司预约您。请不要小于70字。"></Input>
                </Form-item>
                <Form-item label="发布兼职">
                    <Button size="large" type="success" long>提交申请</Button>
                </Form-item>
        	</Form>
		</Card>
		<perfect-info/>
	</div>
</template>
<script>
	import PerfectInfo from "@/components/common/Dialog/PerfectInfo.vue";
	export default({
		data(){
			return{
				formValidate : {
					radio : "",
					checkbox : [],
                    items: [
                        {
                            value: ''
                        }
                    ],
                    FixedYear : "",
                    placeNames : "",
                    dayMoney : "",
                    workType : "",
                    skillsTagGroup : [],
                    technologyDesc : "",
                    projectDesc : ""
				},
				ruleValidate : {
       				radio: [
                        { required: true, message: '请选择您现在的工作状态', trigger: 'change' }
                    ],
                    checkbox: [
                        { required: true, type: 'array', min: 1, message: '至少选择一项时间', trigger: 'change' }
                    ],
                    FixedYear : [
						{ required: true, message: '请选择您工作的年限', trigger: 'change' }
                    ]
				}
			}
		},
		components:{
            PerfectInfo : PerfectInfo
        },
		mounted(){

		},
		methods:{
            handleAdd () {
                this.formValidate.items.push({
                    value: ''
                });
            },
            handleRemove (index) {
                this.formValidate.items.splice(index, 1);
            },
            handleAdd2 () {
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
		},

	})
</script>
