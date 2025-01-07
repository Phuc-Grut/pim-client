import { useTranslation } from "react-i18next"

export const connectString = (props:string[]) => {
  const {t} = useTranslation()
  if (props.length > 1) {
    const s = props.reduce((a:string, b: string) => t(a) + t(' ') + t(b))
    return s
  } else {
    return t(props.toString())
  }
 
}

export const connectString_edit = (t: any, props: string[]) => {
  if (props.length > 1) {
    const s = props.reduce((a: string, b: string) => t(a) + t(' ') + t(b))
    return s
  } else {
    return t(props.toString())
  }

}