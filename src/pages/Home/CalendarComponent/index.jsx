import React, { useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import { Calendar, Col, Radio, Row, Select, Tour } from "antd";
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

const TOUR_KEY = "calendar_tour_shown";

const CalendarComponent = ({ selectDate, setSelectDate }) => {
	const { styles } = useStyle();
	const [panelDate, setPanelDate] = React.useState(dayjs());
	const [isMobile, setIsMobile] = useState(false);
	const [openTour, setOpenTour] = useState(false);
	const todayCellRef = useRef(null);

	const steps = [
		{
			title: "选择日期",
			description: "点击任意日期可以查看当日的学习记录",
			target: () => todayCellRef.current,
			placement: "bottom",
		},
	];

	useEffect(() => {
		const handleResize = () => {
			setIsMobile(window.innerWidth <= 768);
		};

		window.addEventListener("resize", handleResize);
		handleResize();

		const hasShownTour = localStorage.getItem(TOUR_KEY);
		if (!hasShownTour) {
			const timer = setTimeout(() => {
				setOpenTour(true);
			}, 500);
			return () => clearTimeout(timer);
		}

		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	const handleTourClose = () => {
		setOpenTour(false);
		localStorage.setItem(TOUR_KEY, "true");
	};

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
			const isToday = date.isSame(dayjs(), "date");
			const element = React.cloneElement(info.originNode, {
				...info.originNode.props,
				className: classNames(styles.dateCell, {
					[styles.current]: selectDate.isSame(date, "date"),
					[styles.today]: isToday,
				}),
				ref: isToday ? todayCellRef : null,
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
			return element;
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
		return `${d.getYearInChinese()}年（${d.getYearInGanZhi()}${d.getYearShengXiao()}年）`;
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
			<Tour open={openTour} onClose={handleTourClose} steps={steps} />
		</div>
	);
};

CalendarComponent.propTypes = {
	selectDate: PropTypes.instanceOf(dayjs).isRequired,
	setSelectDate: PropTypes.func.isRequired,
};

export default CalendarComponent;
