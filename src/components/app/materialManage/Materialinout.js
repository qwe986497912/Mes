import React, { Component } from 'react';
import { DatePicker, Input, Button, Table, Modal, Select, BackTop, Popconfirm } from 'antd';
import { originalUrl, orderAdmin, } from '../../../dataModule/UrlList';
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

class Materialinout extends Component{
	constructor() {
	    super();
			this.state = {
				id: '',     //物料序号
				//table data：数据 columns 表头
				data: [],
				columns:[
					{title: '物料名',dataIndex: 'material_name',width: '5%',align:'center',},
					{title: '物料号',dataIndex: 'material_num',width: '8%',align:'center',},
					{title: '物料类型',dataIndex: 'material_type',width: '8%',align:'center',},
					{title: '材料',dataIndex: 'materia_ science',width: '8%',align:'center',},
					{title: '物料状态',dataIndex: 'status',width: '8%',align:'center',},
					{title: '数量',dataIndex: 'quantity',width: '8%',align:'center',},
					{title: '出/入库',dataIndex: 'out_in',width: '8%',align:'center',},
					{title: '操作人',dataIndex: 'operator',width: '12%',align:'center',},
					{title: '操作时间',dataIndex: 'operation_time',width: '6%',align:'center',},
					{title: '订单序号',dataIndex: 'order_number',width: '8%',align:'center',},
					{title: '库位',dataIndex: 'location',width: '5%',align:'center',},
					{title: '操作',dataIndex: 'action', render: (text, record) => {
						return(
							<div>
								<Popconfirm  title="确认删除？" onConfirm={()=>{this.handleDelete(record.id)}}>
									<img src={Delete} style={{cursor: 'pointer'}}/>
								</Popconfirm>
							</div>
						)
					}},
				],
				//弹框函数
				ModalForm: {
					material_name: '',
					material_num: '',
					material_type: '',
					materia_science: '',
					status: '',  //物料状态
					quantity: '',
					out_in: '',
					operator: '',
					operation_time: '',
					order_number: '',
					location: '', //库位
				},
				Modal2Visible: false,
			}
	}
	render(){
		const { columns, data, ModalForm, Modal2Visible, Modal1Visible } = this.state;
		return(
			<div id="Materialinout">
				<div className="header">
					<div className="title">
						<h2>物料出入记录台账</h2>
					</div>
					<div className="filter">
						<div></div>
						<div>
							<Button className="button" type="primary" onClick={()=>{this.add()}}>添加记录</Button>
						</div>
					</div>
				</div>
				<div className="main">
					<Table className="antd-Table" columns={columns} dataSource={data} 
					pagination={{ pageSize: 8 }} scroll={{ y: '100%', x: 1500 }}/>
					{/* 回到顶部 */}
					<BackTop />
					<strong style={{ color: 'rgba(64, 64, 64, 0.6)' }}></strong>
					<div className="Materialinout-add">
						<Modal
							title="添加出入库记录"
							visible={Modal2Visible}
							onOk={this.handleModal2Ok}
							onCancel={this.handleModal2Cancel}
						>
							<table className="table">
								<thead></thead>
								<tbody>
									<tr>
										<td className="title" style={{marginRight:20}}>物料名:</td>
										<td><Input style={{width: '100%',height:'100%'}} value={ModalForm.material_name} onChange={(ev)=>{this.Modal2Change(ev,'material_name')}}/></td>
									</tr>
									<tr>
										<td className="title" style={{marginRight:20}}>物料号:</td>
										<td><Input style={{width: '100%',height: '100%'}} value={ModalForm.material_num} onChange={(ev)=>{this.Modal2Change(ev,'material_num')}}/></td>
									</tr>
									<tr>
										<td className="title" style={{marginRight:20}}>材料类型:</td>
										<td><Input style={{width: '100%',height: '100%'}} value={ModalForm.material_type} onChange={(ev)=>{this.Modal2Change(ev,'material_type')}}/></td>
									</tr>
									<tr>
										<td className="title" style={{marginRight:20}}>材料:</td>
										<td>
											<Input className="select" value={ModalForm.materia_science} onChange={(ev)=>{this.Modal2Change(ev,"materia_science")}}/>
										</td>
									</tr>
									<tr>
										<td className="title" style={{marginRight:20}}>物料状态:</td>
										<td><Input style={{width: '100%',height: '100%'}} value={ModalForm.status} onChange={(ev)=>{this.Modal2Change(ev,'status')}}/></td>
									</tr>
									<tr>
										<td className="title" style={{marginRight:20}}>数量:</td>
										<td><Input style={{width: '100%',height: '100%'}} value={ModalForm.quantity} onChange={(ev)=>{this.Modal2Change(ev,'quantity')}}/></td>
									</tr>
									<tr>
										<td className="title" style={{marginRight:20}}>出入库:</td>
										<td><Input style={{width: '100%',height: '100%'}} value={ModalForm.out_in} onChange={(ev)=>{this.Modal2Change(ev,'out_in')}}/></td>
									</tr>
									<tr>
										<td className="title" style={{marginRight:20}}>操作人:</td>
										<td><Input style={{width: '100%',height: '100%'}} value={ModalForm.operator} onChange={(ev)=>{this.Modal2Change(ev,'operator')}}/></td>
									</tr>
									<tr>
										<td className="title" style={{marginRight:20}}>操作时间:</td>
										<td><Input style={{width: '100%',height: '100%'}} value={ModalForm.operation_time} onChange={(ev)=>{this.Modal2Change(ev,'operation_time')}}/></td>
									</tr>
									<tr>
										<td className="title" style={{marginRight:20}}>订单序号:</td>
										<td>
											<Input className="select" value={ModalForm.order_number} onChange={(ev)=>{this.Modal2Change(ev,"order_number")}}/>
										</td>
									</tr>
									<tr>
										<td className="title" style={{marginRight:20}}>库位:</td>
										<td><Input style={{width: '100%',height: '100%'}} value={ModalForm.location} onChange={(ev)=>{this.Modal2Change(ev,'location')}}/></td>
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
	
	//init 获取所有出入库信息  
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
	//删除出入库信息
	handleDelete = (id)=>{
		let url = originalUrl + orderAdmin + id + '/';
		let params = {};
		model.fetch(params,url,'delete',(res)=>{
			console.log(`${id}删除成功！`);
			this.init();
		})
	}
	//添加出入库
	add = ()=>{
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
export default Materialinout;
