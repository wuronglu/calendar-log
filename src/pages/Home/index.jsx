import React from "react";
import dayjs from "dayjs";
import CalendarComponent from "./CalendarComponent";
import { message, Flex, Spin, Space } from "antd";
import mapLinks from "../../map-links/map-links";
import ReviewCard from "./ReviewCard";

const Home = () => {
	const [selectDate, setSelectDate] = React.useState(dayjs());
	const [messageApi, contextHolder] = message.useMessage();

	const handleDateChange = (newDate) => {
		setSelectDate(newDate);
		const formattedDate = newDate.format("YYYY-MM-DD");
		if (!mapLinks[formattedDate]) {
			messageApi.open({
				type: "info",
				content: "选中日期暂无日志，试试昨天的吧～",
				duration: 1.5,
			});
			return;
		}
		window.location = mapLinks[formattedDate];
		messageApi.open({
			type: "success",
			content: "正在打开",
			duration: 1.5,
		});
	};

	return Object.keys(mapLinks).length > 0 ? (
		<div>
			{contextHolder}
			<div className="text-2xl text-center p-16 break-words sm:text-4xl">
				{`坚持不懈第 ${Object.keys(mapLinks).length} 天`}
			</div>
			<div className="px-4 flex justify-center items-center sm:px-0 flex-col">
				<CalendarComponent
					selectDate={selectDate}
					setSelectDate={handleDateChange}
				/>
			</div>
			<div className="text-lg pt-8 pb-2 flex justify-center">
				很久没看以下内容了，复习一下吧
			</div>
			<ReviewCard />
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
