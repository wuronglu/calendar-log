import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Calendar, Col, Radio, Row, Select } from "antd";
import { createStyles } from "antd-style";
import classNames from "classnames";
import dayjs from "dayjs";
import { HolidayUtil, Lunar } from "lunar-typescript";

const useStyle = createStyles(({ token, css, cx }) => {
	const lunar = css`
		color: ${token.colorTextTertiary};
		font-size: ${token.fontSizeSM}px;
	`;
	const weekend = css`
		color: ${token.colorError};
		&.gray {
			opacity: 0.4;
		}
	`;
	return {
		wrapper: css`
			width: 450px;
			border: 1px solid ${token.colorBorderSecondary};
			border-radius: ${token.borderRadiusOuter};
			padding: 5px;
		`,
		dateCell: css`
			position: relative;
			&:before {
				content: "";
				position: absolute;
				inset-inline-start: 0;
				inset-inline-end: 0;
				top: 0;
				bottom: 0;
				margin: auto;
				max-width: 40px;
				max-height: 40px;
				background: transparent;
				transition: background-color 300ms;
				border-radius: ${token.borderRadiusOuter}px;
				border: 1px solid transparent;
				box-sizing: border-box;
			}
			&:hover:before {
				background: rgba(0, 0, 0, 0.04);
			}
		`,
		today: css`
			&:before {
				border: 1px solid ${token.colorPrimary};
			}
		`,
		text: css`
			position: relative;
			z-index: 1;
		`,
		lunar,
		current: css`
			color: ${token.colorTextLightSolid};
			&:before {
				background: ${token.colorPrimary};
			}
			&:hover:before {
				background: ${token.colorPrimary};
				opacity: 0.8;
			}
			.${cx(lunar)} {
				color: ${token.colorTextLightSolid};
				opacity: 0.9;
			}
			.${cx(weekend)} {
				color: ${token.colorTextLightSolid};
			}
		`,
		monthCell: css`
			width: 120px;
			color: ${token.colorTextBase};
			border-radius: ${token.borderRadiusOuter}px;
			padding: 5px 0;
			&:hover {
				background: rgba(0, 0, 0, 0.04);
			}
		`,
		monthCellCurrent: css`
			color: ${token.colorTextLightSolid};
			background: ${token.colorPrimary};
			&:hover {
				background: ${token.colorPrimary};
				opacity: 0.8;
			}
		`,
		weekend,
	};
});

const CalendarComponent = ({ selectDate, setSelectDate }) => {
	const { styles } = useStyle();
	const [panelDate, setPanelDate] = React.useState(dayjs());
	const [isMobile, setIsMobile] = useState(false);

	useEffect(() => {
		const handleResize = () => {
			setIsMobile(window.innerWidth <= 768); // 判断是否为移动端，768px是一个常见的移动端断点
		};

		window.addEventListener("resize", handleResize);
		handleResize(); // 初始化时调用一次，确定当前屏幕尺寸

		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	const onPanelChange = (value, mode) => {
		console.log(value.format("YYYY-MM-DD"), mode);
		setPanelDate(value);
	};

	const onDateChange = (value, selectInfo) => {
		if (selectInfo.source === "date") {
			setSelectDate(value);
		}
	};

	const cellRender = (date, info) => {
		const d = Lunar.fromDate(date.toDate());
		const lunar = d.getDayInChinese();
		const solarTerm = d.getJieQi();
		const isWeekend = date.day() === 6 || date.day() === 0;
		const h = HolidayUtil.getHoliday(
			date.get("year"),
			date.get("month") + 1,
			date.get("date")
		);
		const displayHoliday =
			h?.getTarget() === h?.getDay() ? h?.getName() : undefined;

		if (info.type === "date") {
			return React.cloneElement(info.originNode, {
				...info.originNode.props,
				className: classNames(styles.dateCell, {
					[styles.current]: selectDate.isSame(date, "date"),
					[styles.today]: date.isSame(dayjs(), "date"),
				}),
				children: (
					<div className={styles.text}>
						<span
							className={classNames({
								[styles.weekend]: isWeekend,
								gray: !panelDate.isSame(date, "month"),
							})}
						>
							{date.get("date")}
						</span>
						{info.type === "date" && (
							<div className={styles.lunar}>
								{displayHoliday || solarTerm || lunar}
							</div>
						)}
					</div>
				),
			});
		}

		if (info.type === "month") {
			const d2 = Lunar.fromDate(new Date(date.get("year"), date.get("month")));
			const month = d2.getMonthInChinese();
			return (
				<div
					className={classNames(styles.monthCell, {
						[styles.monthCellCurrent]: selectDate.isSame(date, "month"),
					})}
				>
					{date.get("month") + 1}月（{month}月）
				</div>
			);
		}
	};

	const getYearLabel = (year) => {
		const d = Lunar.fromDate(new Date(year + 1, 0));
		if (isMobile) {
			return `${d.getYear()}`;
		}
		return `${d.getYearInChinese()}年（${d.getYearInGanZhi()}${d.getYearShengXiao()}年）`; // 默认显示详细年份
	};

	const getMonthLabel = (month, value) => {
		const d = Lunar.fromDate(new Date(value.year(), month));
		const lunar = d.getMonthInChinese();
		return `${month + 1}月（${lunar}月）`;
	};

	return (
		<div className={styles.wrapper}>
			<Calendar
				fullCellRender={cellRender}
				fullscreen={false}
				onPanelChange={onPanelChange}
				onSelect={onDateChange}
				headerRender={({ value, type, onChange, onTypeChange }) => {
					const start = 0;
					const end = 12;
					const monthOptions = [];
					let current = value.clone();
					const localeData = value.localeData();
					const months = [];
					for (let i = 0; i < 12; i++) {
						current = current.month(i);
						months.push(localeData.monthsShort(current));
					}
					for (let i = start; i < end; i++) {
						monthOptions.push({
							label: getMonthLabel(i, value),
							value: i,
						});
					}

					const year = value.year();
					const month = value.month();
					const options = [];
					for (let i = year - 10; i < year + 10; i += 1) {
						options.push({
							label: getYearLabel(i),
							value: i,
						});
					}

					return (
						<Row justify="end" gutter={8} style={{ padding: 8 }}>
							<Col>
								<Select
									size="small"
									popupMatchSelectWidth={false}
									value={year}
									options={options}
									onChange={(newYear) => {
										const now = value.clone().year(newYear);
										onChange(now);
									}}
								/>
							</Col>
							<Col>
								<Select
									size="small"
									popupMatchSelectWidth={false}
									value={month}
									options={monthOptions}
									onChange={(newMonth) => {
										const now = value.clone().month(newMonth);
										onChange(now);
									}}
								/>
							</Col>
							<Col>
								<Radio.Group
									size="small"
									onChange={(e) => onTypeChange(e.target.value)}
									value={type}
								>
									<Radio.Button value="month">月</Radio.Button>
									<Radio.Button value="year">年</Radio.Button>
								</Radio.Group>
							</Col>
						</Row>
					);
				}}
			/>
		</div>
	);
};

CalendarComponent.propTypes = {
	selectDate: PropTypes.instanceOf(dayjs).isRequired,
	setSelectDate: PropTypes.func.isRequired,
};

export default CalendarComponent;
