import React, { Component } from 'react';
import { DatePicker, Input, Button, Table, Modal, Select, BackTop, Popconfirm } from 'antd';
import { originalUrl, orderSchedule } from '../../../dataModule/UrlList';
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

class OrderSchedule extends Component{
	constructor(){
	    super();
			this.state = {
				id: '',     //订单序号编号
				//table data：数据 columns 表头
				data: [],
				columns:[
					{title: '设备名',dataIndex: 'device_name',width: '5%',align:'center',},
					{title: '设别号',dataIndex: 'device_num',width: '8%',align:'center',},
					{title: '工序名',dataIndex: 'process_name',width: '8%',align:'center',},
					{title: '计划加工时间',dataIndex: 'plan_process_time',width: '8%',align:'center',},
					{title: '预计开始时间',dataIndex: 'plan_num',width: '8%',align:'center',},
					{title: '预计结束时间',dataIndex: 'start_time',width: '5%',align:'center',},
					{title: '生产序号',dataIndex: 'serial_number',width: '5%',align:'center',},
					{title: '状态',dataIndex: 'status',width: '5%',align:'center',},
					{title: '加工数量',dataIndex: 'processing_quantity',width: '5%',align:'center',},
				],
			}
		}
	render(){
		const { columns, data } = this.state;
		return(
			<div id="MissionManage">
				<div className="header">
					<div className="title">
						<h2>任务安排</h2>
					</div>
					<div className="filter">
						<div></div>
					</div>
				</div>
				<div className="main">
					<Table className="antd-Table" columns={columns} dataSource={data} 
					pagination={{ pageSize: 8 }} scroll={{ y: '100%', x: 1500 }}/>
					{/* 回到顶部 */}
					<BackTop />
					<strong style={{ color: 'rgba(64, 64, 64, 0.6)' }}></strong>
					<div className="MissionManage"></div>
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
			let url = originalUrl + orderSchedule;
			model.fetch(params,url,'get',(res)=>{
			console.log('所有计划输入订单数据:',res.data);
				let data = res.data;
				for(let i=0;i<data.length;i++){
					data[i]['key'] = data[i].id
				}
				me.setState({
					data: data
				});
			})
		}
}
export default OrderSchedule;