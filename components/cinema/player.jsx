import React from 'react'
import YouTube from 'react-youtube'

const Player = () => {
  return (
    <div>
      <YouTube 
        videoId="3mk5SvV4mzI"
        className='h-full w-full'
        opts={{
          height: '100%',
          width: '100%',
          playerVars: {
            autoplay: 1,
          },
        }}
      />
    </div>
  )
}

export default Player