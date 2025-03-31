import Link from "next/link";
import Image from "next/image";

const VideoList = ({ videoId, title, channel, views, timestamp }) => {
  return (
    <Link href={`/watch/${videoId}`}>
      <div className="group flex gap-3 py-1 lg:py-2 rounded-[5px] cursor-pointer">
        {/* Thumbnail */}
        <div className="w-[130px] h-[75px] lg:w-[168px] lg:h-[94px] relative">
          <iframe
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${videoId}`}
            title={title}
            allowFullScreen
            className="rounded-[8px]"
          ></iframe>
          {/* Icons Container (visible on hover) */}
          <div className="absolute right-2 top-2 flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <div className="flex w-[26px] h-[26px] bg-[#0f0f0f] opacity-80 rounded-[5px] items-center justify-center">
              <Image
                src="/icons/watch-later.svg"
                width={18}
                height={20}
                alt="Watch Later"
                className="dark:invert"
              />
            </div>
            <div className="flex w-[26px] h-[26px] bg-[#0f0f0f] opacity-80 rounded-[5px] items-center justify-center">
              <Image
                src="/icons/add-to-queue.svg"
                width={18}
                height={20}
                alt="Add to Queue"
                className="dark:invert"
              />
            </div>
          </div>
        </div>

        {/* Video Info */}
        <div className="flex flex-1">
          <div className="flex flex-col flex-1">
            <h2 className="text-[11px] lg:text-[14px] font-[500] lg:line-clamp-2">
              {title}
            </h2>
            <p className="text-gray-500 dark:text-gray-400 text-[9px] lg:text-[12px]">
              {channel}
            </p>
            <p className="text-gray-500 dark:text-gray-400 text-[9px] lg:text-[12px]">
              {views} • {timestamp}
            </p>
          </div>
          <div className="flex pr-2 lg:pr-3">
            <Image
              src="/icons/more.svg"
              width={20}
              height={20}
              alt="More"
              className="dark:invert w-[20px] h-[20px] lg:w-[24px] lg:h-[24px]"
            />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default VideoList;