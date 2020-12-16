import React, { Component } from 'react';
import { DatePicker, Input, Button, Table, Modal, Select, BackTop, Popconfirm } from 'antd';
import { originalUrl, orderAdmin, } from '../../../../dataModule/UrlList';
import { Model } from '../../../../dataModule/testBone.js';
import Edit from '../../../../statistics/edit.png';
import Delete from '../../../../statistics/delete.png';
// import { changeOrder,changeType, typeChange } from '../../commonFunction.js';
import history from '../../../common/history.js';
import '../../style.less';
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');

const { MonthPicker, RangePicker, WeekPicker } = DatePicker;
const {Option} = Select;
const model = new Model();

class OrdersRecord extends Component{
	constructor() {
	    super();
			this.state = {
				id: '',     //订单序号编号
				//table data：数据 columns 表头
				data: [],
				columns:[
					{title: '订单序号',dataIndex: 'order_number',width: '5%',align:'center',},
					{title: '产品名',dataIndex: 'product_name',width: '8%',align:'center',},
					{title: '产品号',dataIndex: 'product_num',width: '8%',align:'center',},
					{title: '状态',dataIndex: 'status',width: '8%',align:'center',},
					{title: '交货时间',dataIndex: 'plan_time',width: '8%',align:'center',},
					{title: '计划数量',dataIndex: 'plan_num',width: '8%',align:'center',},
					{title: '单位',dataIndex: 'unit',width: '8%',align:'center',},
					{title: '生产要求',dataIndex: 'production_requirements',width: '12%',align:'center',},
					{title: '订单来源',dataIndex: 'order_source',width: '6%',align:'center',},
					{title: '优先级',dataIndex: 'priority',width: '8%',align:'center',},
					{title: '下单时间',dataIndex: 'order_time',width: '5%',align:'center',},
					{title: '生产序号',dataIndex: 'serial_number',width: '5%',align:'center',},
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
					order_number: '',
					product_name: '',
					product_num: '',
					status: '',
					plan_time: '',  //交货时间
					plan_num: '',
					unit: '',
					production_requirements: '',
					order_source: '',
					priority: '',
					order_time: '', //下单时间
					serial_number: '',
				},
				Modal2Visible: false,
				Modal1Visible: false,
			}
	}
	render(){
		const { columns, data, ModalForm, Modal2Visible, Modal1Visible } = this.state;
		return(
			<div id="ordersAdmin">
				<div className="header">
					<div className="title">
						<h2>订单管理</h2>
					</div>
					<div className="filter">
						<div></div>
						<div>
							<Button className="button" type="primary" onClick={()=>{this.addOrder()}}>添加订单</Button>
						</div>
					</div>
				</div>
				<div className="main">
					<Table className="antd-Table" columns={columns} dataSource={data} 
					pagination={{ pageSize: 8 }} scroll={{ y: '100%', x: 1500 }}/>
					{/* 回到顶部 */}
					<BackTop />
					<strong style={{ color: 'rgba(64, 64, 64, 0.6)' }}></strong>
					<div className="orders-modify">
						<Modal
							title="订单信息编辑"
							visible={Modal1Visible}
							onOk={this.handleModal1Ok}
							onCancel={this.handleModal1Cancel}
						>
							<table className="table">
								<thead></thead>
								<tbody>
									<tr>
										<td className="title" style={{marginRight:20}}>订单序号:</td>
										<td><Input style={{width: '100%',height:'100%'}} value={ModalForm.order_number} onChange={(ev)=>{this.Modal1Change(ev,'order_number')}}/></td>
									</tr>
									<tr>
										<td className="title" style={{marginRight:20}}>产品名:</td>
										<td><Input style={{width: '100%',height: '100%'}} value={ModalForm.product_name} onChange={(ev)=>{this.Modal1Change(ev,'product_name')}}/></td>
									</tr>
									<tr>
										<td className="title" style={{marginRight:20}}>产品号:</td>
										<td><Input style={{width: '100%',height: '100%'}} value={ModalForm.product_num} onChange={(ev)=>{this.Modal1Change(ev,'product_num')}}/></td>
									</tr>
									<tr>
										<td className="title" style={{marginRight:20}}>状态:</td>
										<td>
											<select className="select" value={ModalForm.status} onChange={(ev)=>{this.Modal1Change(ev,'status')}}>
												<option key="0" value=''></option>
												<option key ="1" value="未处理">未处理</option>
												<option key ="2" value="处理中">处理中</option>
												<option key ="3" value="订单完成">订单完成</option>
											</select>
										</td>
									</tr>
									<tr>
										<td className="title" style={{marginRight:20}}>交货时间:</td>
										<td><Input style={{width: '100%',height: '100%'}} value={ModalForm.plan_time} onChange={(ev)=>{this.Modal1Change(ev,'plan_time')}}/></td>
									</tr>
									<tr>
										<td className="title" style={{marginRight:20}}>计划数量:</td>
										<td><Input style={{width: '100%',height: '100%'}} value={ModalForm.plan_num} onChange={(ev)=>{this.Modal1Change(ev,'plan_num')}}/></td>
									</tr>
									<tr>
										<td className="title" style={{marginRight:20}}>单位:</td>
										<td><Input style={{width: '100%',height: '100%'}} value={ModalForm.unit} onChange={(ev)=>{this.Modal1Change(ev,'unit')}}/></td>
									</tr>
									<tr>
										<td className="title" style={{marginRight:20}}>生产要求:</td>
										<td><Input style={{width: '100%',height: '100%'}} value={ModalForm.production_requirements} onChange={(ev)=>{this.Modal1Change(ev,'production_requirements')}}/></td>
									</tr>
									<tr>
										<td className="title" style={{marginRight:20}}>订单来源:</td>
										<td><Input style={{width: '100%',height: '100%'}} value={ModalForm.order_source} onChange={(ev)=>{this.Modal1Change(ev,'order_source')}}/></td>
									</tr>
									<tr>
										<td className="title" style={{marginRight:20}}>优先级:</td>
										<td>
											<select className="select" value={ModalForm.priority} onChange={(ev)=>{this.Modal1Change(ev,"priority")}}>
												<option key="0" value=''></option>
												<option key ="1" value="优先级1">优先级1</option>
												<option key ="2" value="优先2">优先2</option>
												<option key ="3" value="优先3">优先3</option>
											</select>
										</td>
									</tr>
									<tr>
										<td className="title" style={{marginRight:20}}>下单时间:</td>
										<td><Input style={{width: '100%',height: '100%'}} value={ModalForm.order_time} onChange={(ev)=>{this.Modal1Change(ev,'order_time')}}/></td>
									</tr>
									<tr>
										<td className="title" style={{marginRight:20}}>生产序号:</td>
										<td><Input style={{width: '100%',height: '100%'}} value={ModalForm.serial_number} onChange={(ev)=>{this.Modal1Change(ev,'serial_number')}}/></td>
									</tr>
								</tbody>
								<tfoot></tfoot>
							</table>
						</Modal>
					</div>
					<div className="orders-add">
						<Modal
							title="添加订单序号"
							visible={Modal2Visible}
							onOk={this.handleModal2Ok}
							onCancel={this.handleModal2Cancel}
						>
							<table className="table">
								<thead></thead>
								<tbody>
									<tr>
										<td className="title" style={{marginRight:20}}>订单序号:</td>
										<td><Input style={{width: '100%',height:'100%'}} value={ModalForm.order_number} onChange={(ev)=>{this.Modal2Change(ev,'order_number')}}/></td>
									</tr>
									<tr>
										<td className="title" style={{marginRight:20}}>产品名:</td>
										<td><Input style={{width: '100%',height: '100%'}} value={ModalForm.product_name} onChange={(ev)=>{this.Modal2Change(ev,'product_name')}}/></td>
									</tr>
									<tr>
										<td className="title" style={{marginRight:20}}>产品号:</td>
										<td><Input style={{width: '100%',height: '100%'}} value={ModalForm.product_num} onChange={(ev)=>{this.Modal2Change(ev,'product_num')}}/></td>
									</tr>
									<tr>
										<td className="title" style={{marginRight:20}}>状态:</td>
										<td>
											<select className="select" value={ModalForm.status} onChange={(ev)=>{this.Modal2Change(ev,"status")}}>
												<option key="0" value=''></option>
												<option key ="1" value="未处理">未处理</option>
											</select>
										</td>
									</tr>
									<tr>
										<td className="title" style={{marginRight:20}}>交货时间:</td>
										<td><Input style={{width: '100%',height: '100%'}} value={ModalForm.plan_time} onChange={(ev)=>{this.Modal2Change(ev,'plan_time')}}/></td>
									</tr>
									<tr>
										<td className="title" style={{marginRight:20}}>计划数量:</td>
										<td><Input style={{width: '100%',height: '100%'}} value={ModalForm.plan_num} onChange={(ev)=>{this.Modal2Change(ev,'plan_num')}}/></td>
									</tr>
									<tr>
										<td className="title" style={{marginRight:20}}>单位:</td>
										<td><Input style={{width: '100%',height: '100%'}} value={ModalForm.unit} onChange={(ev)=>{this.Modal2Change(ev,'unit')}}/></td>
									</tr>
									<tr>
										<td className="title" style={{marginRight:20}}>生产要求:</td>
										<td><Input style={{width: '100%',height: '100%'}} value={ModalForm.production_requirements} onChange={(ev)=>{this.Modal2Change(ev,'production_requirements')}}/></td>
									</tr>
									<tr>
										<td className="title" style={{marginRight:20}}>订单来源:</td>
										<td><Input style={{width: '100%',height: '100%'}} value={ModalForm.order_source} onChange={(ev)=>{this.Modal2Change(ev,'order_source')}}/></td>
									</tr>
									<tr>
										<td className="title" style={{marginRight:20}}>优先级:</td>
										<td>
											<select className="select" value={ModalForm.priority} onChange={(ev)=>{this.Modal2Change(ev,"priority")}}>
												<option key="0" value=''></option>
												<option key ="1" value="优先级1">优先级1</option>
												<option key ="2" value="优先2">优先2</option>
												<option key ="3" value="优先3">优先3</option>
											</select>
										</td>
									</tr>
									<tr>
										<td className="title" style={{marginRight:20}}>下单时间:</td>
										<td><Input style={{width: '100%',height: '100%'}} value={ModalForm.order_time} onChange={(ev)=>{this.Modal2Change(ev,'order_time')}}/></td>
									</tr>
									<tr>
										<td className="title" style={{marginRight:20}}>生产序号:</td>
										<td><Input style={{width: '100%',height: '100%'}} value={ModalForm.serial_number} onChange={(ev)=>{this.Modal2Change(ev,'serial_number')}}/></td>
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
		let url = originalUrl + orderAdmin;
		model.fetch(params,url,'get',(res)=>{
			console.log('所有订单数据:',res.data);
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
			console.log('filter-item:',item);
			return item.id = id;
		})
		console.log('filterData:',filterData)
		this.setState({
			ModalForm: filterData[0],
			Modal1Visible: true,
			id: id, //订单id 主键
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
		let url = originalUrl + orderAdmin + id + '/';
		model.fetch(params,url,'put',(res)=>{
			console.log('编辑订单成功！');
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
		let url = originalUrl + orderAdmin + id + '/';
		let params = {};
		model.fetch(params,url,'delete',(res)=>{
			console.log(`${id}删除成功！`);
			this.init();
		})
	}
	//添加账户
	addOrder = ()=>{
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
		let url = originalUrl + orderAdmin;
		model.fetch(params,url,'post',(res)=>{
			console.log('创建订单成功！');
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
export default OrdersRecord;