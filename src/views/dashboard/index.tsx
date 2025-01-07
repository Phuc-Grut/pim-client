// ** React Imports
import { useEffect, useState } from 'react'
import { DashboardLayoutComponent, PanelsDirective, PanelDirective } from "@syncfusion/ej2-react-layouts"
import * as Chart from '../charts'
import { columnsInventoryProduct, columnsNewsProduct } from "@src/views/dashboard/columns"
import { useDashboard } from './hook'
import { replaceNumberNullOrUndefined } from '@src/utility/hooks/replaceNumberNullOrUndefined'
import { useTranslation } from 'react-i18next'


const Dashboard = () => {
  const {t} = useTranslation()
  let dashboardObj: any

  const optionTotal = {
    sizeX: 4,
    sizeY: 2,
    minSizeX: 4,
    minSizeY: 2,
    row: 0,
    col: 0,
    type: 'CardTemplate',
    title: t('TotalProduct'),
    value: 0,
    background: ['#7367f0', 'rgba(115, 103, 240, 0.7)']
  }

  const optionSale = {
    sizeX: 4,
    sizeY: 2,
    minSizeX: 4,
    minSizeY: 2,
    row: 0,
    col: 4,
    type: 'CardTemplate',
    title: t('Sale'),
    value: 0,
    background: ['#F7789D', '#FDA582']
  }

  const optionBuy = {
    sizeX: 4,
    sizeY: 2,
    minSizeX: 4,
    minSizeY: 2,
    row: 2,
    col: 0,
    type: 'CardTemplate',
    title: t('Buy'),
    value: 0,
    background: ['#C17EFE', '#F09EF6']
  }

  const optionManufacture = {
    sizeX: 4,
    sizeY: 2,
    minSizeX: 4,
    minSizeY: 2,
    row: 2,
    col: 4,
    type: 'CardTemplate',
    title: t('Production'),
    value: '',
    background: ['#F09EF6', '#FDA582']
  }

  const optionCountProductByType = {
    sizeX: 16,
    sizeY: 4,
    minSizeX: 16,
    minSizeY: 4,
    row: 0,
    col: 8,
    type: 'ColumnTemplate',
    title: t('Thống kê theo loại sản phẩm'),
    data: []
  }

  const optionTopCategory = {
    sizeX: 8,
    sizeY: 4,
    minSizeX: 8,
    minSizeY: 4,
    row: 4,
    col: 0,
    type: 'CardListTemplate',
    title: t('TopCategory'),
    data: []
  }

  const optionTopBrand = {
    sizeX: 8,
    sizeY: 4,
    minSizeX: 8,
    minSizeY: 4,
    row: 4,
    col: 8,
    type: 'CardListTemplate',
    title: t('TopBrand'),
    data: []
  }

  const optionTopManufacture = {
    sizeX: 8,
    sizeY: 4,
    minSizeX: 8,
    minSizeY: 4,
    row: 4,
    col: 16,
    type: 'CardListTemplate',
    title: t('TopManufacturer'),
    data: []
  }

  const optionTop10New = {
    sizeX: 12,
    sizeY: 9,
    minSizeX: 12,
    minSizeY: 6,
    row: 8,
    col: 0,
    type: 'TableTemplate',
    title: t('Top10NewProduct'),
    columns: columnsNewsProduct,
    data: []
  }

  const optionTop10Inventory = {
    sizeX: 12,
    sizeY: 9,
    minSizeX: 12,
    minSizeY: 9,
    row: 8,
    col: 12,
    type: 'TableTemplate',
    title: t('Top10ProductInventory'),
    columns: columnsInventoryProduct,
    data: []
  }

  const { getCountProduct, getCountProductByType, getTopProductInventory, getTopBrand, getTopCategory, getTopManufacturer, getTopNewProduct } = useDashboard()
  const [total, setTotal] = useState<any>(optionTotal)
  const [sale, setSale] = useState<any>(optionSale)
  const [buy, setBuy] = useState<any>(optionBuy)
  const [manufacture, setManufacture] = useState<any>(optionManufacture)

  const [dataCountProductByType, setDataCountProductByType] = useState<any>(optionCountProductByType)

  const [dataTopCategory, setDataTopCategory] = useState<any>(optionTopCategory)
  const [dataTopBrand, setDataTopBrand] = useState<any>(optionTopBrand)
  const [dataTopMF, setDataTopMF] = useState<any>(optionTopManufacture)

  const [dataTopNewPrd, setDataTopNewPrd] = useState<any>(optionTop10New)
  const [dataTopPrdInventory, setDataTopPrdInventory] = useState<any>(optionTop10Inventory)

  useEffect(() => {
    getCountProduct().unwrap()
      .then((result: any[]) => {
        if (result && result?.length > 0) {
          const rs = result[0]
          setTimeout(() => {
            setTotal((prevState: any) => ({...prevState, value:rs?.total }))
            setSale((prevState: any) => ({...prevState, value:rs?.forSale }))
            setBuy((prevState: any) => ({...prevState, value:rs?.forBuy }))
            setManufacture((prevState: any) => ({...prevState, value:rs?.forProduction }))

          }, 100)

        }
      })

    getCountProductByType().unwrap()
      .then((rs: any[]) => {
        if (rs && rs?.length > 0) {
          setTimeout(() => {
            setDataCountProductByType((prevState: any) => ({
              ...prevState,
              data: rs.map((a: any) => ({  x: a?.productType, y: replaceNumberNullOrUndefined(a?.totalCountByType) }))
            }))
          }, 100)
        }
      })

    // top danh mục
    getTopCategory().unwrap()
      .then((rs: any[]) => {
        if (rs && rs?.length > 0) {
          setTimeout(() => {
            setDataTopCategory((prevState: any) => (
              {
                ...prevState,
                data: rs?.map((a: any) => ({
                  img: a?.image,
                  title: a.name,
                  value: a.productCount
                }))
              }
            ))
          }, 100)
        }
      })

    // top thương hiệu
    getTopBrand().unwrap()
      .then((rs: any[]) => {
        if (rs && rs?.length > 0) {
          setTimeout(() => {
            setDataTopBrand((prevState: any) => (
              {
                ...prevState,
                data: rs?.map((a: any) => ({
                  img: a?.image,
                  title: a.name,
                  value: a.topBrand
                }))
              }
            ))

          }, 100)
        }
      })

    // top nhà sản xuất
    getTopManufacturer().unwrap()
      .then((rs: any[]) => {
        if (rs && rs?.length > 0) {
          setTimeout(() => {
            setDataTopMF((prevState: any) => (
              {
                ...prevState,
                data: rs?.map((a: any) => ({
                  img: a?.image,
                  title: a.name,
                  value: a.topBrand
                }))
              }
            ))
          }, 100)
        }
      })

    // 10 sản phẩm mới
    getTopNewProduct().unwrap()
      .then((rs: any[]) => {
        if (rs && rs?.length > 0) {
          setTimeout(() => {
            setDataTopNewPrd((prev: any) => (
              {
                ...prev,
                data: rs
              }
            ))
          }, 100)
        }
      })

    // sản phẩm tồn kho
    getTopProductInventory().unwrap()
      .then((rs: any[]) => {
        if (rs && rs?.length > 0) {
          setTimeout(() => {
            setDataTopPrdInventory((prev: any) => (
              {
                ...prev,
                data: rs
              }
            ))
          }, 100)
        }
      })

  }, [])

  const getWindowSize = () => {
    const { innerWidth, innerHeight } = window
    return { innerWidth, innerHeight }
  }

  const [windowSize, setWindowSize] = useState(getWindowSize())
  const columns = 24
  const [cellAspectRatio, setCellAspectRatio] = useState(1.3)
  const [cellSpacing] = useState([10, 10])
  const mediaQuery = 'max-width: 800px'


  useEffect(() => {
    const handleWindowResize = () => {
      setWindowSize(getWindowSize())
    }
    window.addEventListener('resize', handleWindowResize)
    return () => {
      window.removeEventListener('resize', handleWindowResize)
    }
  }, [])

  useEffect(() => {
    setCellAspectRatio(1.3)
    dashboardObj.refresh()
    if (windowSize.innerWidth > 1920) {
      setCellAspectRatio(1.3)
      dashboardObj.refresh()
    }
    if (windowSize.innerWidth < 1920) {
      setCellAspectRatio(1.2)
      dashboardObj.refresh()
    }
    if (windowSize.innerWidth < 1820) {
      setCellAspectRatio(1.1)
      dashboardObj.refresh()
    }
    if (windowSize.innerWidth < 1660) {
      setCellAspectRatio(1)
      dashboardObj.refresh()
    }
    if (windowSize.innerWidth < 1480) {
      setCellAspectRatio(0.8)
      dashboardObj.refresh()
    }
    if (windowSize.innerWidth < 1366) {
      setCellAspectRatio(0.7)
      dashboardObj.refresh()
    }
    if (windowSize.innerWidth < 1250) {
      setCellAspectRatio(0.7)
      dashboardObj.refresh()
    }
    if (windowSize.innerWidth < 769) {
      setCellAspectRatio(0.7)
      dashboardObj.refresh()
    } else {
      // setCellAspectRatio(1.3)
      // setColumns(12)
      // dashboardObj.refresh()
    }
    dashboardObj.refresh()
  }, [windowSize])


  const renderContent = (value: any) => {
    // @ts-ignore
    const TagChart = Chart[value.type]
    return (
      <TagChart data={value} />
    )
  }
  const onPanelResize = (args: any) => {
    if (args.element && args.element.querySelector('.e-panel-container .e-panel-content div div')) {
      try {
        const chartObj = args.element.querySelector('.e-panel-container .e-panel-content div div').ej2_instances[0]
        if (chartObj !== undefined) {
          chartObj.refresh()
          return
        }
      } catch (e) {
        console.log(e)
      }
    }
    if (args.element && args.element.querySelector('.e-panel-container .e-panel-content .template div')) {
      try {
        const cardDiv = args.element.querySelector('.e-panel-container .e-panel-content .template div').ej2_instances[0]
        if (cardDiv !== undefined) {
          cardDiv.refresh()
        }
      } catch (e) {
        console.log(e)
      }
    }
  }


  return (
    <div className='pb-50'>
      <DashboardLayoutComponent
        ref={s => (dashboardObj = s)}
        id='Dashboard'
        cellSpacing={cellSpacing}
        columns={columns}
        cellAspectRatio={cellAspectRatio}
        allowFloating={false}
        mediaQuery={mediaQuery}
        allowResizing={false}
        resizeStop={e => onPanelResize(e)}
        allowDragging={false}
        enablePersistence={false}
      >
        <PanelsDirective>

          <PanelDirective
            row={total?.row}
            col={total?.col}
            sizeX={total?.sizeX}
            sizeY={total?.sizeY}
            minSizeX={total?.minSizeX}
            minSizeY={total?.minSizeY}
            content={() => renderContent(total)}>
          </PanelDirective>

          <PanelDirective
            row={sale?.row}
            col={sale?.col}
            sizeX={sale?.sizeX}
            sizeY={sale?.sizeY}
            minSizeX={sale?.minSizeX}
            minSizeY={sale?.minSizeY}
            content={() => renderContent(sale)}>
          </PanelDirective>

          <PanelDirective
            row={buy?.row}
            col={buy?.col}
            sizeX={buy?.sizeX}
            sizeY={buy?.sizeY}
            minSizeX={buy?.minSizeX}
            minSizeY={buy?.minSizeY}
            content={() => renderContent(buy)}>
          </PanelDirective>

          <PanelDirective
            row={manufacture?.row}
            col={manufacture?.col}
            sizeX={manufacture?.sizeX}
            sizeY={manufacture?.sizeY}
            minSizeX={manufacture?.minSizeX}
            minSizeY={manufacture?.minSizeY}
            content={() => renderContent(manufacture)}>
          </PanelDirective>


          <PanelDirective
            row={dataCountProductByType?.row}
            col={dataCountProductByType?.col}
            sizeX={dataCountProductByType?.sizeX}
            sizeY={dataCountProductByType?.sizeY}
            minSizeX={dataCountProductByType?.minSizeX}
            minSizeY={dataCountProductByType?.minSizeY}
            content={() => renderContent(dataCountProductByType)}>

          </PanelDirective>

          <PanelDirective
            row={dataTopCategory?.row}
            col={dataTopCategory?.col}
            sizeX={dataTopCategory?.sizeX}
            sizeY={dataTopCategory?.sizeY}
            minSizeX={dataTopCategory?.minSizeX}
            minSizeY={dataTopCategory?.minSizeY}
            content={() => renderContent(dataTopCategory)}>
          </PanelDirective>

          <PanelDirective
            row={dataTopBrand?.row}
            col={dataTopBrand?.col}
            sizeX={dataTopBrand?.sizeX}
            sizeY={dataTopBrand?.sizeY}
            minSizeX={dataTopBrand?.minSizeX}
            minSizeY={dataTopBrand?.minSizeY}
            content={() => renderContent(dataTopBrand)}>
          </PanelDirective>

          <PanelDirective
            row={dataTopMF?.row}
            col={dataTopMF?.col}
            sizeX={dataTopMF?.sizeX}
            sizeY={dataTopMF?.sizeY}
            minSizeX={dataTopMF?.minSizeX}
            minSizeY={dataTopMF?.minSizeY}
            content={() => renderContent(dataTopMF)}>
          </PanelDirective>

          <PanelDirective
            row={dataTopNewPrd?.row}
            col={dataTopNewPrd?.col}
            sizeX={dataTopNewPrd?.sizeX}
            sizeY={dataTopNewPrd?.sizeY}
            minSizeX={dataTopNewPrd?.minSizeX}
            minSizeY={dataTopNewPrd?.minSizeY}
            content={() => renderContent(dataTopNewPrd)}>
          </PanelDirective>

          <PanelDirective
            row={dataTopPrdInventory?.row}
            col={dataTopPrdInventory?.col}
            sizeX={dataTopPrdInventory?.sizeX}
            sizeY={dataTopPrdInventory?.sizeY}
            minSizeX={dataTopPrdInventory?.minSizeX}
            minSizeY={dataTopPrdInventory?.minSizeY}
            content={() => renderContent(dataTopPrdInventory)}>
          </PanelDirective>
        </PanelsDirective>
      </DashboardLayoutComponent>
    </div>
  )
}

export default Dashboard
