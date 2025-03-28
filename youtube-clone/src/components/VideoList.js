import Link from "next/link";
import Image from "next/image";

const VideoList = ({ videoId, title, channel, views, timestamp }) => {
  return (
    <Link href={`/watch/${videoId}`}>
      <div className="flex gap-3 hover:bg-gray-100 dark:hover:bg-[#272727] py-1 lg:py-2 lg:pb-0 rounded-[5px] cursor-pointer">
        {/* Thumbnail */}
        <div className="w-[130px] h-[75px] lg:w-[168px] lg:h-[94px]">
          <iframe
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${videoId}`}
            title={title}
            allowFullScreen
            className="rounded-[8px]"
          ></iframe>
        </div>
        {/* Video Info */}
        <div className="flex flex-1 items-start">
            <div className="flex flex-col w-full">
                <h2 className="text-[11px] lg:text-[14px] font-[500] lg:line-clamp-2">{title}</h2>
                <p className="text-gray-500 dark:text-gray-400 text-[9px] lg:text-[12px]">
                    {channel}
                </p>
                <p className="text-gray-500 dark:text-gray-400 lg:w-[120px] text-[9px] lg:text-[12px] truncate">
                    {views} • {timestamp}
                </p>
            </div>
            <div className="flex items-center p-1 lg:p-0 lg:pr-5">
                <Image src="/icons/more.svg"
                width={20}
                height={20}
                alt="more"
                className="dark:invert lg:w-[26px] lg:h-[26px]"
                />
            </div>
        </div>
      </div>
    </Link>
  );
};

export default VideoList;