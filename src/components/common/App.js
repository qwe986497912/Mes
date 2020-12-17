import React, { Component } from 'react';
import { Redirect, Route, Switch, withRouter } from 'react-router-dom';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import { getCookie, setCookie } from "../../helpers/cookies";
// import store from '../../store';
import { Provider } from 'react-redux';

import HeaderMenu from './HeaderMenu'
import HeaderCustom from './HeaderCustom';
import SiderMenu from './SiderMenu.js';
import noMatch from './404';
import appIndex from './AppIndex.js';

//用户端 机器人服务
import AccountInformation from '../app/backstage/informationAdmin/AccountInformation.js';
//运维 机器人管理
import RobotManage from '../app/maintain/robotManage/RobotManage.js';
import RobotMaintain from '../app/maintain/robotManage/RobotMaintain.js';
import RobotTransfer from '../app/maintain/robotManage/RobotTransfer.js';

//运维 生产计划管理
import OrdersRecord from '../app/maintain/ordersAdmin/OrdersRecord.js';//mes
import InputPlan from '../app/maintain/InputPlan.js';//mes
import OrderSchedule from '../app/maintain/OrderSchedule.js';//mes
import ProgressTrack from '../app/maintain/ProgressTrack.js';//mes
import TaskTrack from '../app/maintain/TaskTrack.js'; //mes
// 物料管理
import InventoryManagement from '../app/materialManage/InventoryManagement.js'; //mes
import Materialinout from '../app/materialManage/Materialinout.js';//mes
import Materialrequirements from '../app/materialManage/Materialrequirements.js';//mes
//机器人服务（用户端） 
import Personal from '../app/userSide/personal.js';
import Order from '../app/userSide/order.js';
import OrderDetails from '../app/userSide/ordersUser/OrderDetails.js';
import DispatchService from '../app/userSide/robotServices/DispatchService.js';
import WaitToDevelop from '../app/userSide/robotServices/WaitToDevelop.js';
const { Content, Footer,Sider,Header } = Layout;
const { SubMenu } = Menu;

class App extends Component {
  state = {
    collapsed: getCookie("mspa_SiderCollapsed") === "true",
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    }, function () {
      setCookie("mspa_SiderCollapsed", this.state.collapsed);
    });
  };

  componentDidMount() {
    if (getCookie("mspa_SiderCollapsed") === null) {
      setCookie("mspa_SiderCollapsed", false);
    }
  }

  render() {
		//cookie中取username
    const { collapsed } = this.state;
    // const {location} = this.props;
    let username = '';
		let type;
    if (!getCookie("user") || getCookie("user") === "undefined") {
      return <Redirect to="/login/" />
    } else {
      username = JSON.parse(getCookie("user")).username;
			type = JSON.parse(getCookie("user")).type;
    }
		 {/* 根据用户权限限制route组件 type 3 2 1 */}
		 if(type == 3){
			 console.log('type:',type);
			 return (
			  <Layout style={{ minHeight: '100vh' }}>
			 	{/* <Provider store={store}></Provider> */}
			      <HeaderCustom collapsed={collapsed} toggle={this.toggle} username={username} />
			      <Layout>
			        <Sider width={200} style={{ background: '#fff' }}>
			          	<SiderMenu/>
			        </Sider>
			        <Layout style={{ padding:0, marginTop: '3rem' }}>
			          <Content
			            style={{
			              background: '#fff',
			              padding: 24,
			              margin: 0
			            }}
			          >
			            <Switch>
			 							{/* 主页 */}
										<Route exact path="/app/" component={appIndex}/>
											{/* 后台 机器人服务部分 */}
										<Route exact path="/app/backstage/informationAdmin/AccountInformation/" component={AccountInformation}></Route>
											{/* 运维 订单记录 mes */}
										<Route exact path="/app/maintain/OrderSchedule/" component={OrderSchedule}/>
										<Route exact path="/app/maintain/ProgressTrack/" component={ProgressTrack}/>
										<Route exact path="/app/maintain/ordersAdmin/OrdersRecord/" component={OrdersRecord}/>
										<Route exact path="/app/maintain/InputPlan/" component={InputPlan}/>
										{/* <Route exact paht="/app/maintain/TaskTrack/" component={TaskTrack}/> paht 问题？*/}
										<Route exact path="/app/maintain/TaskTrack/" component={TaskTrack}/>
										<Route exact path="/app/maintain/robotManage/RobotManage/" component={RobotManage}/>
										<Route exact path="/app/maintain/robotManage/RobotMaintain/" component={RobotMaintain}/>
										<Route exact path="/app/maintain/robotManage/RobotTransfer/" component={RobotTransfer}/>
											{/* 物料管理 */}
										<Route exact path="/app/materialManage/Inventory/" component={InventoryManagement}/>	
										<Route exact path="/app/materialManage/Materialinout/" component={Materialinout}/>
										<Route exact path="/app/materialManage/Materialrequirements/" component={Materialrequirements}/>
											{/* 用户端 */}
										<Route exact path="/app/userSide/Personal/" component={Personal}/>
										<Route exact path="/app/userSide/order/" component={Order}/>
										<Route exact path="/app/userSide/ordersUser/OrderDetails/:orderId/" component={OrderDetails}/>
										<Route exact path="/app/userSide/robotServices/DispatchService/" component={DispatchService}/>
										<Route exact path="/app/userSide/robotServices/WaitToDevelop/" component={WaitToDevelop}/>
										<Route component={noMatch} />
									</Switch>
			          </Content>
			 				 <Footer style={{ textAlign: 'center', backgroundColor: "#778899", color: "white" }}>
			 				 	<span style={{ display: "block" }}>公司地址：上海市杨浦区军工路516号上海理工大学</span>
			 				 	<span style={{ display: "block" }}>联系电话：12345</span>
			 				 	<span style={{ display: "block" }}>邮箱：12345@qq.com</span>
			 				 </Footer>
			        </Layout>
			      </Layout>
			    </Layout>
			 )
		 }else if(type == 1){
			 console.log('type:',type);
			 return (
			  <Layout style={{ minHeight: '100vh' }}>
			 	{/* <Provider store={store}></Provider> */}
			      <HeaderCustom collapsed={collapsed} toggle={this.toggle} username={username} />
			      <Layout>
			        <Sider width={200} style={{ background: '#fff' }}>
			          	<SiderMenu/>
			        </Sider>
			        <Layout style={{ padding:0, marginTop: '3rem' }}>
			          <Content
			            style={{
			              background: '#fff',
			              padding: 24,
			              margin: 0
			            }}
			          >
			            <Switch>
			 							{/* 主页 */}
			 						<Route exact path="/app/" component={appIndex}/>
			 							{/* 用户端 */}
			 						<Route exact path="/app/userSide/Personal/" component={Personal}/>
			 						<Route exact path="/app/userSide/order/" component={Order}/>
			 						<Route exact path="/app/userSide/ordersUser/OrderDetails/:orderId/" component={OrderDetails}/>
			 						<Route exact path="/app/userSide/robotServices/DispatchService/" component={DispatchService}/>
			 						<Route exact path="/app/userSide/robotServices/WaitToDevelop/" component={WaitToDevelop}/>
			 						<Route component={noMatch} />
			 					 </Switch>
			          </Content>
			 				 <Footer style={{ textAlign: 'center', backgroundColor: "#778899", color: "white" }}>
			 				 	<span style={{ display: "block" }}>公司地址：上海市杨浦区军工路516号上海理工大学</span>
			 				 	<span style={{ display: "block" }}>联系电话：12345</span>
			 				 	<span style={{ display: "block" }}>邮箱：12345@qq.com</span>
			 				 </Footer>
			        </Layout>
			      </Layout>
			    </Layout>
			 )
		 }else{
			 console.log('type:',type);
			 return (
			  <Layout style={{ minHeight: '100vh' }}>
			 	{/* <Provider store={store}></Provider> */}
			      <HeaderCustom collapsed={collapsed} toggle={this.toggle} username={username} />
			      <Layout>
			        <Sider width={200} style={{ background: '#fff' }}>
			          	<SiderMenu/>
			        </Sider>
			        <Layout style={{ padding:0, marginTop: '3rem' }}>
			          <Content
			            style={{
			              background: '#fff',
			              padding: 24,
			              margin: 0
			            }}
			          >
			            <Switch>
			 							{/* 主页 */}
			 						<Route exact path="/app/" component={appIndex}/>
			 							{/* 运维 订单记录 */}
			 						<Route exact path="/app/maintain/ordersAdmin/OrdersRecord/" component={OrdersRecord}/>
			 						<Route exact path="/app/maintain/robotManage/RobotManage/" component={RobotManage}/>
			 						<Route exact path="/app/maintain/robotManage/RobotMaintain/" component={RobotMaintain}/>
			 						<Route exact path="/app/maintain/robotManage/RobotTransfer/" component={RobotTransfer}/>
			 							{/* 用户端 */}
			 						<Route exact path="/app/userSide/Personal/" component={Personal}/>
			 						<Route exact path="/app/userSide/order/" component={Order}/>
			 						<Route exact path="/app/userSide/ordersUser/OrderDetails/:orderId/" component={OrderDetails}/>
			 						<Route exact path="/app/userSide/robotServices/DispatchService/" component={DispatchService}/>
			 						<Route exact path="/app/userSide/robotServices/WaitToDevelop/" component={WaitToDevelop}/>
			 						<Route component={noMatch} />
			 					 </Switch>
			          </Content>
			 				 <Footer style={{ textAlign: 'center', backgroundColor: "#778899", color: "white" }}>
			 				 	<span style={{ display: "block" }}>公司地址：上海市杨浦区军工路516号上海理工大学</span>
			 				 	<span style={{ display: "block" }}>联系电话：12345</span>
			 				 	<span style={{ display: "block" }}>邮箱：12345@qq.com</span>
			 				 </Footer>
			        </Layout>
			      </Layout>
			    </Layout>
			 )
		 }
  }
}

export default withRouter(App);
