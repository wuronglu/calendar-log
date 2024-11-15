import { useLocation } from "react-router-dom";
import React from "react";
import {
	UploadOutlined,
	UserOutlined,
	VideoCameraOutlined,
} from "@ant-design/icons";
import { Layout, Menu, theme } from "antd";
const { Header, Content, Footer, Sider } = Layout;
const items = [
	UserOutlined,
	VideoCameraOutlined,
	UploadOutlined,
	UserOutlined,
].map((icon, index) => ({
	key: String(index + 1),
	icon: React.createElement(icon),
	label: `nav ${index + 1}`,
}));

const OneDayLog = () => {
	const {
		token: { colorBgContainer, borderRadiusLG },
	} = theme.useToken();
	const location = useLocation();
	const queryParams = new URLSearchParams(location.search);
	const date = queryParams.get("date");
	return (
		<Layout className="h-screen">
			<Sider
				breakpoint="lg"
				collapsedWidth="0"
				trigger={null}
				width={240}
				collapsible
				onBreakpoint={(broken) => {
					console.log(broken);
				}}
				onCollapse={(collapsed, type) => {
					console.log(collapsed, type);
				}}
			>
				<div className="demo-logo-vertical text-[#ccd2d8] px-8 py-4 text-base">
					<div>{date}</div>
				</div>
				<Menu
					theme="dark"
					mode="inline"
					defaultSelectedKeys={["4"]}
					items={items}
				/>
			</Sider>
			<Layout>
				<Header
					style={{
						padding: 0,
						background: colorBgContainer,
					}}
				/>
				<Content
					style={{
						margin: "24px 16px 0",
					}}
				>
					<div
						style={{
							padding: 24,
							minHeight: 360,
							background: colorBgContainer,
							borderRadius: borderRadiusLG,
						}}
					>
						{date}
					</div>
				</Content>
				<Footer
					style={{
						textAlign: "center",
					}}
				>
					Ant Design ©{new Date().getFullYear()} Created by Ant UED
				</Footer>
			</Layout>
		</Layout>
	);
};

export default OneDayLog;
