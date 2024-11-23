import "video-react/dist/video-react.css";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Player, BigPlayButton, LoadingSpinner } from "video-react";
import PropTypes from "prop-types";
import { Button, Result } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";

const BaseBitifulCloudUrl = "https://kotlin.s3.bitiful.net/";
const Video = () => {
	const navigate = useNavigate();
	const [searchParams] = useSearchParams();
	const videoUrl = searchParams.get("name");
	return videoUrl ? (
		<div className="flex flex-col justify-center items-center h-screen bg-gray-100 relative">
			{/* 返回按钮 */}
			<div className="absolute top-8 left-4 md:top-8 md:left-8">
				<button
					className="flex items-center gap-2 p-2 md:p-3 rounded-full bg-gray-100 hover:bg-gray-200 transition duration-200 shadow-md border border-gray-300 text-sm md:text-base"
					onClick={() => navigate("/")}
				>
					<ArrowLeftOutlined className="text-lg md:text-xl text-gray-700" />
					<span className="text-gray-700 font-medium sm:block">Home</span>
				</button>
			</div>

			{/* 视频播放器 */}
			<div className="max-w-6xl w-full shadow-2xl rounded-lg overflow-hidden">
				<Player
					fluid
					width="100%"
					height="auto"
					playsInline
					className="rounded-lg"
				>
					<source src={BaseBitifulCloudUrl + videoUrl} />
					<BigPlayButton position="center" />
					<LoadingSpinner />
				</Player>
			</div>
		</div>
	) : (
		<Result
			status="404"
			title="404"
			subTitle="Sorry, the page you visited does not exist, please check the URL and try again later"
			extra={
				<Button type="primary" onClick={() => navigate("/")}>
					Back Home
				</Button>
			}
		/>
	);
};

Video.propTypes = {
	videoUrl: PropTypes.string.isRequired,
};

export default Video;
