import { useGetVideosQuery } from "../../features/Api/apiSlice";
import Error from "../ui/Error";
import VideoLoader from "../ui/loaders/VideoLoader";
import Video from "./Video";

export default function Videos() {
  const { data: videos, isError, isLoading } = useGetVideosQuery();
  // decide what to render based on the state of the request
  if (isLoading)
    return (
      <>
        <VideoLoader />
        <VideoLoader />
        <VideoLoader />
        <VideoLoader />
      </>
        );
  if (isError) return <Error message={"There was an error"} />;
  if (videos.length === 0)
    return <Error message={"There was not found any videos"} />;
  return (
    <>
      {videos.length > 0 &&
        videos.map((video) => <Video key={video.id} video={video} />)}
    </>
  );
}
