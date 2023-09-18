import { LazyLoadImage } from "react-lazy-load-image-component";

function VideoCard(props) {
  function formatLargeNumber(number) {
    if (number >= 1e9) {
      return (number / 1e9).toFixed(1) + "B";
    } else if (number >= 1e6) {
      return (number / 1e6).toFixed(1) + "M";
    } else if (number >= 1e3) {
      return (number / 1e3).toFixed(1) + "K";
    }
  }

  function formatSecondsToTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    const formattedMinutes = String(minutes).padStart(1, "0");
    const formattedSeconds = String(remainingSeconds).padStart(2, "0");

    return `${formattedMinutes}:${formattedSeconds}`;
  }

  return (
    <>
      {props.video ? (
        props.video.map((video) => (
          <div
            className="col-md-4 col-sm-6 col-12 col-lg-3 mb-3 card"
            key={video.video.videoId}
          >
            <LazyLoadImage
              className="content-img"
              width="100%"
              height="200px"
              src={video.video.thumbnails[0].url}
            />
            <div className="card-deatils">
              <div className="avatar">
                <img src={video.video.author.avatar[0].url} alt="" />
                <div className="time-format">
                  <p>{formatSecondsToTime(video.video.lengthSeconds)}</p>
                </div>
              </div>
              <div className="detail">
                <h3>{video.video.title.slice(0, 36)}...</h3>
                <p>{video.video.author.title}</p>
                <p>
                  {video.video.publishedTimeText} •{" "}
                  {formatLargeNumber(video.video.stats.views)}
                </p>
              </div>
            </div>
          </div>
        ))
      ) : (
        <h1>Not Found</h1>
      )}
    </>
  );
}

export default VideoCard;
