import React, { Component } from 'react';
import { DatePicker, Input, Button, Table, Modal, Select, BackTop, Popconfirm } from 'antd';
import { originalUrl, inputPlan, orderAdmin } from '../../../dataModule/UrlList';
import { Model } from '../../../dataModule/testBone.js';
import Edit from '../../../statistics/edit.png';
import Delete from '../../../statistics/delete.png';
// import { changeOrder,changeType, typeChange } from '../../commonFunction.js';
import history from '../../common/history.js';
import '../style.less';
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');

const { MonthPicker, RangePicker, WeekPicker } = DatePicker;
const {Option} = Select;
const model = new Model();

class InputPlan extends Component{
	constructor() {
		super();
		this.state = {
			inputPlan_id: '',     //计划参数输入表的id
			orderAdmin_id: '', // 订单管理表的id
			//table data：数据 columns 表头
			data: [],
			columns:[
				{title: '订单序号',dataIndex: 'order_number',width: '12%',align:'center',},
				{title: '产品号',dataIndex: 'product_num',width: '12%',align:'center',},
				{title: '产品名',dataIndex: 'product_name',width: '12%',align:'center',},
				{title: '交货时间',dataIndex: 'plan_time',width: '12%',align:'center',},
				{title: '计划数量',dataIndex: 'plan_num',width: '12%',align:'center',},
				{title: '库存',dataIndex: 'quantity_completed',width: '12%',align:'center',},
				{title: '本次调度量',dataIndex: 'scheduling_quantity',width: '12%',align:'center',},
				{title: '操作',dataIndex: 'action', render: (text, record) => {
					return(
						<div>
							<span style={{cursor: 'pointer',marginRight: '10px'}} onClick={()=>{this.inputPlan(record.id,record.order_id)}}>
								<img src={Edit}/>
							</span>&nbsp;&nbsp;&nbsp;&nbsp;
						</div>
					)
				}},
			],
			//弹框函数
			ModalForm: {
				order_number: '', //订单序号
				scheduling_quantity: '',
				quantity_completed:'',
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
						<h2>计划参数输入</h2>
					</div>
					<div className="filter">
						<div></div>
					</div>
				</div>
				<div className="main">
					<Table className="antd-Table" columns={columns} dataSource={data} 
					pagination={{ pageSize: 8 }} scroll={{ y: '100%', x: 1000 }}/>
					{/* 回到顶部 */}
					<BackTop />
					<strong style={{ color: 'rgba(64, 64, 64, 0.6)' }}></strong>
					<div className="InputPlan">
						<Modal
							title="计划参数输入"
							visible={Modal1Visible}
							onOk={this.handleModal1Ok}
							onCancel={this.handleModal1Cancel}
						>
							<table className="table">
								<thead></thead>
								<tbody>
									<tr>
										<td className="title" style={{marginRight:20}}>订单序号:</td>
										<td><Input style={{width: '100%',height:'100%'}} value={ModalForm.order_number} disabled={true}/></td>
									</tr>
									<tr>
										<td className="title" style={{marginRight:20}}>库存:</td>
										<td><Input style={{width: '100%',height: '100%'}} value={ModalForm.quantity_completed} onChange={(ev)=>{this.Modal1Change(ev,'quantity_completed')}}/></td>
									</tr>
									<tr>
										<td className="title" style={{marginRight:20}}>调度量:</td>
										<td><Input style={{width: '100%',height: '100%'}} value={ModalForm.scheduling_quantity} onChange={(ev)=>{this.Modal1Change(ev,'scheduling_quantity')}}/></td>
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
		let url = originalUrl + inputPlan;
		model.fetch(params,url,'get',(res)=>{
			console.log('所有计划输入订单数据:',res.data);
			let data = res.data.filter((item)=>{
				return item.status == "未处理";
			});
			for(let i=0;i<data.length;i++){
				data[i]['key'] = data[i].id
			}
			me.setState({
				data: data
			});
		})
	}
	inputPlan = (inputPlan_id,orderAdmin_id)=>{
		let data = this.state.data;
		let filterData = data.filter((item)=>{
			return item.id = inputPlan_id;
		})
		this.setState({
			ModalForm: filterData[0],
			Modal1Visible: true,
			orderAdmin_id: orderAdmin_id,
			inputPlan_id: inputPlan_id, 
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
	//将该订单的状态和计划参数输入表中status改成处理中 同时将数据发送到
	handleModal1Ok = ()=>{
		let inputPlan_id = this.state.inputPlan_id;
		let orderAdmin_id = this.state.orderAdmin_id;
		let transData = this.state.data.filter((item)=>{
			return item.id = inputPlan_id;
		})
		let form = {...this.state.ModalForm};
		let data = {...transData[0],form};
		//修改订单status 
		const me = this;
		let url = originalUrl + orderAdmin + orderAdmin_id + "/";
		let params = {status: "处理中"};
		model.fetch(params,url,'put',(res)=>{
			console.log('修改订单成功');
			let params = {status: "处理中"};
			let url = originalUrl + inputPlan + inputPlan_id + "/";
			model.fetch(params,url,'put',(res)=>{
				console.log('修改计划参数输入状态成功');
				let Form = this.state.ModalForm;
				for(let item in Form){
					Form[item] = "";
				}
				me.setState({
					Modal1Visible: false,
					ModalForm: Form,
				})
				me.init();
			})
		})
	}
}
export default InputPlan;