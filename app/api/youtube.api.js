import { getDefaultPicture, parseYtbLink } from "@/lib/youtube.utils";

export const prepareTrack = async (youtubeUrl) => {
  const youtubeId = parseYtbLink(youtubeUrl);
  const info = await fetch(`https://ytb-video-finder.vercel.app/api/` + youtubeId).then(r => r.json());
  console.log(info)
  return {
    id: youtubeId,
    picture: getDefaultPicture(youtubeId),
    title: info.title,
    duration: parseInt(info.lengthSeconds),
    creationTime: new Date().getTime(),
  }
}