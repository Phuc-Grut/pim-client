
import { Card, CardHeader} from 'reactstrap'
import '@styles/base/pages/dashboard-ecommerce.scss'
// ** Icons Imports
import {ColumnDirective, ColumnsDirective, GridComponent} from "@syncfusion/ej2-react-grids"
import PerfectScrollbar from "react-perfect-scrollbar"

const TableTemplate = (props: any) => {
  // ** vars

  const {data} = props

  return (
    <Card className='card-company-table m-0 h-100 w-100'>
      <CardHeader className='card-item__header p-75'>
        <h4 className='text-center m-0'>{data.title}</h4>
      </CardHeader>
      <PerfectScrollbar
        style={{maxHeight: 'calc(100% -80px)'}}
        className='px-75 mb-50'>
        <GridComponent
          id='tableDashboard'
          dataSource={data.data}
        >
          <ColumnsDirective>
            {data.columns.map((col: any, index: number) => (
              <ColumnDirective
                key={index}
                {...col}
              />
            ))}
          </ColumnsDirective>
        </GridComponent>
      </PerfectScrollbar>

    </Card>
  )
}

export default TableTemplate
