export interface IFDataTenantsApi {
  id: string
  code: string
  name: string
  email: string
  phone: string
  taxCode: string
  description: string
  contactName: string
  contactPhone: string
  contactEmail: string
  contactPosition: string
  country: any
  province: string
  district: string
  ward: string
  address: string
  postCode: string
  dataZone: string
};
export type Tenants = {
  id: string
  code: string
  name: string
  email: string
  phone: string
  taxCode: string
  description: string
  contactName: string
  contactPhone: string
  contactEmail: string
  contactPosition: string
  country: string
  province: string
  district: string
  ward: string
  address: string
  postCode: string
  dataZone: string
};

export interface IFGetPagingApiParams {
  $keyword: string,
  $skip: number,
  $top: number
}
export interface TenantsSubmitForm extends Tenants {

}
export interface IPaging {
  items: IFDataTenantsApi[]
  total: number
  count: number
  pageSize: number
  pageIndex: number
  status: boolean
  detailErrors: any
}