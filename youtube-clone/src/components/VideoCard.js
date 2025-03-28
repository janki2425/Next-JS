import Link from "next/link";

const VideoCard = ({ videoId, title, channel, views, timestamp, isSidebarVisible }) => {
  return (
    <Link href={`/watch/${videoId}`}>
      <div
        className={`pb-4 xl:px-0 w-[330px] h-[300px] 2xl:h-[340px] xl:mr-4 
        ${
          isSidebarVisible
            ? "lg:w-[365px] lg:h-[370px] lg:ml-4 xl:w-[370px] xl:h-[310px] xl:ml-0 2xl:w-[410px] 2xl:h-[350px] 2xl:ml-8"
            : "lg:w-[445px] lg:h-[390px] xl:w-[305px] xl:h-[300px] 2xl:w-[380px] 2xl:h-[360px] 2xl:ml-[-10px]"
        }
        `}
      >
        <iframe
          width="100%"
          height="200"
          src={`https://www.youtube.com/embed/${videoId}`}
          title={title}
          allowFullScreen
          className={`rounded-[8px] w-[100%] h-[190px] pb-1 aspect-video
          ${
            isSidebarVisible
              ? "lg:h-[225px] xl:h-[200px] 2xl:h-[205px]"
              : "lg:h-[250px] xl:h-[190px] 2xl:h-[215px]"
          }
          `}
        ></iframe>
        <h2 className="text-[15px] lg:text-[20px] xl:text-[15px] 2xl:text-[17px] font-[600] 2xl:font-[500]">
          {title}
        </h2>
        <p className="text-gray-500 text-[12px] lg:text-[15px] xl:text-[12px] 2xl:text-[15px]">
          {channel} • {views} • {timestamp}
        </p>
      </div>
    </Link>
  );
};

export default VideoCard;