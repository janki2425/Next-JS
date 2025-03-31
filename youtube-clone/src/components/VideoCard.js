import Link from "next/link";

const VideoCard = ({ videoId, title, channel, views, timestamp }) => {
  return (
    <Link href={`/watch/${videoId}`} className="block">
      <div className="bg-white overflow-hidden dark:bg-[#0f0f0f]">
        <iframe
          width="100%"
          height="200"
          src={`https://www.youtube.com/embed/${videoId}`}
          title={title}
          allowFullScreen
          className="rounded-lg w-full md:h-[188px] lg:h-[245px] xl:h-[180px] 2xl:h-[220px] aspect-video"
        ></iframe>


        <div className="p-2 dark:bg-[#0f0f0f]">
          <h2 className="text-[14px] sm:text-[15px] md:text-[16px] lg:text-[17px] font-semibold">
            {title}
          </h2>
          <p className="text-gray-500 text-[12px] sm:text-[13px] md:text-[14px] lg:text-[15px]">
            {channel} • {views} • {timestamp}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default VideoCard;
