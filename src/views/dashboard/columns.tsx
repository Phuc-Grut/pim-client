import { isNullOrUndefined } from '@src/utility/hooks/isNullOrUndefined'
import { Fragment } from 'react'
import { useTranslation } from 'react-i18next'

const headerTemplate = (props: any) => {
  const { t } = useTranslation()
  return <Fragment>{t(props.headerText)}</Fragment>
}

const imageTemplate = (props: any) => {
  return (
    <img
      width={'35px'}
      src={
        !isNullOrUndefined(props.img) && props.img !== ''
          ? `${props.img}`
          : require('@src/assets/images/avatars/default-pro.jpg').default
      }
    />
  )
}

const nameTemplate = (props: any) => {
  return (
    <div>
      <p className='m-0 fw-bold'>{props.code}</p>
      <p className='m-0' style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>
        {props.name}
      </p>
    </div>
  )
}

export const columnsNewsProduct = [
  {
    isPrimaryKey: true,
    field: 'img',
    headerText: 'Image',
    textAlign: 'center',
    visible: true,
    width: 70,
    customAttributes: { class: 'e-cell-image' },
    template: imageTemplate,
    headerTemplate
  },
  {
    isPrimaryKey: true,
    field: 'code',
    headerText: 'Code/Name',
    visible: true,
    width: 250,
    maxWidth: 350,
    minWidth: 200,
    headerTemplate,
    template: nameTemplate
  },
  {
    isPrimaryKey: true,
    field: 'origin',
    headerText: 'Nguồn gốc',
    visible: true,
    width: 90,
    maxWidth: 90,
    minWidth: 100,
    headerTemplate
  },
  {
    isPrimaryKey: true,
    field: 'price',
    headerText: 'Giá',
    visible: true,
    width: 80,
    maxWidth: 80,
    minWidth: 80,
    headerTemplate
  }
]

export const columnsInventoryProduct = [
  {
    isPrimaryKey: true,
    field: 'img',
    headerText: 'Image',
    textAlign: 'center',
    visible: true,
    width: 70,
    customAttributes: { class: 'e-cell-image' },
    template: imageTemplate,
    headerTemplate
  },
  {
    isPrimaryKey: true,
    field: 'code',
    headerText: 'Code/Name',
    visible: true,
    width: 250,
    maxWidth: 350,
    minWidth: 200,
    headerTemplate,
    template: nameTemplate
  },
  {
    isPrimaryKey: true,
    field: 'origin',
    headerText: 'Nguồn gốc',
    visible: true,
    width: 90,
    maxWidth: 90,
    minWidth: 100,
    headerTemplate
  },
  {
    isPrimaryKey: true,
    field: 'stockQuantity',
    headerText: 'Số lượng',
    visible: true,
    width: 80,
    maxWidth: 80,
    minWidth: 80,
    headerTemplate
  }
]
