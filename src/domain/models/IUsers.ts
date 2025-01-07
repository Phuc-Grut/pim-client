
export interface IFGetPagingApiParams {
  $inlineCount: string,
  $skip: number,
  $top: number
}


export interface IFDataUserApi {
  loginID: string
  loginName: string | undefined
  fullName: string
  email: string | undefined
  phone: string | undefined
  photo: string | undefined
  status: number | undefined
  sub: string | undefined
  address: string | undefined
  createdBy: string | undefined
  createdDate: string | undefined
  modifiedBy: string | undefined
  modifiedDate: string | undefined
}

export interface IFDeleteApi {
  id: string
}

// ** Begin Demo
export interface IFInvoicesInfo {
  avatar?: string;
  balance?: any;
  client?: IFInvoicesClient;
  dueDate?: string;
  id?: number;
  invoiceStatus?: string;
  issuedDate?: string;
  service?: string;
  total?: number;
}

export interface IFInvoicesClient {
  address?: string;
  company?: string;
  companyEmail?: string;
  contact?: string;
  country?: string;
  name?: string;
}

export interface IFConnectedAccounts {
  checked: boolean;
  title: string;
  subtitle: string;
  logo: string;
}

export interface IFSocialAccounts {
  linked: boolean;
  title: string;
  url?: string;
  logo: string;
}

export interface IFPaymentMethods {
  cardCvc?: string;
  imgAlt?: string;
  badgeColor?: string;
  cardStatus?: string;
  expiryDate?: string;
  name?: string;
  cardNumber?: string;
  imgSrc?: string;
}

export interface IFUserProjectsList {
  progress?: number;
  hours?: string;
  progressColor?: string;
  totalTasks?: string;
  subtitle?: string;
  title?: string;
  img?: string;
}

export interface IFResponseUserApi {
  items: IFDataUserApi[]
  total: number,
  pageSize: number,
  pageIndex: number,
  status: boolean,
  detailErrors: any
}
