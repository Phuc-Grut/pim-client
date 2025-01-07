import moment from "moment"
import { UseFormSetError } from "react-hook-form"
import { isObjEmpty } from "../Utils"

export const mapObjectError = (rs: any, setError: UseFormSetError<any>, t: Function) => {

  for (let i = 0; i < rs.errors.length; i++) {
    setError(
      rs.errors[i].propertyName[0].toLowerCase() + rs.errors[i].propertyName.slice(1),
      { type: 'custom', message: `${t(rs.errors[i].propertyName)} ${t(rs.errors[i].errorMessage)}` }
    )
  }
}

export const mapObjectDate = (data: any, listObjectDate: any) => {
  const newObj: any = {}
  for (const [name, value] of Object.entries(data)) {
    newObj[name] = value
    if (listObjectDate.includes(name) && value) {
      const date = moment(value).toDate()
      newObj[name] = new Date(date.getTime() + Math.abs(date.getTimezoneOffset() * 60000))
    }
  }
  return newObj
}

export const mapObjectDateTime = (data: any, listObjectDate: any, listObjectTime: any) => {
  const newObj: any = {}
  for (const [name, value] of Object.entries(data)) {
    newObj[name] = value
    if (listObjectDate.includes(name) && value) {
      const date = moment(value).toDate()
      newObj[name] = new Date(date.getTime() + Math.abs(date.getTimezoneOffset() * 60000))
    } else if (listObjectTime && listObjectTime.includes(name) && value) {
      newObj[name] = moment(value).format('HH:mm:ss')
    }
  }
  return newObj
}

export const mapObjectTime = (data: any, listObjectTime: any) => {
  const newObj: any = {}
  for (const [name, value] of Object.entries(data)) {
    newObj[name] = value
    if (listObjectTime && listObjectTime.includes(name) && value) {
      newObj[name] = moment(value).format('HH:mm:ss')
    }
  }
  return newObj
}

export const SetTimeWithoutTimeZone = (date: any) => {
  const tempTime = date.split(":")
  const dt = new Date()
  dt.setHours(tempTime[0])
  dt.setMinutes(tempTime[1])
  dt.setSeconds(tempTime[2])
  return dt
}

export const msToHMS = (date: any) => {
  return date && date !== null ? moment(date).format('HH:mm:ss') : undefined
}

export const getLocalDate = (value: any) => {
  const date = moment(value).toDate()
  return new Date(date.getTime() + Math.abs(date.getTimezoneOffset() * 60000))
}

export const connectString = (t:any, props:string[]) => {
  if (props.length > 1) {
    const s = props.reduce((a:string, b: string) => `${t(a)} ${t(b)}`)
    return s
  } else {
    return t(props.toString())
  }
}

export const expressionAnd = (dictionaryAnd : any, dictionaryOr: any, listDate: any):  string => { 
  const result: any[] = []
  for (const key in dictionaryAnd) {
    const items = dictionaryAnd[key]
    const conditions = items.map((item: any) => {
      return `${item.key}${item.ope}${listDate.find((d:any) => d === item.key) ? moment(item.value).format('YYYY/MM/DD') : item.value}${item.predicate}`
    })
    
    result.push(conditions)
  }
  return result.length > 0 ?  `${result.join('').replace(',', '')}and${!isObjEmpty(dictionaryOr) ? '$' : ''}` : ''
} 

export const expressionOr = (dictionary : any): string => {
  let  result :  any = ''
  for (const key in dictionary) {
    const items = dictionary[key]
    const conditions = items.map((item: any) => {
      return `${item.key}${item.ope}${item.value}`
    })
    let joinedConditions =  ''
    
    if (result !== '') {
      joinedConditions += `$${conditions.join(';')};or`
    } else {
      joinedConditions += `${conditions.join(';')};or`
    }
    result += joinedConditions
  }
  return result
}