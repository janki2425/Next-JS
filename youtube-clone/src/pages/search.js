"use client";
import { useEffect, useState } from "react";
import { fetchVideos } from "@/utils/youtubeApi";
import { useSearchParams } from "next/navigation";
import VideoCard from "@/components/VideoCard";
import CategoryNav from "@/components/CategoryNav";

const SearchPage = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "trending videos";
  const [videos, setVideos] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(()=>{
    async function fetchData(){
        const fetchQuery = selectedCategory === "All" ? query : selectedCategory;
        const response = await fetchVideos(fetchQuery);
        console.log("API Response:", response);
        const fetchedVideos = response?.items || [];

        try{
          if (fetchedVideos.length === 0) {
            console.log("No videos fetched for query:", fetchQuery);
            setVideos([]);
            return;
          }
  
          setVideos(fetchedVideos);
        }
        catch (error) {
          console.error("Error fetching videos:", error);
          setVideos([]);
        }
    }
    fetchData();
  },[query, selectedCategory])

  useEffect(() => {
    console.log("Videos:", videos);
    console.log("Selected Category:", selectedCategory);
  }, [selectedCategory, videos]);

  return (
    <div className="p-4">
      {/* Category Navigation */}
      <CategoryNav onCategoryChange={(category) => setSelectedCategory(category)} />

      <h1 className="text-xl font-bold mb-4 text-white">
        Showing videos for "{query}"
      </h1>
      
      <div className="grid grid-cols-2 xl:grid-cols-3 gap-4">
        {videos.length > 0 ? (
          videos.map((video) => (
            <VideoCard
              key={video?.id?.videoId || Math.random()}
              videoId={video?.id?.videoId || ""}
              title={video?.snippet?.title || "Untitled"}
              channel={video?.snippet?.channelTitle || "Unknown Channel"}
              views="N/A"
              timestamp={video?.snippet?.publishedAt || "Just now"}
            />
          ))
        ) : (
          <p className="text-gray-500">No videos available for this category.</p>
        )}
      </div>
    </div>
  );
};

export default SearchPage;