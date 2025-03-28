import React from 'react'
import Image from 'next/image';

function Comments() {
    const commentList=[
        {
            username:"@username1",
            comment:"Lorem ipsum dolor sit amet consectetur adipisicing elit."
        },
        {
            username:"@username2",
            comment:"Nihil iste, incidunt quia"
        },
        {
            username:"@username3",
            comment:" quo illo numquam quod repudiandae excepturi. Dolorum, odit iure temporibus dolore nemo"
        },
    ]
    return (
        <div className='flex flex-col'>
            {
            commentList.map((com,index)=>(
                <div key={index} className='py-1'>
                    <div className='flex items-start py-2'>
                        <div className='flex gap-2 w-full pr-5'>
                            <div className="rounded-full bg-gray-900 dark:bg-gray-300 w-[25px] h-[25px] lg:w-[35px] lg:h-[35px] lg:mr-1"></div>
                            <div className='flex flex-col'>
                                <div className='flex gap-2'>
                                    <h3 className="text-[9px] lg:text-[12px] text-black dark:text-white">{com.username}</h3>
                                    <p className="text-[9px] lg:text-[12px] opacity-60 dark:text-gray-300">1 year ago</p>
                                </div>
                                <p className="text-[11px] lg:text-[14px] opacity-90 dark:text-white">{com.comment}</p>
                                <div className='flex items-center'>
                                    <div className="p-2">
                                        <Image
                                            src="/icons/like.svg"
                                            width={14}
                                            height={14}
                                            alt="Like"
                                            className="dark:invert lg:w-[18px] lg:h-[18px]"
                                        />
                                    </div>
                                    <p className="text-[10px] lg:text-[12px] opacity-60">1.2K</p>
                                    <div className="p-2">
                                        <Image
                                            src="/icons/dislike.svg"
                                            width={17}
                                            height={17}
                                            alt="Dislike"
                                            className="dark:invert lg:w-[21px] lg:h-[21px]"
                                        />
                                    </div>
                                    <p className="text-[10px] lg:text-[12px] font-[600] dark:text-white">Reply</p>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center p-2 mr-4 lg:mr-0 rounded-full hover:bg-gray-100 dark:hover:bg-[#313131]">
                            <Image src="/icons/more.svg"
                            width={20}
                            height={20}
                            alt="more"
                            className="dark:invert lg:w-[23px] lg:h-[23px] xl:w-[25px] xl:h-[25px]"
                            />
                        </div>
                    </div>
                </div>
            ))
        }
        </div>
    )
}

export default Comments;
