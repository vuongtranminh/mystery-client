"use client"

import React, { useEffect, useRef, useState } from 'react'
import YouTube from 'react-youtube'
import { useCinema } from '../cinema-room';

const Player = () => {

  useEffect(() => {
  }, []);

  return (
    <div className='rounded-lg border bg-card text-card-foreground shadow-sm h-full w-full'>
      {/* <iframe width="100%" height="100%" allow="autoplay"
        src="/static/profile-video?id=7300529992566394119"> */}
        {/* <iframe width="100%" height="100%" allow="autoplay"
        src="https://www.youtube.com/watch?v=FxoFiRRq6GE&list=LL&index=330&t=2839s">
        
      </iframe> */}
      {/* <iframe width="560" height="315" src="https://www.youtube.com/embed/FxoFiRRq6GE?si=lT24F_uYUl_xhNE4" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe> */}
      {/* <iframe width="560" height="315" src="https://www.tiktok.com/static/profile-video?id=7300529992566394119" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe> */}
      <iframe
        src="https://www.tiktok.com/embed/7300529992566394119"
        width="100%"
        height="100%"
        allowfullscreen
        allow="encrypted-media;"
      ></iframe>
    </div>
  )
}

export default Player