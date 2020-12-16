import React, { Component } from 'react';
import { DatePicker, Input, Button, Table, Modal, Select, BackTop, Popconfirm } from 'antd';
import { originalUrl, account, } from '../../../../dataModule/UrlList';
import { Model } from '../../../../dataModule/testBone.js';
import Edit from '../../../../statistics/edit.png';
import Delete from '../../../../statistics/delete.png';
import { changeOrder,changeType, typeChange } from '../../commonFunction.js';
import history from '../../../common/history.js';
import '../../style.less';
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');

const { MonthPicker, RangePicker, WeekPicker } = DatePicker;
const {Option} = Select;
const model = new Model();

class AccountInformation extends Component{
	constructor() {
	    super();
			this.state = {
				id: '',
				//table data：数据 columns 表头
				data: [],
				columns:[
					{title: '账户',dataIndex: 'username',width: '5%',align:'center',},
					{title: '密码',dataIndex: 'password',width: '8%',align:'center',},
					{title: '密码',dataIndex: 'role',width: '8%',align:'center',},
					{title: '状态',dataIndex: 'status',width: '8%',align:'center',},
					{title: '工号',dataIndex: 'job_num',width: '8%',align:'center',},
					{title: '性别',dataIndex: 'sex',width: '5%',align:'center',},
					{title: '邮箱',dataIndex: 'email',width: '12%',align:'center',},
					{title: '电话',dataIndex: 'tele',width: '6%',align:'center',},
					{title: '所属部门',dataIndex: 'dep',width: '12%',align:'center',},
					{title: '所属车间',dataIndex: 'workshop',width: '5%',align:'center',},
					{title: '工种',dataIndex: 'work_type',width: '5%',align:'center',},
					{title: '备注',dataIndex: 'remark',width: '5%',align:'center',},
					{title: '操作',dataIndex: 'action', render: (text, record) => {
						return(
							<div>
								<span style={{cursor: 'pointer',marginRight: '10px'}} onClick={()=>{this.handleEdit(record.id)}}>
									<img src={Edit}/>
								</span>&nbsp;&nbsp;&nbsp;&nbsp;
								<Popconfirm  title="确认删除？" onConfirm={()=>{this.handleDelete(record.id)}}>
									<img src={Delete} style={{cursor: 'pointer'}}/>
								</Popconfirm>
							</div>
						)
					}},
				],
				//弹框函数
				ModalForm: {
					username: '',
					password: '',
					role: '',
					status: '',
					job_num: '',
					sex: '',
					email: '',
					tele: '',
					dep: '',
					workshop: '',
					work_type: '',
					remark: '',
				},
				Modal2Visible: false,
				Modal1Visible: false,
			}
	}
	render(){
		console.log('data:',this.state.data);
		const { columns, data, ModalForm, Modal2Visible, Modal1Visible } = this.state;
		return(
			<div id="accountInformation">
				<div className="header">
					<div className="title">
						<h2>用户信息管理</h2>
					</div>
					<div className="filter">
						<div>
							<Button className="button" type="primary" onClick={()=>{this.addAccount()}}>添加用户</Button>
						</div>
					</div>
				</div>
				<div className="main">
					<Table className="antd-Table" columns={columns} dataSource={data} 
					pagination={{ pageSize: 8 }} scroll={{ y: '100%', x: 1500 }}/>
					{/* 回到顶部 */}
					<BackTop />
					<strong style={{ color: 'rgba(64, 64, 64, 0.6)' }}></strong>
					<div className="account-modify">
						<Modal
							title="用户信息编辑"
							visible={Modal1Visible}
							onOk={this.handleModal1Ok}
							onCancel={this.handleModal1Cancel}
						>
							<table className="table">
								<thead></thead>
								<tbody>
									<tr>
										<td className="title" style={{marginRight:20}}>用户名:</td>
										<td><Input style={{width: '100%',height:'100%'}} value={ModalForm.username} onChange={(ev)=>{this.Modal1Change(ev,'username')}}/></td>
									</tr>
									<tr>
										<td className="title" style={{marginRight:20}}>密码:</td>
										<td><Input style={{width: '100%',height: '100%'}} value={ModalForm.password} onChange={(ev)=>{this.Modal1Change(ev,'password')}}/></td>
									</tr>
									<tr>
										<td className="title" style={{marginRight:20}}>角色:</td>
										<td><Input style={{width: '100%',height: '100%'}} value={ModalForm.role} onChange={(ev)=>{this.Modal1Change(ev,'role')}}/></td>
									</tr>
									<tr>
										<td className="title" style={{marginRight:20}}>状态:</td>
										<td>
											<select className="select" value={ModalForm.status} onChange={(ev)=>{this.Modal1Change(ev,"status")}}>
												<option key="-1" value=""></option>
												<option key="0" value="active">active</option>
												<option key="1" value="inactive">inactive</option>
											</select>
										</td>
									</tr>
									<tr>
										<td className="title" style={{marginRight:20}}>工号:</td>
										<td><Input style={{width: '100%',height: '100%'}} value={ModalForm.job_num} onChange={(ev)=>{this.Modal1Change(ev,'job_num')}}/></td>
									</tr>
									<tr>
										<td className="title" style={{marginRight:20}}>性别:</td>
										<td>
											<select className="select" value={ModalForm.sex} onChange={(ev)=>{this.Modal1Change(ev,'sex')}}>
												<option value=""></option>
												<option value="女">女</option>
												<option value="男">男</option>
											</select>
										</td>
									</tr>
									<tr>
										<td className="title" style={{marginRight:20}}>邮箱:</td>
										<td><Input style={{width: '100%',height: '100%'}} value={ModalForm.email} onChange={(ev)=>{this.Modal1Change(ev,'email')}}/></td>
									</tr>
									<tr>
										<td className="title" style={{marginRight:20}}>电话:</td>
										<td><Input style={{width: '100%',height: '100%'}} value={ModalForm.tele} onChange={(ev)=>{this.Modal1Change(ev,'tele')}}/></td>
									</tr>
									<tr>
										<td className="title" style={{marginRight:20}}>部门:</td>
										<td><Input style={{width: '100%',height: '100%'}} value={ModalForm.dep} onChange={(ev)=>{this.Modal1Change(ev,'dep')}}/></td>
									</tr>
									
									<tr>
										<td className="title" style={{marginRight:20}}>车间:</td>
										<td><Input style={{width: '100%',height: '100%'}} value={ModalForm.workshop} onChange={(ev)=>{this.Modal1Change(ev,'workshop')}}/></td>
									</tr>
									<tr>
										<td className="title" style={{marginRight: 20}}>工种</td>
										<td>
											<select className="select" value={ModalForm.work_type} onChange={(ev)=>{this.Modal1Change(ev,"work_type")}}>
												<option key='-1' value=""></option>
												<option key='0' value="生产计划员">生产计划员</option>
												<option key='1' value="设备管理员">设备管理员</option>
												<option key='2' value="质量管理员">质量管理员</option>
											</select>
										</td>
									</tr>
									<tr>
										<td className="title" style={{marginRight:20}}>备注:</td>
										<td>
											<input id='tipinput1' type="text" className="input" value={ModalForm.remark} onChange={(ev)=>{this.Modal1Change(ev,'remark')}}/>
										</td>
									</tr>
								</tbody>
								<tfoot></tfoot>
							</table>
						</Modal>
					</div>
					<div className="account-add">
						<Modal
							title="添加账户"
							visible={Modal2Visible}
							onOk={this.handleModal2Ok}
							onCancel={this.handleModal2Cancel}
						>
							<table className="table">
								<thead></thead>
								<tbody>
									<tr>
										<td className="title" style={{marginRight:20}}>用户名:</td>
										<td><Input style={{width: '100%',height:'100%'}} value={ModalForm.username} onChange={(ev)=>{this.Modal2Change(ev,'username')}}/></td>
									</tr>
									<tr>
										<td className="title" style={{marginRight:20}}>密码:</td>
										<td><Input style={{width: '100%',height: '100%'}} value={ModalForm.password} onChange={(ev)=>{this.Modal2Change(ev,'password')}}/></td>
									</tr>
									<tr>
										<td className="title" style={{marginRight:20}}>角色:</td>
										<td><Input style={{width: '100%',height: '100%'}} value={ModalForm.role} onChange={(ev)=>{this.Modal2Change(ev,'role')}}/></td>
									</tr>
									<tr>
										<td className="title" style={{marginRight:20}}>状态:</td>
										<td>
											<select className="select" value={ModalForm.status} onChange={(ev)=>{this.Modal2Change(ev,"status")}}>
												<option key="-1" value=""></option>
												<option key="0" value="active">active</option>
												<option key="1" value="inactive">inactive</option>
											</select>
										</td>
									</tr>
									<tr>
										<td className="title" style={{marginRight:20}}>工号:</td>
										<td><Input style={{width: '100%',height: '100%'}} value={ModalForm.job_num} onChange={(ev)=>{this.Modal2Change(ev,'job_num')}}/></td>
									</tr>
									<tr>
										<td className="title" style={{marginRight:20}}>性别:</td>
										<td>
											<select className="select" value={ModalForm.sex} onChange={(ev)=>{this.Modal2Change(ev,'sex')}}>
												<option value=""></option>
												<option value="0">女</option>
												<option value="1">男</option>
											</select>
										</td>
									</tr>
									<tr>
										<td className="title" style={{marginRight:20}}>邮箱:</td>
										<td><Input style={{width: '100%',height: '100%'}} value={ModalForm.email} onChange={(ev)=>{this.Modal2Change(ev,'email')}}/></td>
									</tr>
									<tr>
										<td className="title" style={{marginRight:20}}>电话:</td>
										<td><Input style={{width: '100%',height: '100%'}} value={ModalForm.tele} onChange={(ev)=>{this.Modal2Change(ev,'tele')}}/></td>
									</tr>
									<tr>
										<td className="title" style={{marginRight:20}}>部门:</td>
										<td><Input style={{width: '100%',height: '100%'}} value={ModalForm.dep} onChange={(ev)=>{this.Modal2Change(ev,'dep')}}/></td>
									</tr>
									
									<tr>
										<td className="title" style={{marginRight:20}}>车间:</td>
										<td><Input style={{width: '100%',height: '100%'}} value={ModalForm.workshop} onChange={(ev)=>{this.Modal2Change(ev,'workshop')}}/></td>
									</tr>
									<tr>
										<td className="title" style={{marginRight: 20}}>工种</td>
										<td>
											<select className="select" value={ModalForm.work_type} onChange={(ev)=>{this.Modal2Change(ev,"work_type")}}>
												<option key='-1' value=""></option>
												<option key='0' value="生产计划员">生产计划员</option>
												<option key='1' value="设备管理员">设备管理员</option>
												<option key='2' value="质量管理员">质量管理员</option>
											</select>
										</td>
									</tr>
									<tr>
										<td className="title" style={{marginRight:20}}>备注:</td>
										<td>
											<input id='tipinput1' type="text" className="input" value={ModalForm.remark} onChange={(ev)=>{this.Modal2Change(ev,'remark')}}/>
										</td>
									</tr>
								</tbody>
								<tfoot></tfoot>
							</table>
						</Modal>
					</div>
				</div>
			</div>
		)
	}
	//挂载区
	componentDidMount(){
		this.init();
	}
	componentDidUpdate(nextProps){
		// console.log('nextProps:',nextProps);
	}
	componentWillUnmount(){
		console.log('卸载');
	}
	
	//init 获取所有账户信息  
	init = ()=>{
		const me = this;
		let params = {};
		let url = originalUrl + account;
		model.fetch(params,url,'get',(res)=>{
			console.log('所有账户数据:',res.data);
			let data = res.data;
			for(let i=0;i<data.length;i++){
				data[i]['key'] = data[i].id
			}
			me.setState({
				data: data
			});
		})
	}
	handleEdit = (id)=>{
		let data = this.state.data;
		let filterData = data.filter((item)=>{
			return item.id = id;
		})
		console.log('filterData:',filterData)
		this.setState({
			ModalForm: filterData[0],
			Modal1Visible: true,
			id: id,
		})
	}
	Modal1Change = (ev,key)=>{
		let form = {...this.state.ModalForm};
		for(let item in form){
			if(item === key){
				form[item] = ev.target.value;
				this.setState({ModalForm: form});
			}
		}
	}
	handleModal1Ok = ()=>{
		let id = this.state.id;
		let form = {...this.state.ModalForm};
		const me = this;
		let params = form;
		let url = originalUrl + account + id + '/';
		model.fetch(params,url,'put',(res)=>{
			console.log('编辑用户成功！');
			//数据清空
			for(let item in form){
				form[item] = '';
			}
			me.setState({
				ModalForm: form,
				Modal1Visible: false,
			})
			me.init();
		})
	}
	handleModal1Cancel = ()=>{
		let form = {...this.state.ModalForm};
			for(let item in form){
				form[item] = '';
			}
			this.setState({
				Modal1Visible: false,
				ModalForm: form,
			})
			this.init();
	}
	//删除账户信息
	handleDelete = (id)=>{
		let url = originalUrl + account + id + '/';
		let params = {};
		model.fetch(params,url,'delete',(res)=>{
			console.log(`${id}删除成功！`);
			this.init();
		})
	}
	//添加账户
	addAccount = ()=>{
		console.log('添加账户');
		this.setState({Modal2Visible: true})
	}
	Modal2Change = (ev,key)=>{
		let form = {...this.state.ModalForm};
		for(let item in form){
			if(item === key){
				form[item] = ev.target.value;
				this.setState({ModalForm: form});
			}
		}
	}
	handleModal2Ok = ()=>{
		let form = {...this.state.ModalForm};
		const me = this;
		let params = form;
		let url = originalUrl + account;
		model.fetch(params,url,'post',(res)=>{
			console.log('创建用户成功！');
			for(let item in form){
				form[item]  = '';
			}
			me.setState({
				ModalForm: form,
				Modal2Visible: false,
			})
			me.init();
		})
	}
	handleModal2Cancel = ()=>{
			let form = {...this.state.ModalForm};
			for(let item in form){
				form.item = '';
			}
			this.setState({
				Modal2Visible: false,
				ModalForm: form,
			})
			this.init();
		}
}
export default AccountInformation;