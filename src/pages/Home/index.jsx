import React from "react";
import dayjs from "dayjs";
import CalendarComponent from "./CalendarComponent";
import { message } from "antd";
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

	return (
		<div className="w-full px-2">
			{contextHolder}
			<div className="text-center">
				<h1 className="text-xl sm:text-2xl font-bold break-words py-8 lg:py-12">
					{`坚持不懈第 ${Object.keys(mapLinks).length} 天`}
				</h1>
			</div>
			<div className="w-full flex justify-center">
				<CalendarComponent
					selectDate={selectDate}
					setSelectDate={handleDateChange}
				/>
			</div>
			<div className="text-center py-4">
				<h2 className="text-base sm:text-lg">很久没看以下内容了，复习一下吧</h2>
			</div>
			<div>
				<ReviewCard />
			</div>
		</div>
	);
};

export default Home;
