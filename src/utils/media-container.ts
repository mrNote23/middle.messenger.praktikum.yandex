export const mediaContainer = (fileType: string): HTMLElement => {
  switch (fileType) {
    case "image":
      return document.createElement("image-attachment");
      break;
    case "audio":
      return document.createElement("audio-attachment");
      break;
    case "video":
      return document.createElement("video-attachment");
      break;
    default:
      return document.createElement("file-attachment");
      break;
  }
};
