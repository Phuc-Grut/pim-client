import {
  DropDownList,
  FilteringEventArgs
} from "@syncfusion/ej2-react-dropdowns"
import { Query, DataManager } from "@syncfusion/ej2-data"
import { useTranslation } from "react-i18next"

interface props {
  data: any[],
  onChange: any,
  onFilter?: any
}
export const dropDownListEdit = ({
  data,
  onChange,
  onFilter
}: props) => {
  const {t} = useTranslation()
  let elem: HTMLElement
  let dropDown: DropDownList
  const _data = data.map((i:any) => ({
    ...i, value: i.value, label: t(i.label)
  }))
  const params = {
    create: () => {
      elem = document.createElement("input")
      return elem
    },
    read: () => {
      if (dropDown !== undefined && dropDown.value !== null) {
        const item = _data.find((x) => x.value === dropDown.value)
        return item?.value
      }
    },
    destroy: () => {
      if (dropDown) {
        dropDown.destroy()
      }
    },
    write: (args: any) => {
      
      const val = args.rowData[args.column.field] ? args.rowData[args.column.field] : ""
      dropDown = new DropDownList({
        value: val,
        actionComplete: () => false,
        allowFiltering: true,
        dataSource: new DataManager(_data),
        fields: { text: "label", value: "value" },
        query: new Query(),
        change: (a: any) => {
          if (onChange !== null) {
            onChange(a)
          }
        },
        filtering: (e: FilteringEventArgs) => {
          e.cancel = true
          let query = new Query()
          query = e.text !== "" ? query.where("label", "contains", e.text, true) : query
          setTimeout(() => {
            if (onFilter) {
              onFilter(e, query)
            }
          }, 500)
        }
      })
      dropDown.appendTo(elem)
    }
  }
  return params
}
