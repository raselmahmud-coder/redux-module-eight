import { useGetRelatedVideosQuery } from "../../../features/Api/apiSlice";
import Error from "../../ui/Error";
import RelatedVideoLoader from "../../ui/loaders/RelatedVideoLoader";
import RelatedVideo from "./RelatedVideo";

export default function RelatedVideos({ id, title }) {
  const {
    data: relatedVideos,
    isError,
    isLoading,
  } = useGetRelatedVideosQuery({ id, title });
  // decide what to render based on the state of the request
  let content = null;
  if (isLoading)
    content = (
      <>
        <RelatedVideoLoader />
        <RelatedVideoLoader />
        <RelatedVideoLoader />
      </>
    );
  if (isError) content = <Error message={"There was an error"}></Error>;
  if (relatedVideos?.length === 0) {
    content = <Error message={"There is no video"} />;
  }
  if (relatedVideos?.length > 0)
    content = relatedVideos.map((video) => (
      <RelatedVideo key={video.id} video={video} />
    ));
  return (
    <div className="col-span-full lg:col-auto max-h-[570px] overflow-y-auto">
      {content}
    </div>
  );
}
