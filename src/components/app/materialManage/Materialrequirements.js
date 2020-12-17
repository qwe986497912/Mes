import React, { Component } from 'react';
import { DatePicker, Input, Button, Table, Modal, Select, BackTop, Popconfirm, message } from 'antd';
import { originalUrl, inventoryManagement } from '../../../dataModule/UrlList';
import { Model } from '../../../dataModule/testBone.js';
import axios from 'axios';
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

class Materialrequirements extends Component{
	constructor(){
	    super();
			this.state = {
				id: '',     //物料需求订单id
				//table data：数据 columns 表头
				data: [
					{ticket_number: 1,id: 1,type: 1},
					{ticket_number: 2,id: 2,type: 0},
				],
				columns:[
					{title: '需求号',dataIndex: 'ticket_number',width: '5%',align:'center',},
					{title: '物料号',dataIndex: 'material_num',width: '8%',align:'center',},
					{title: '材料',dataIndex: 'material_type',width: '8%',align:'center',},
					{title: '需求状态',dataIndex: 'materia_science',width: '8%',align:'center',},
					{title: '数量',dataIndex: 'quantity',width: '5%',align:'center',},
					{title: '优先级',dataIndex: 'priority',width: '5%',align:'center',},
					{title: '操作人',dataIndex: 'demander',width: '5%',align:'center',},
					{title: '操作时间',dataIndex: 'operation_time',width: '5%',align:'center',},
					{title: '设备名',dataIndex: 'device_name',width: '5%',align:'center',},
					{title: '订单序号',dataIndex: 'order_number',width: '5%',align:'center',},
					{title: '操作',dataIndex:'action',render: (text, record)=>{
						console.log('record:',record)
						console.log('data:',this.state.data);
						return (
							<div>
								<Button id={record.id} type="primary" onClick={()=>{this.handleEdit(record.id)}}
									disabled={record.type == 1 ? 'disabled' : false }
									// value={record[0].type == 1 ? '已处理' : '未处理'}
									/* style={{record.type == 1 ? 'color:"blue"' : 'color: "red"'}} */
								>{record.type == 1?'已处理':'未处理'}
								</Button>
							</div>
						)
						
					}},
				],
			}
		}
	render(){
		const { columns, data } = this.state;
		return(
			<div id="Materialrequirements">
				<div className="header">
					<div className="title">
						<h2>库存</h2>
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
			console.log(this.state.data)
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
			let url = originalUrl + inventoryManagement;
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
		//处理物料需求订单 put 修改物料需求管理表将type=0->1
		handleEdit = (id)=>{
			console.log('record.id：',id);
			let btn = document.getElementById(id);
			btn.style = "background:red;color:white";
			let url = originalUrl + inventoryManagement + id + '/';
			let params = {type: 1};
			axios.put(url,params).then((res)=>{
				this.init();
			}).catch((error)=>{
				console.log("error:",error);
				message.error("处理失败!");
			})
		}
}
export default Materialrequirements;