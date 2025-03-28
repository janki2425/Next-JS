// import Link from "next/link";

// const VideoCard = ({ videoId, title, channel, views, timestamp, isSidebarVisible }) => {
//   return (
//     <Link href={`/watch/${videoId}`}>
//       <div
//         className={`pb-4 xl:px-0 w-[330px] h-[300px] 2xl:h-[340px] xl:mr-4 
//         ${
//           isSidebarVisible
//             ? "lg:w-[365px] lg:h-[370px] lg:ml-4 xl:w-[370px] xl:h-[310px] xl:ml-0 2xl:w-[410px] 2xl:h-[350px] 2xl:ml-8"
//             : "lg:w-[445px] lg:h-[390px] xl:w-[305px] xl:h-[300px] 2xl:w-[380px] 2xl:h-[360px] 2xl:ml-[-10px]"
//         }
//         `}
//       >
//         <iframe
//           width="100%"
//           height="200"
//           src={`https://www.youtube.com/embed/${videoId}`}
//           title={title}
//           allowFullScreen
//           className={`rounded-[8px] w-[100%] h-[190px] pb-1 aspect-video
          
//           `}
//         ></iframe>
//         <h2 className="text-[15px] lg:text-[20px] xl:text-[15px] 2xl:text-[17px] font-[600] 2xl:font-[500]">
//           {title}
//         </h2>
//         <p className="text-gray-500 text-[12px] lg:text-[15px] xl:text-[12px] 2xl:text-[15px]">
//           {channel} • {views} • {timestamp}
//         </p>
//       </div>
//     </Link>
//   );
// };

// export default VideoCard;



import Link from "next/link";

const VideoCard = ({ videoId, title, channel, views, timestamp }) => {
  return (
    <Link href={`/watch/${videoId}`} className="block">
      <div className="bg-white overflow-hidden">
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
