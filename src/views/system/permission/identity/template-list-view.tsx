// import { useTranslation } from "react-i18next"

const ListViewTemplate = (data: any) => {
  if (data.dataItem) {
    data = data.dataItem
  }

  return (
    <div className='d-flex list-view-item'>
      <div className="w-100">
        <div className='ms-75 w-100' style={{ fontSize: '15px', fontWeight: '500' }}>
          <span>
            {data.name}
          </span>
        </div>
      </div>
    </div>
  )
}

export default ListViewTemplate