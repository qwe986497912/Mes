import React, { Component } from 'react';
import { DatePicker, Input, Button, Table, Modal, Select, BackTop, Popconfirm } from 'antd';
import { originalUrl, progressTrack, } from '../../../dataModule/UrlList';
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
class ProgressTrack extends Component{
	constructor(){
		super();
		this.state = {
			id: '',     //进度跟踪表id 主键
			//搜索区 订单搜索 order
			order_num: '',
			//table data：数据 columns 表头
			data: [],
			columns:[
				{title: '订单序号',dataIndex: 'order_number',width: '5%',align:'center',},
				{title: '交货时间',dataIndex: 'delivery_time',width: '8%',align:'center',},
				{title: '已完成工序',dataIndex: 'process_completed',width: '8%',align:'center',},
				{title: '未完成工序',dataIndex: 'process_unfinished',width: '8%',align:'center',},
				{title: '生产状态',dataIndex: 'production_status',width: '8%',align:'center',},
				{title: '加工数量',dataIndex: 'processing_quantity',width: '8%',align:'center',},
				{title: '已完成数量',dataIndex: 'quantity_completed',width: '8%',align:'center',},
				{title: '完成率',dataIndex: 'completion_rate',width: '12%',align:'center',},
				{title: '不良率',dataIndex: 'defect_rate',width: '6%',align:'center',},
				{title: '操作人',dataIndex: 'operator',width: '8%',align:'center',},
				{title: '操作时间',dataIndex: 'operation_time',width: '5%',align:'center',},
				{title: '备注',dataIndex: 'remark',width: '5%',align:'center',},
				{title: '操作',dataIndex: 'action', render: (text, record) => {
					return(
						<div>
							<Popconfirm  title="确认删除？" onConfirm={()=>{this.handleDelete(record.id)}}>
								<img src={Delete} style={{cursor: 'pointer'}}/>
							</Popconfirm>
							<Popconfirm title="确认编辑？" onConfirm={()=>{this.handleEdit(record.id)}}>
								<img sec={Edit} style={{cursor: 'pointer'}}/>
							</Popconfirm>
						</div>
					)
				}},
			],
			//弹框函数
			ModalForm: {
				order_number: '',
				delivery_time: '',
				process_completed: '',
				process_unfinished: '',
				production_status: '',  //生产状态
				processing_quantity: '',
				quantity_completed: '',
				completion_rate: '',
				defect_rate: '',
				operator: '',
				operation_time: '', //操作时间
				remark: '',
			},
			Modal2Visible: false,
			Modal1Visible: false,
		}
	}
	render(){
		const { columns, data, ModalForm, Modal2Visible, Modal1Visible, order_num } = this.state;
		return(
			<div id="progressTrack">
				<div className="header">
					<div className="title">
						<h2>生产进度追踪</h2>
					</div>
					<div className="filter">
						<div>
							<span className="span">
								订单搜索:
								<Input className="input" value={order_num} onChange={(ev)=>{this.order_number(ev)}}></Input>
							</span>
							<Button className="button" type="primary" onClick={()=>{this.order_search()}}>搜索</Button>
							<Button className="button" type="primary" onClick={()=>{this.reset()}}>重置</Button>
							<Button className="button" type="primary" onClick={()=>{this.processAdd()}}>添加流程</Button>
						</div>
					</div>
				</div>
				<div className="main">
					<Table className="antd-Table" columns={columns} dataSource={data} 
					pagination={{ pageSize: 8 }} scroll={{ y: '100%', x: 1500 }}/>
					{/* 回到顶部 */}
					<BackTop />
					<strong style={{ color: 'rgba(64, 64, 64, 0.6)' }}></strong>
					<div className="modify-progressTrack">
						<Modal
							title="生产进度信息编辑"
							visible={Modal1Visible}
							onOk={this.handleModal1Ok}
							onCancel={this.handleModal1Cancel}
						>
							<table className="table">
								<thead></thead>
								<tbody>
									<tr>
										<td className="title" style={{marginRight: 20}}>订单序号:</td>
										<td>
											<Input style={{width: '100%',height:'100%'}} value={ModalForm.order_number} onChange={(ev)=>{this.Modal1Change(ev,'order_number')}}></Input>
										</td>
									</tr>
									<tr>
										<td className="title" style={{marginRight: 20}}>计划交货时间:</td>
										<td>
											<Input style={{width: '100%',height:'100%'}} value={ModalForm.delivery_time} onChange={(ev)=>{this.Modal1Change(ev,'delivery_time')}}></Input>
										</td>
									</tr>
									<tr>
										<td className="title" style={{marginRight: 20}}>已完成工序:</td>
										<td>
											<Input style={{width: '100%',height:'100%'}} value={ModalForm.process_completed} onChange={(ev)=>{this.Modal1Change(ev,'process_completed')}}></Input>
										</td>
									</tr>
									<tr>
										<td className="title" style={{marginRight: 20}}>未完成工序:</td>
										<td>
											<Input style={{width: '100%',height:'100%'}} value={ModalForm.process_unfinished} onChange={(ev)=>{this.Modal1Change(ev,'process_unfinished')}}></Input>
										</td>
									</tr>
									<tr>
										<td className="title" style={{marginRight: 20}}>生产状态:</td>
										<td>
											<select className="select" value={ModalForm.production_status} onChange={(ev)=>{this.Modal1Change(ev,'production_status')}}>
												<option key="-1" value=""></option>
												<option key="0" value="生产状态0">生产状态0</option>
												<option key="1" value="生产状态1">生产状态1</option>
												<option key="2" value="生产状态2">生产状态2</option>
											</select>
										</td>
									</tr>
									<tr>
										<td className="title" style={{marginRight: 20}}>加工数量:</td>
										<td>
											<Input style={{width: '100%',height:'100%'}} value={ModalForm.processing_quantity} onChange={(ev)=>{this.Modal1Change(ev,'processing_quantity')}}></Input>
										</td>
									</tr>
									<tr>
										<td className="title" style={{marginRight: 20}}>已完成数量:</td>
										<td>
											<Input style={{width: '100%',height:'100%'}} value={ModalForm.quantity_completed} onChange={(ev)=>{this.Modal1Change(ev,'quantity_completed')}}></Input>
										</td>
									</tr>
									<tr>
										<td className="title" style={{marginRight: 20}}>完成率:</td>
										<td>
											<Input style={{width: '100%',height:'100%'}} value={ModalForm.completion_rate} onChange={(ev)=>{this.Modal1Change(ev,'completion_rate')}}></Input>
										</td>
									</tr>
									<tr>
										<td className="title" style={{marginRight: 20}}>不良率:</td>
										<td>
											<Input style={{width: '100%',height:'100%'}} value={ModalForm.defect_rate} onChange={(ev)=>{this.Modal1Change(ev,'defect_rate')}}></Input>
										</td>
									</tr>
									<tr>
										<td className="title" style={{marginRight: 20}}>操作人:</td>
										<td>
											<Input style={{width: '100%',height:'100%'}} value={ModalForm.operator} onChange={(ev)=>{this.Modal1Change(ev,'operator')}}></Input>
										</td>
									</tr>
									<tr>
										<td className="title" style={{marginRight: 20}}>操作时间:</td>
										<td>
											<Input style={{width: '100%',height:'100%'}} value={ModalForm.operation_time} onChange={(ev)=>{this.Modal1Change(ev,'operation_time')}}></Input>
										</td>
									</tr>
									<tr>
										<td className="title" style={{marginRight: 20}}>备注:</td>
										<td>
											<Input style={{width: '100%',height:'100%'}} value={ModalForm.remark} onChange={(ev)=>{this.Modal1Change(ev,'remark')}}></Input>
										</td>
									</tr>
								</tbody>
								<tfoot></tfoot>
							</table>
						</Modal>
					</div>
					<div className="modify-progressTrack">
						<Modal
							title="生产进度信息添加"
							visible={Modal2Visible}
							onOk={this.handleModal2Ok}
							onCancel={this.handleModal2Cancel}
						>
							<table className="table">
								<thead></thead>
								<tbody>
									<tr>
										<td className="title" style={{marginRight: 20}}>订单序号:</td>
										<td>
											<Input style={{width: '100%',height:'100%'}} value={ModalForm.order_number} onChange={(ev)=>{this.Modal2Change(ev,'order_number')}}></Input>
										</td>
									</tr>
									<tr>
										<td className="title" style={{marginRight: 20}}>计划交货时间:</td>
										<td>
											<Input style={{width: '100%',height:'100%'}} value={ModalForm.delivery_time} onChange={(ev)=>{this.Modal2Change(ev,'delivery_time')}}></Input>
										</td>
									</tr>
									<tr>
										<td className="title" style={{marginRight: 20}}>已完成工序:</td>
										<td>
											<Input style={{width: '100%',height:'100%'}} value={ModalForm.process_completed} onChange={(ev)=>{this.Modal2Change(ev,'process_completed')}}></Input>
										</td>
									</tr>
									<tr>
										<td className="title" style={{marginRight: 20}}>未完成工序:</td>
										<td>
											<Input style={{width: '100%',height:'100%'}} value={ModalForm.process_unfinished} onChange={(ev)=>{this.Modal2Change(ev,'process_unfinished')}}></Input>
										</td>
									</tr>
									<tr>
										<td className="title" style={{marginRight: 20}}>生产状态:</td>
										<td>
											<select className="select" value={ModalForm.production_status} onChange={(ev)=>{this.Modal2Change(ev,'production_status')}}>
												<option key="-1" value=""></option>
												<option key="0" value="生产状态0">生产状态0</option>
												<option key="1" value="生产状态1">生产状态1</option>
												<option key="2" value="生产状态2">生产状态2</option>
											</select>
										</td>
									</tr>
									<tr>
										<td className="title" style={{marginRight: 20}}>加工数量:</td>
										<td>
											<Input style={{width: '100%',height:'100%'}} value={ModalForm.processing_quantity} onChange={(ev)=>{this.Modal2Change(ev,'processing_quantity')}}></Input>
										</td>
									</tr>
									<tr>
										<td className="title" style={{marginRight: 20}}>已完成数量:</td>
										<td>
											<Input style={{width: '100%',height:'100%'}} value={ModalForm.quantity_completed} onChange={(ev)=>{this.Modal2Change(ev,'quantity_completed')}}></Input>
										</td>
									</tr>
									<tr>
										<td className="title" style={{marginRight: 20}}>完成率:</td>
										<td>
											<Input style={{width: '100%',height:'100%'}} value={ModalForm.completion_rate} onChange={(ev)=>{this.Modal2Change(ev,'completion_rate')}}></Input>
										</td>
									</tr>
									<tr>
										<td className="title" style={{marginRight: 20}}>不良率:</td>
										<td>
											<Input style={{width: '100%',height:'100%'}} value={ModalForm.defect_rate} onChange={(ev)=>{this.Modal2Change(ev,'defect_rate')}}></Input>
										</td>
									</tr>
									<tr>
										<td className="title" style={{marginRight: 20}}>操作人:</td>
										<td>
											<Input style={{width: '100%',height:'100%'}} value={ModalForm.operator} onChange={(ev)=>{this.Modal2Change(ev,'operator')}}></Input>
										</td>
									</tr>
									<tr>
										<td className="title" style={{marginRight: 20}}>操作时间:</td>
										<td>
											<Input style={{width: '100%',height:'100%'}} value={ModalForm.operation_time} onChange={(ev)=>{this.Modal2Change(ev,'operation_time')}}></Input>
										</td>
									</tr>
									<tr>
										<td className="title" style={{marginRight: 20}}>备注:</td>
										<td>
											<Input style={{width: '100%',height:'100%'}} value={ModalForm.remark} onChange={(ev)=>{this.Modal2Change(ev,'remark')}}></Input>
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
		let url = originalUrl + progressTrack;
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
	//搜索区 订单序号
	order_number = (ev)=>{
		console.log("搜索订单序号：",ev.target.value);
		this.setState({
			order_num: ev.target.value,
		})
	}
	order_search = ()=>{
		let order_num = this.state.order_num;
		let data = this.state.data;
		let filter = [];
		for(let item in data){
			if(data[item].order_number == order_num){
				filter.push(data[item]);
			}
		}
		this.setState({data: filter});
	}
	reset = ()=>{
		this.setState({
			order_num: '',
		})
		this.init();
	}
	//编辑生产进度信息
	handleEdit = (id)=>{
		console.log('订单id:',id);
		let filterData = this.state.data.filter((item)=>{
			return item.id = id; 
		})
		this.setState({
			ModalForm: filterData[0],
			Modal1Visible: true,
			id: id,
			});
	}
	Modal1Change = (ev,key)=>{
		let form = {...this.state.ModalForm};
		for(let item in form){
			if(item == key){
				form[item] = ev.target.value;
			}
		}
		this.setState({ModalForm: form});
	}
	handleModal1Ok = ()=>{
		let form = {...this.state.ModalForm};
		let id = this.state.id;
		let params = form;
		let url = originalUrl + progressTrack + id;
		model.fetch(params,url,'put',(res)=>{
			console.log('修改成功');
			for(let i in form){
				form[i] = '';
			}
			this.init();
		}).catch((error)=>{
			console.log('error:',error);
		})
	}
	//生产进度信息添加
	processAdd = ()=>{
		this.setState({Modal2Visible: true});
	}
	Modal2Change = (ev,key)=>{
		console.log('生产进度信息：',ev.target.value);
		let form = {...this.state.ModalForm};
		for(let item in form){
			if(item == key){
				form[item] = ev.target.value;
			}
		}
		this.setState({ModalForm: form});
	}
	handleModal2Ok = ()=>{
		let form = {...this.state.ModalForm};
		let params = form;
		let url = originalUrl + progressTrack;
		model.fetch(params,url,"post",(res)=>{
			console.log("添加生产进度成功！and this:",this);
			for(let i in form){
				form[i] = '';
			}
			this.init();
			this.setState({
				Modal2Visible: false,
				ModalForm: form,
			})
		})
	}
	//删除生产进度信息
	handleDelete = (id)=>{
		let url = originalUrl + progressTrack + id + '/';
		let params = {};
		model.fetch(params,url,'delete',(res)=>{
			console.log(`${id}删除成功！`);
			this.init();
		})
	}
}
export default ProgressTrack;