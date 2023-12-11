export const parseYtbLink = (url: string) => {
  let regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
  let match = url.match(regExp);
  return (match&&match[7].length==11)? match[7] : false;
}

export const getDefaultPicture = (youtubeId: string) => {
  return `https://img.youtube.com/vi/${youtubeId}/default.jpg`;
}