import "video-react/dist/video-react.css";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Player, BigPlayButton, LoadingSpinner } from "video-react";
import PropTypes from "prop-types";
import { Button, Result } from "antd";

const BaseBitifulCloudUrl = "https://kotlin.s3.bitiful.net/";
const Video = () => {
	const navigate = useNavigate();
	const [searchParams] = useSearchParams();
	const videoUrl = searchParams.get("name");
	return videoUrl ? (
		<div className="flex justify-center items-center h-screen border-l-orange-900">
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
			subTitle="Sorry, the page you visited does not exist,please check the url and try again later"
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
