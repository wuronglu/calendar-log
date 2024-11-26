import React, { useEffect } from "react";
import dayjs from "dayjs";
import CalendarComponent from "./CalendarComponent";
import { message, Flex, Spin, Space } from "antd";
import fetchMapLinks from "../../api/getMapLinks";

const Home = () => {
	const [selectDate, setSelectDate] = React.useState(dayjs());
	const [messageApi, contextHolder] = message.useMessage();
	const [urlMap, setUrlMap] = React.useState({});

	useEffect(() => {
		fetchMapLinks()
			.then((data) => {
				if (data?.data) {
					setUrlMap(data.data);
				} else {
					console.error("Invalid response from API");
				}
			})
			.catch((error) => {
				console.error("Failed to fetch map links:", error);
			});
	}, []);

	const handleDateChange = (newDate) => {
		setSelectDate(newDate);
		const formattedDate = newDate.format("YYYY-MM-DD");
		if (!urlMap[formattedDate]) {
			messageApi.open({
				type: "info",
				content: "选中日期暂无日志，试试昨天的吧～",
				duration: 1.5,
			});
			return;
		}
		window.location = urlMap[formattedDate];
		messageApi.open({
			type: "success",
			content: "正在打开",
			duration: 1.5,
		});
	};

	return Object.keys(urlMap).length > 0 ? (
		<div>
			{contextHolder}
			<div className="text-2xl text-center p-16 break-words sm:text-4xl">
				{`坚持不懈第 ${Object.keys(urlMap).length} 天`}
			</div>
			<div className="px-4 flex justify-center items-center sm:px-0 ">
				<CalendarComponent
					selectDate={selectDate}
					setSelectDate={handleDateChange}
				/>
			</div>
		</div>
	) : (
		<Space
			size={10}
			className="flex justify-center items-center pt-16 flex-col"
		>
			<Flex align="center" gap="middle">
				<Spin size="large" />
			</Flex>
			<div className="text-4xl">加载中...</div>
			<div>如果长时间未加载成功，请联系管理员</div>
		</Space>
	);
};

export default Home;
