"use client"

import React, { useEffect, useRef, useState } from 'react'
import YouTube from 'react-youtube'
import { useCinema } from '../cinema-room';

const Player = () => {

  

  useEffect(() => {
    
  }, []);

  return (
    <div className='rounded-lg border bg-card text-card-foreground shadow-sm h-full w-full'>
      <iframe width="100%" height="100%"
        src="https://www.tiktok.com/static/profile-video?id=7300529992566394119&hide_author=1&utm_campaign=tt4d_open_api&utm_source=awbx37vxswqcvsf6">
      </iframe>
    </div>
  )
}

export default Player