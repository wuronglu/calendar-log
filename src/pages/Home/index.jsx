import React from "react";
import dayjs from "dayjs";
import CalendarComponent from "./CalendarComponent";
import urlMap from "../../config/map";
import { message } from "antd";

const title = `坚持不懈第 ${Object.keys(urlMap).length} 天`;
const Home = () => {
	const [selectDate, setSelectDate] = React.useState(dayjs());
	const [messageApi, contextHolder] = message.useMessage();

	const handleDateChange = (newDate) => {
		setSelectDate(newDate);
		const formattedDate = newDate.format("YYYY-MM-DD");
		if (!urlMap[formattedDate]) {
			messageApi.open({
				type: "info",
				content: "选中日期暂无日志",
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

	return (
		<div>
			{contextHolder}
			<div className="text-2xl text-center p-16 break-words sm:text-4xl">
				{title}
			</div>
			<div className="px-4 flex justify-center items-center sm:px-0 ">
				<CalendarComponent
					selectDate={selectDate}
					setSelectDate={handleDateChange}
				/>
			</div>
		</div>
	);
};

export default Home;
