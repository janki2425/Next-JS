"use client";
import VideoCard from "./VideoCard";
import { useEffect, useState } from "react";
import { fetchVideos } from "../utils/youtubeApi";

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

const VideoFeed = ({ searchQuery, category, isSidebarVisible }) => {
  const [videos, setVideos] = useState([]);
  const [error, setError] = useState(null);

  // Fetch videos when the category or search query changes
  useEffect(() => {
    async function fetchData() {
      try {
        setError(null);

        const query = searchQuery || (category === "All" ? "trending videos" : category);
        console.log("Fetching videos for query:", query);
        const response = await fetchVideos(query);
        console.log("API Response:", response);
        const fetchedVideos = response?.items || [];

        if (fetchedVideos.length === 0) {
          console.log("No videos fetched for query:", query);
          setVideos([]);
          return;
        }

        console.log("Fetched videos:", fetchedVideos);
        setVideos(fetchedVideos);
      } catch (error) {
        console.error("Error fetching videos:", error);
        setError(error.message);
        setVideos([]);
      }
    }

    fetchData();
  }, [category, searchQuery]);

  // return (
  //   <div
  //     className={`flex flex-wrap gap-4 lg:gap-2 ml-[18px] lg:ml-[15px] xl:ml-10 ${
  //       isSidebarVisible ? "2xl:ml-48 lg:gap-2 2xl:gap-0" : "2xl:ml-20 lg:gap-4"
  //     }`}
  //   >
  //     {error ? (
  //       <p className="text-red-500">Error: {error}</p>
  //     ) : videos.length > 0 ? (
  //       videos.map((video) => (
  //         <VideoCard
  //           key={video.id.videoId}
  //           videoId={video.id.videoId}
  //           title={video.snippet.title}
  //           channel={video.snippet.channelTitle}
  //           views="N/A views"
  //           timestamp={formatTimestamp(video.snippet.publishedAt || "Just now")}
  //           isSidebarVisible={isSidebarVisible}
  //         />
  //       ))
  //     ) : (
  //       <p className="text-white">No videos found.</p>
  //     )}
  //   </div>
  // );
  return (
    <div
      className={`grid grid-cols-1 md:grid-cols-2 gap-4 px-5 2xl:px-0 ${
        isSidebarVisible ? "2xl:ml-48 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6 2xl:pl-3" : "2xl:ml-20 lg:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-6"
      }`}
    >
      {error ? (
        <p className="text-red-500">Error: {error}</p>
      ) : videos.length > 0 ? (
        videos.map((video) => (
          <VideoCard
            key={video.id.videoId}
            videoId={video.id.videoId}
            title={video.snippet.title}
            channel={video.snippet.channelTitle}
            views="N/A views"
            timestamp={formatTimestamp(video.snippet.publishedAt || "Just now")}
            isSidebarVisible={isSidebarVisible}
          />
        ))
      ) : (
        <p className="text-white">No videos found.</p>
      )}
    </div>
  );
  
};

export default VideoFeed;