import { useRouter } from "next/router";
import Navbar from "@/components/Navbar";
import VideoList from "@/components/VideoList";
import { useState, useEffect } from "react";
import Image from "next/image";
import { fetchVideoDetails, fetchVideos } from "@/utils/youtubeApi";
import SubCategory from "@/components/SubCategory";
import Comments from "@/components/Comments";
import ScrollSubCategory from "@/components/ScrollSubCategory";

const formatTimestamp = (publishedAt) => {
  if (!publishedAt) return "Just now";
  const now = new Date();
  const publishedDate = new Date(publishedAt);
  const diffInSeconds = Math.floor((now - publishedDate) / 1000);

  const intervals = [
    { label: "year", seconds: 31536000 },
    { label: "month", seconds: 2592000 },
    { label: "week", seconds: 604800 },
    { label: "day", seconds: 86400 },
    { label: "hour", seconds: 3600 },
    { label: "minute", seconds: 60 },
  ];

  for (const interval of intervals) {
    const count = Math.floor(diffInSeconds / interval.seconds);
    if (count >= 1) {
      return `${count} ${interval.label}${count > 1 ? "s" : ""} ago`;
    }
  }
  return "Just now";
};

const Watch = () => {
  const router = useRouter();
  const { videoId } = router.query;
  const [videoData, setVideoData] = useState(null);
  const [error, setError] = useState(null);
  const [relatedVideos, setRelatedVideos] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const staticData = {
    subscribers: "10.2M",
    views: "1.3 M",
    timestamp: "1 month ago",
    likes: "82K",
  };

  // Fetch video details
  useEffect(() => {
    if (!videoId) return;

    const fetchData = async () => {
      try {
        const data = await fetchVideoDetails(videoId);
        setVideoData({
          videoId: videoId || "dQw4w9WgXcQ",
          title: data.title,
          channel: data.channel,
          hashtags: data.hashtags || [],
          ...staticData,
        });
        setError(null);
      } catch (err) {
        setError(err.message);
        setVideoData(null);
      }
    };

    fetchData();
  }, [videoId]);

  // Fetch related videos
  useEffect(() => {
    if (!videoData || !videoData.hashtags || videoData.hashtags.length === 0) return;

    const fetchRelatedVideos = async () => {
      try {
        const query = videoData.hashtags.join(" ");
        console.log("Fetching related videos for query:", query);
        const response = await fetchVideos(query);
        console.log("API Response:", response);
        const fetchedVideos = response?.items || [];

        const filteredVideos = fetchedVideos.filter(
          (video) => video.id.videoId !== videoId
        );
        setRelatedVideos(filteredVideos);
      } catch (error) {
        console.error("Error fetching related videos:", error);
        setRelatedVideos([]);
      }
    };

    fetchRelatedVideos();
  }, [videoData, videoId]);

  if (!videoData && !error) {
    return (
      <div className="bg-white dark:bg-[#0f0f0f] text-black dark:text-white min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white dark:bg-[#0f0f0f] text-black dark:text-white min-h-screen flex items-center justify-center">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-[#0f0f0f] text-black dark:text-white">
      {/* Navbar with Sidebar */}
      <div className="h-full">
        <Navbar
          onSidebarToggle={() => {}}
          initialSidebarExpanded={true}
          alwaysShowSidebar={false}
        />
      </div>

      {/* Video Playback Section */}
      <div className="w-full max-w-[2314px] h-screen overflow-y-auto 2xl:mx-auto scrollbar-hide transition-all duration-300">
        <div className="pb-6 pt-16 lg:pt-20 lg:grid lg:grid-cols-[2fr_1fr] xl:grid-cols-[2.4fr_1fr] 2xl:grid-cols-[4.5fr_1fr] lg:gap-[6px]">
          {/* Left Column: Video Player, Metadata, Comments (for lg screens) */}
          <div className="px-5">
            {/* Video Player */}
            <div className="md:w-[580px] lg:w-full mx-auto">
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${videoData.videoId}`}
                title={videoData.title}
                allowFullScreen
                className="rounded-[10px] md:h-[325px] lg:h-[360px] xl:h-[543px] 2xl:h-[1035px] aspect-video"
              ></iframe>
            </div>
            <div className="mt-2 lg:mt-[10px]">
              <h1 className="text-[15px] dark:text-white lg:text-[20px] text-[#0f0f0f0] font-[600]">
                {videoData.title}
              </h1>
            </div>

            <div className="flex items-center justify-between lg:py-1">
              {/* Video Metadata */}
              <div className="pt-1">
                <div className="flex items-center">
                  <div className="rounded-full bg-gray-500 w-[34px] h-[34px] lg:w-[39px] lg:h-[39px]"></div>
                  <div className="ml-3 leading-4 pt-1">
                    <p className="text-[12px] lg:text-[16px] dark:text-white text-black font-[500]">
                      {videoData.channel}
                    </p>
                    <p className="text-[10px] lg:text-[12px] text-gray-500 dark:text-gray-400">
                      {staticData.subscribers} subscribers
                    </p>
                  </div>
                  <button className="ml-4 lg:ml-9 xl:ml-10 bg-black dark:bg-white dark:text-black text-white tracking-[0.2px] px-[12px] font-[500] py-1.5 lg:py-[7.5px] lg:px-[14px] rounded-full text-[11px] lg:text-[14px] hover:bg-[#313131] dark:hover:bg-gray-200">
                    Subscribe
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center mt-3 space-x-2 xl:space-x-[10px]">
                <div className="flex items-center">
                  <button className="flex items-center dark:text-white bg-gray-100 dark:bg-[#272727] px-2.5 py-1.5 xl:px-3 xl:py-[7px] rounded-l-full border-r-[1px] lg:border-r-[2px] text-[11px] lg:text-[14px] text-gray-700 font-[500] xl:font-[600] hover:bg-gray-300 dark:hover:bg-[#313131] shadow-xs">
                    <Image 
                      src="/icons/like.svg"
                      width={15}
                      height={15}
                      alt="Like"
                      className="mr-3 dark:invert lg:w-[19px] lg:h-[19px] xl:w-[20px] xl:h-[20px]"
                    />
                    {videoData.likes}
                  </button>
                  <button className="bg-gray-100 dark:bg-[#272727] px-2.5 py-1.5 xl:px-3 xl:py-[7px] rounded-r-full hover:bg-gray-300 dark:hover:bg-[#313131] shadow-xs">
                    <Image
                      src="/icons/dislike.svg"
                      width={17}
                      height={17}
                      alt="Dislike"
                      className="dark:invert lg:w-[21px] lg:h-[21px] xl:w-[22px] xl:h-[22px]"
                    />
                  </button>
                </div>
                <button className="flex items-center dark:text-white bg-gray-100 dark:bg-[#272727] px-2.5 py-1.5 xl:px-3 xl:py-[7px] rounded-full text-[11px] lg:text-[14px] text-gray-700 font-[500] xl:font-[600] hover:bg-gray-300 dark:hover:bg-[#313131] shadow-xs">
                  <Image
                    src="/icons/share.svg"
                    width={17}
                    height={17}
                    alt="Share"
                    className="mr-1 dark:invert lg:w-[21px] lg:h-[21px] xl:w-[22px] xl:h-[22px]"
                  />
                  Share
                </button>
                <button className="flex lg:hidden xl:flex items-center dark:text-white bg-gray-100 dark:bg-[#272727] px-2.5 py-1.5 xl:px-3 xl:py-[7px] rounded-full text-[11px] xl:text-[14px] text-gray-700 font-[500] xl:font-[600] hover:bg-gray-300 dark:hover:bg-[#313131] shadow-xs">
                  <Image
                    src="/icons/clip.svg"
                    width={17}
                    height={17}
                    alt="Clip"
                    className="mr-1 dark:invert xl:w-[22px] xl:h-[22px]"
                  />
                  Clip
                </button>
                <button className="flex hidden xl:flex items-center dark:text-white bg-gray-100 dark:bg-[#272727] px-2.5 py-1.5 xl:px-4 xl:py-[7px] rounded-full text-[11px] lg:text-[14px] text-gray-700 font-[500] xl:font-[600] hover:bg-gray-300 dark:hover:bg-[#313131] shadow-xs">
                  <Image
                    src="/icons/save.svg"
                    width={17}
                    height={17}
                    alt="Share"
                    className="mr-1 dark:invert lg:w-[21px] lg:h-[21px] xl:w-[22px] xl:h-[22px]"
                  />
                  Save
                </button>
                <button className="flex items-center bg-gray-100 dark:bg-[#272727] px-1.5 py-1.5 xl:px-2 xl:py-2 rounded-full hover:bg-gray-300 dark:hover:bg-[#313131] shadow-xs">
                  <Image
                    src="/icons/3-dots.svg"
                    width={17}
                    height={17}
                    alt="More"
                    className="dark:invert lg:w-[21px] lg:h-[21px] xl:w-[22px] xl:h-[22px]"
                  />
                </button>
              </div>
            </div>

            <div className="flex flex-col w-full mx-auto bg-gray-100 dark:bg-[#313131] mt-3 lg:mt-[9px] py-2 lg:pb-4 px-2 gap-2 rounded-[10px]">
              <div className="flex items-center gap-2 pl-1">
                <p className="text-[11px] lg:text-[14px] font-[700] dark:text-white">
                  {staticData.views}
                </p>
                <p className="text-[11px] lg:text-[14px] font-[600] dark:text-white">
                  {staticData.timestamp}
                </p>
              </div>
              <div className="pl-1 indent-0">
                {videoData.hashtags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {videoData.hashtags.map((tag, index) => (
                      <span
                        key={index}
                        className="text-blue-500 text-[10px] leading-1 lg:leading-2 lg:text-[14px]"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Comments for lg screens (below metadata) */}
            <div className="hidden lg:block mt-4">
              <h2 className="text-[20px] font-[700]">3 Comments</h2>
              <Comments />
            </div>
          </div>

          {/* Right Column: Related Videos (only on lg screens and above) */}
          <div className="hidden lg:block xl:ml-[-4px]">
            <div className="xl:hidden">
              <SubCategory onCategoryChange={(category) => setSelectedCategory(category)} />
            </div>
            <div className="hidden xl:block">
              <ScrollSubCategory onCategoryChange={(category) => setSelectedCategory(category)}/>
            </div>
            <div className="flex flex-col lg:mt-[-7px] xl:mt-[-3px] xl:mt-0">
              {relatedVideos.length > 0 ? (
                relatedVideos.slice(0, 10).map((video) => (
                  <VideoList
                    key={video.id.videoId}
                    videoId={video.id.videoId}
                    title={video.snippet.title}
                    channel={video.snippet.channelTitle}
                    views="2.1 M views"
                    timestamp={formatTimestamp(video.snippet.publishedAt || "Just now")}
                  />
                ))
              ) : (
                <p className="text-gray-500 dark:text-gray-400">
                  No related videos found.
                </p>
              )}
            </div>
          </div>

          {/* For md screens and below: Related Videos, then Comments */}
          <div className="lg:hidden px-5">
            {/* Related Videos */}
            <div className="flex flex-col mt-4">
              <div>
                <SubCategory onCategoryChange={(category) => setSelectedCategory(category)} />
              </div>
              <div className="flex flex-col mt-[-5px]">
                {relatedVideos.length > 0 ? (
                  relatedVideos.slice(0, 5).map((video) => (
                    <VideoList
                      key={video.id.videoId}
                      videoId={video.id.videoId}
                      title={video.snippet.title}
                      channel={video.snippet.channelTitle}
                      views="2.1 M views"
                      timestamp={formatTimestamp(video.snippet.publishedAt || "Just now")}
                    />
                  ))
                ) : (
                  <p className="text-gray-500 dark:text-gray-400">
                    No related videos found.
                  </p>
                )}
              </div>
            </div>

            {/* Comments (below related videos for md screens) */}
            <div className="mt-4">
              <h2 className="text-[16px] font-[700]">3 Comments</h2>
              <Comments />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Watch;