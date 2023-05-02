import { Component } from "../core/Component";

export const mediaContainer = (fileType: string): Component => {
  switch (fileType) {
    case "image":
      return <Component>document.createElement("image-attachment");
      break;
    case "audio":
      return <Component>document.createElement("audio-attachment");
      break;
    case "video":
      return <Component>document.createElement("video-attachment");
      break;
    default:
      return <Component>document.createElement("file-attachment");
      break;
  }
};
