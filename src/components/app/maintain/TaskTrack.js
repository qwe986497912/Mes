import React, { Component } from 'react';
import { DatePicker, Input, Button, Table, Modal, Select, BackTop, Popconfirm } from 'antd';
import { originalUrl, taskTrack, } from '../../../dataModule/UrlList';
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

class TaskTrack extends Component{
	constructor(){
	    super();
			this.state = {
				id: '',     //进度跟踪表id 主键
				//搜索区 订单搜索 order
				order_number: '',
				//table data：数据 columns 表头
				data: [],
				columns:[
					{title: '订单序号',dataIndex: 'order_number',width: '5%',align:'center',},
					{title: '生产序号',dataIndex: 'serial_number',width: '8%',align:'center',},
					{title: '产品号',dataIndex: 'product_num',width: '8%',align:'center',},
					{title: '工序名',dataIndex: 'process_name',width: '8%',align:'center',},
					{title: '数量',dataIndex: 'quantity',width: '8%',align:'center',},
					{title: '操作人',dataIndex: 'operator_id',width: '8%',align:'center',},
					{title: '操作时间',dataIndex: 'operation_time',width: '8%',align:'center',},
					{title: '设备名',dataIndex: 'device_name',width: '12%',align:'center',},
					{title: '任务状态',dataIndex: 'task_status',width: '6%',align:'center',},
					{title: '开始时间',dataIndex: 'start_time',width: '8%',align:'center',},
					{title: '结束时间',dataIndex: 'end_time',width: '5%',align:'center',},
					{title: '备注',dataIndex: 'remark',width: '5%',align:'center',},
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
					order_number: '',
					serial_number: '',
					product_num: '',
					process_name: '',
					quantity: '',  //数量
					operator_id: '',
					operation_time: '',
					device_name: '',
					task_status: '',
					start_time: '',
					end_time: '', //结束时间
					remark: '',
				},
				Modal2Visible: false,
				Modal1Visible: false,
			}
	}
	render(){
		const { columns, data, ModalForm, Modal2Visible, Modal1Visible, order_number } = this.state;
		return(
			<div id="taskTrack">
				<div className="header">
					<div className="title">
						<h2>任务追踪</h2>
					</div>
					<div className="filter">
						<div>
							<span className="span">
								订单搜索:
								<Input className="input" value={order_number} onChange={(ev)=>{this.order_number(ev)}}></Input>
							</span>
							<Button className="button" type="primary"onClick={()=>{this.order_search()}}>搜索</Button>
							<Button className="button" type="primary" onClick={()=>{this.reset()}}>重置</Button>
						</div>
					</div>
				</div>
				<div className="main">
					<Table className="antd-Table" columns={columns} dataSource={data} 
					pagination={{ pageSize: 8 }} scroll={{ y: '100%', x: 1500 }}/>
					{/* 回到顶部 */}
					<BackTop />
					<strong style={{ color: 'rgba(64, 64, 64, 0.6)' }}></strong>
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
		let params = {order_number: ''};
		let url = originalUrl + taskTrack;
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
			order_number: ev.target.value,
		})
	}
	order_search = ()=>{
		let order_number = this.state.order_number;
		let data = [...this.state.data];
		let filter = data.filter((item)=>{
			return item.order_number = order_number;
		})
		this.setState({data: filter});
	}
	reset = ()=>{
		this.setState({
			order_number: '',
		})
		this.init();
	}
	
	//删除生产进度信息
	handleDelete = (id)=>{
		let url = originalUrl + taskTrack + id + '/';
		let params = {};
		model.fetch(params,url,'delete',(res)=>{
			console.log(`${id}删除成功！`);
			this.init();
		})
	}
}
export default TaskTrack;