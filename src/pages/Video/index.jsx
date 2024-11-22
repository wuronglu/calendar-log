import "video-react/dist/video-react.css";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Player } from "video-react";
import PropTypes from "prop-types";
import { Button, Result } from "antd";

const BaseBitifulCloudUrl = "https://kotlin.s3.bitiful.net/";
const Video = () => {
	const navigate = useNavigate();
	const [searchParams] = useSearchParams();
	const videoUrl = searchParams.get("video");
	return videoUrl ? (
		<>
			<Player>
				<source src={BaseBitifulCloudUrl + videoUrl} />
			</Player>
		</>
	) : (
		<Result
			status="404"
			title="404"
			subTitle="Sorry, the page you visited does not exist."
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
