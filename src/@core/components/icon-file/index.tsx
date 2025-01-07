import * as icons from 'becoxy-icons'

interface IconProps {
  fileType: any;
}

export const Icon = ({ fileType, ...props }: IconProps) => {
  let icon: any
  if (fileType === "aac") {
    icon = "FiletypeAac"
  } else if (fileType === "ai") {
    icon = "FiletypeAi"
  } else if (fileType === "bmp") {
    icon = "FiletypeBmp"
  } else if (fileType === "cs") {
    icon = "FiletypeCs"
  } else if (fileType === "css") {
    icon = "FiletypeCss"
  } else if (fileType === "csv") {
    icon = "FiletypeCsv"
  } else if (fileType === "doc") {
    icon = "FiletypeDoc"
  } else if (fileType === "docx") {
    icon = "FiletypeDocx"
  } else if (fileType === "exe") {
    icon = "FiletypeExe"
  } else if (fileType === "gif") {
    icon = "FiletypeGif"
  } else if (fileType === "heic") {
    icon = "FiletypeHeic"
  } else if (fileType === "html") {
    icon = "FiletypeHtml"
  } else if (fileType === "java") {
    icon = "FiletypeJava"
  } else if (fileType === "jpg" || fileType === "jpeg") {
    icon = "FiletypeJpg"
  } else if (fileType === "js") {
    icon = "FiletypeJs"
  } else if (fileType === "json") {
    icon = "FiletypeJson"
  } else if (fileType === "jsx") {
    icon = "FiletypeJsx"
  } else if (fileType === "key") {
    icon = "FiletypeKey"
  } else if (fileType === "m4p") {
    icon = "FiletypeM4p"
  } else if (fileType === "md") {
    icon = "FiletypeMd"
  } else if (fileType === "mdx") {
    icon = "FiletypeMdx"
  } else if (fileType === "mov") {
    icon = "FiletypeMov"
  } else if (fileType === "mp3") {
    icon = "FiletypeMp3"
  } else if (fileType === "mp4") {
    icon = "FiletypeMp4"
  } else if (fileType === "otf") {
    icon = "FiletypeOtf"
  } else if (fileType === "pdf") {
    icon = "FiletypePdf"
  } else if (fileType === "php") {
    icon = "FiletypePhp"
  } else if (fileType === "png") {
    icon = "FiletypePng"
  } else if (fileType === "ppt") {
    icon = "FiletypePpt"
  } else if (fileType === "pptx") {
    icon = "FiletypePptx"
  } else if (fileType === "psd") {
    icon = "FiletypePsd"
  } else if (fileType === "py") {
    icon = "FiletypePy"
  } else if (fileType === "raw") {
    icon = "FiletypeRaw"
  } else if (fileType === "rb") {
    icon = "FiletypeRb"
  } else if (fileType === "sass") {
    icon = "FiletypeSass"
  } else if (fileType === "scss") {
    icon = "FiletypeScss"
  } else if (fileType === "sh") {
    icon = "FiletypeSh"
  } else if (fileType === "sql") {
    icon = "FiletypeSql"
  } else if (fileType === "svg") {
    icon = "FiletypeSvg"
  } else if (fileType === "tiff") {
    icon = "FiletypeTiff"
  } else if (fileType === "tsx") {
    icon = "FiletypeTsx"
  } else if (fileType === "ttf") {
    icon = "FiletypeTtf"
  } else if (fileType === "txt") {
    icon = "FiletypeTxt"
  } else if (fileType === "wav") {
    icon = "FiletypeWav"
  } else if (fileType === "woff") {
    icon = "FiletypeWoff"
  } else if (fileType === "xls") {
    icon = "FiletypeXls"
  } else if (fileType === "xlsx") {
    icon = "FiletypeXlsx"
  } else if (fileType === "xml") {
    icon = "FiletypeXml"
  } else if (fileType === "yml") {
    icon = "FiletypeYml"
  } else if (fileType === "zip" || fileType === "rar") {
    icon = "FileZip"
  } 
  // @ts-ignore
  const BootstrapIcon = icons[icon]
  return <BootstrapIcon {...props} fontSize={20} />
}