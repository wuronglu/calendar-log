import { CalendarOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import mapLinks from "../../../map-links/map-links";
import PropTypes from "prop-types";

// 子组件：用于渲染单个日期项
function ReviewItem({ label, date, handleClick }) {
	if (!mapLinks[date]) return null;

	return (
		<div className="flex items-center space-x-2 cursor-pointer">
			<CalendarOutlined className="text-blue-500" />
			<span className="font-medium text-gray-700">{label}：</span>
			<span className="text-gray-500" onClick={() => handleClick(date)}>
				{date}
			</span>
		</div>
	);
}
ReviewItem.propTypes = {
	label: PropTypes.string.isRequired,
	date: PropTypes.string.isRequired,
	handleClick: PropTypes.func.isRequired,
};

export default function ReviewCard() {
	const oneWeekAgoDate = dayjs().subtract(1, "week").format("YYYY-MM-DD");
	const fourDaysAgoDate = dayjs().subtract(4, "day").format("YYYY-MM-DD");
	const twoWeeksAgoDate = dayjs().subtract(2, "week").format("YYYY-MM-DD");
	const oneMonthAgoDate = dayjs().subtract(1, "month").format("YYYY-MM-DD");

	const handleWeekClick = (date) => {
		window.location = mapLinks[date];
	};

	return (
		<div className="max-w-md mx-auto bg-white shadow-lg rounded-lg p-6 space-y-4">
			<ReviewItem
				label="一周前"
				date={oneWeekAgoDate}
				handleClick={handleWeekClick}
			/>
			<ReviewItem
				label="4 天前"
				date={fourDaysAgoDate}
				handleClick={handleWeekClick}
			/>
			<ReviewItem
				label="两周前"
				date={twoWeeksAgoDate}
				handleClick={handleWeekClick}
			/>
			<ReviewItem
				label="一月前"
				date={oneMonthAgoDate}
				handleClick={handleWeekClick}
			/>
		</div>
	);
}
