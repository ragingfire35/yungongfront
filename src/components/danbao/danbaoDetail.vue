<style lang="less" scoped>
	h1.tt{
		margin-top: 30px;
		font-size: 24px;
		color: #19be6b;
	}
	.content{
		width: 75%;
		margin: 30px auto 0 auto;
		overflow: hidden;
		background: #fff;
	}
</style>
<template>
	<div class="danbaoDetail">
		<h1 class="tt">担保交易列表</h1>
		<div class="content">
			<Table border :columns="columns7" :data="data6"></Table>
		</div>
	</div>
</template>

<script>
    export default {
        data () {
            return {
                columns7: [
                    {
                        title: '项目名称',
                        key: 'projectName',
                    },
                    {
                        title: '乙方账户名称',
                        key: 'userName',
                        render: (h, params) => {
                            return h('div', [
                                h('Icon', {
                                    props: {
                                        type: 'person'
                                    }
                                }),
                                h('strong',  params.row.userName)
                            ]);
                        }
                    },
                    {
                        title: '项目进度',
                        key: 'projectProgress'
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width: 150,
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.show(params.index)
                                        }
                                    }
                                }, '查看详情')
                            ]);
                        }
                    }
                ],
                data6: [
                    {
                        projectName: '云工网',
                        userName: '周小伟',
                        projectProgress: '正在进行中...'
                    },
                    {
                        projectName: '云工网',
                        userName: '周小伟',
                        projectProgress: '正在进行中...'
                    }
                ]
            }
        },
        methods: {

        }
    }
</script>