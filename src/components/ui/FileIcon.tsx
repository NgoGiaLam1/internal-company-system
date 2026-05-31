import {

 FileText,
 FileArchive,
 FileSpreadsheet,
 FileImage,
 FileCode,
 FileVideo,
 FileAudio,

} from "lucide-react";


export function getFileIcon(
 fileName?: string | null
){

 const ext =
  fileName
   ?.split(".")
   .pop()
   ?.toLowerCase();

 switch(ext){

  case "zip":
  case "rar":
  case "7z":
  case "tar":
    return <FileArchive size={16} />;

  case "xlsx":
  case "xls":
  case "csv":
    return <FileSpreadsheet size={16} />;

  case "png":
  case "jpg":
  case "jpeg":
  case "gif":
  case "webp":
    return <FileImage size={16} />;

  case "mp4":
  case "mov":
  case "avi":
    return <FileVideo size={16} />;

  case "mp3":
  case "wav":
    return <FileAudio size={16} />;

  case "js":
  case "ts":
  case "json":
  case "java":
  case "cpp":
  case "py":
    return <FileCode size={16} />;

  default:
    return <FileText size={16} />;

 }

}