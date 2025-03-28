const API_KEY = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;
const BASE_URL = "https://www.googleapis.com/youtube/v3";

export const fetchVideos = async (query) => {
if (!API_KEY) {
  throw new Error("Missing API key: Please set NEXT_PUBLIC_YOUTUBE_API_KEY in .env.local");
}

try {
  const url = `${BASE_URL}/search?part=snippet&q=${encodeURIComponent(
    query
  )}&key=${API_KEY}&type=video&maxResults=12`;
  console.log("Fetching videos with URL:", url);
  const response = await fetch(url);

  if (!response.ok) {
    const errorData = await response.json();
    console.error("HTTP error response:", errorData);
    throw new Error(
      `HTTP error! Status: ${response.status}, Message: ${errorData.error?.message || "Unknown error"}`
    );
  }

  const data = await response.json();
  console.log("YouTube API Response:", data);

  if (data.error) {
    throw new Error(`YouTube API error: ${data.error.message}`);
  }

  return data;
} catch (error) {
  console.error("Error fetching videos from YouTube API:", error);
  return { items: [] };
}
};

export const fetchVideoDetails = async (videoId) => {
if (!API_KEY) {
  throw new Error("Missing API key: Please set NEXT_PUBLIC_YOUTUBE_API_KEY in .env.local");
}

try {
  const url = `${BASE_URL}/videos?part=snippet&id=${videoId}&key=${API_KEY}`;
  console.log("Fetching video details with URL:", url);
  const response = await fetch(url);

  if (!response.ok) {
    const errorData = await response.json();
    console.error("HTTP error response:", errorData);
    throw new Error(
      `HTTP error! Status: ${response.status}, Message: ${errorData.error?.message || "Unknown error"}`
    );
  }

  const data = await response.json();
  console.log("YouTube API Response:", data);

  if (data.error) {
    throw new Error(`YouTube API error: ${data.error.message}`);
  }

  if (!data.items || data.items.length === 0) {
    throw new Error("Video not found or unavailable");
  }

  const video = data.items[0];
  if (!video.snippet || !video.snippet.title || !video.snippet.channelTitle) {
    throw new Error("Invalid video data: missing required fields (title or channelTitle)");
  }

  return {
    videoId: video.id,
    title: video.snippet.title,
    channel: video.snippet.channelTitle,
    hashtags: video.snippet.tags || [],
  };
} catch (error) {
  console.error("Error fetching video details from YouTube API:", error);
  throw error;
}
};