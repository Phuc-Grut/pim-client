import { ISelectDefault } from "@src/domain/models"

export const statusObjDefault: any = {
  pending: 'light-warning',
  1: 'light-success',
  0: 'light-secondary'
}

export const deleveryTime = [
  {
    value: '36edb015-de22-417e-a94a-a33438b4048a',
    label: "Availabel and ready to ship"
  },
  {
    value: '377467b9-861f-4385-8feb-f7ee686d9a19',
    label: "2 - 5 workings day"
  },
  {
    value: 'f2893c63-b3b8-4279-bb25-50e76e245b84',
    label: "7 workings day"
  }
]

export const statusObjColorDefault: any = {
  pending: 'light-warning',
  1: 'light-success',
  0: 'light-secondary'
}

export const statusObjDefault_Status: any = {
  null: 'Inactive',
  1: 'Active',
  0: 'Inactive'
}

export const manageInventoryMethod = [
  {
    value: 0,
    label: "Don't track inventory"
  },
  {
    value: 1,
    label: "Track inventory"
  },
  {
    value: 2,
    label: "Track inventory by product attributes"
  },
  {
    value: 3,
    label: "Track inventory by bundle products"
  }
]
export const optionProductType = [
  {
    value: 5,
    label: "Standard"
  },
  {
    value: 10,
    label: "Group item"
  },
  {
    value: 15,
    label: "Bundle products"
  },
  {
    value: 20,
    label: "Virtual product"
  }
]
export const optionStatus = [
  {
    value: 1,
    label: "Active"
  },
  {
    value: 0,
    label: "Inactive"
  }
]
export const optionYesNO = [
  {
    value: 1,
    label: "Yes"
  },
  {
    value: 0,
    label: "No"
  }
]
export const tierPriceMethod = [
  {
    value: 0,
    label: "Fixed price"
  },
  {
    value: 1,
    label: "Adjustfixed reduction"
  },
  {
    value: 2,
    label: "Percentage reduction"
  }
]
export const optionCondition = [
  {
    value: 0,
    label: "New"
  },
  {
    value: 1,
    label: "Refurbished"
  },
  {
    value: 2,
    label: "used"
  },
  {
    value: 3,
    label: "Problem"
  }
]
export const statusDefault: ISelectDefault[] = [
  {
    value: 1,
    label: 'Sử dụng'
  },
  {
    value: 0,
    label: 'Không sử dụng'
  }
]
export const statusSearch: any[] = [
  {
    value: '',
    label: 'Bỏ chọn'
  },
  {
    value: 1,
    label: 'Sử dụng'
  },
  {
    value: 0,
    label: 'Không sử dụng'
  }
]

export const typeContract: ISelectDefault[] = [
  {
    value: 0,
    label: 'Không xác định thời hạn'
  },
  {
    value: 1,
    label: 'Xác định thời hạn'
  },
  {
    value: 2,
    label: 'Hợp đồng thời vụ'
  },
  {
    value: 3,
    label: 'Khác'
  }
]

export const TypeContractSO: ISelectDefault[] = [
  {
    value: 0,
    label: 'Hợp đồng nguyên tắc'
  },
  {
    value: 1,
    label: 'Hợp đồng mua bán'
  }
]

export const TypeContractPO: ISelectDefault[] = [
  {
    value: 0,
    label: 'Hợp đồng nguyên tắc'
  },
  {
    value: 1,
    label: 'Hợp đồng mua bán'
  },
  {
    value: 2,
    label: 'Hợp đồng nhập khẩu'
  }
]

export const TypePurchase: ISelectDefault[] = [
  {
    value: 0,
    label: 'Mua nhập khẩu'
  },
  {
    value: 1,
    label: 'Mua nội địa'
  }
]

export const statusContract: ISelectDefault[] = [
  {
    value: 0,
    label: 'Chưa sử dụng'
  },
  {
    value: 1,
    label: 'Đang sử dụng'
  },
  {
    value: 2,
    label: 'Hết hạn hợp đồng'
  },
  {
    value: 3,
    label: 'Chấm dứt hợp đồng'
  }
]

export const StatusTask: ISelectDefault[] = [
  {
    value: 0,
    label: 'Chưa hoàn thành'
  },
  {
    value: 1,
    label: 'Hoàn thành'
  },
  {
    value: 2,
    label: 'Quá hạn'
  },
  {
    value: 3,
    label: 'Hủy'
  }
]

export const statusCoupon: ISelectDefault[] = [
  {
    value: 0,
    label: 'Chưa kích hoạt'
  },
  {
    value: 1,
    label: 'Đã kích hoạt'
  },
  {
    value: 2,
    label: 'Đã sử dụng'
  },
  {
    value: 3,
    label: 'Đã hết hạn'
  }
]

export const AutoType: ISelectDefault[] = [
  {
    value: 0,
    label: 'Chia đều'
  },
  {
    value: 1,
    label: 'Chia tỷ lệ'
  },
  {
    value: 2,
    label: 'Trắng'
  }
]

export const AssignType: ISelectDefault[] = [
  {
    value: 0,
    label: 'Thủ công'
  },
  {
    value: 1,
    label: 'Tự động'
  }
]

export const DeadlineType: ISelectDefault[] = [
  {
    value: 0,
    label: 'Sau deadline CV trước'
  },
  {
    value: 1,
    label: 'Sau thời gian hoàn thành thực tế CV trước'
  }
]

export const ScoringTypes: ISelectDefault[] = [
  {
    value: 0,
    label: 'Cộng'
  },
  {
    value: 1,
    label: 'Trừ'
  }
]

export const CareType: ISelectDefault[] = [
  {
    value: 0,
    label: 'Gọi điện'
  },
  {
    value: 1,
    label: 'Gửi mail'
  },
  {
    value: 2,
    label: 'Cuộc gặp'
  },
  {
    value: 3,
    label: 'Khác'
  }
]

export const GenderType: ISelectDefault[] = [
  {
    value: 0,
    label: 'Nữ'
  },
  {
    value: 1,
    label: 'Nam'
  },
  {
    value: 2,
    label: 'Khác'
  }
]

export const DayOfWeek: ISelectDefault[] = [
  {
    value: '2',
    label: 'Thứ 2'
  },
  {
    value: '3',
    label: 'Thứ 3'
  },
  {
    value: '4',
    label: 'Thứ 4'
  },
  {
    value: '5',
    label: 'Thứ 5'
  },
  {
    value: '6',
    label: 'Thứ 6'
  },
  {
    value: '7',
    label: 'Thứ 7'
  },
  {
    value: 'cn',
    label: 'Chủ nhật'
  }
]

export const MethodGift: ISelectDefault[] = [
  {
    value: 0,
    label: 'Tặng 1 sản phẩm'
  },
  {
    value: 1,
    label: 'Tặng nhiều sản phẩm'
  }
]

export const DueType: ISelectDefault[] = [
  {
    value: 0,
    label: 'Ngày hết hạn'
  },
  {
    value: 1,
    label: 'Thời hạn'
  }
]

export const DiscountType: ISelectDefault[] = [
  {
    value: 0,
    label: 'Phần trăm'
  },
  {
    value: 1,
    label: 'Giá trị'
  }
]

export const CriteriaAllocated: ISelectDefault[] = [
  {
    value: 0,
    label: 'Theo số lượng'
  },
  {
    value: 1,
    label: 'Theo giá trị'
  }
]

export const FormOptions: ISelectDefault[] = [
  {
    value: 0,
    label: 'Sản xuất'
  },
  {
    value: 1,
    label: 'Thương mại'
  },
  {
    value: 2,
    label: 'Dịch vụ'
  },
  {
    value: 3,
    label: 'Gia công'
  }
]

export const FormPurchase: ISelectDefault[] = [
  {
    value: 0,
    label: 'Thương mại'
  },
  {
    value: 1,
    label: 'Sản xuất'
  },
  {
    value: 2,
    label: 'Gia công'
  },
  {
    value: 3,
    label: 'Dịch vụ'
  },
  {
    value: 4,
    label: 'Tài sản'
  },
  {
    value: 5,
    label: 'Công cụ dụng cụ'
  }
]

export const DeliveryStatus: ISelectDefault[] = [
  {
    value: 0,
    label: 'Chờ xuất kho'
  },
  {
    value: 1,
    label: 'Xuất kho 1 phần'
  },
  {
    value: 2,
    label: 'Đã xuất kho'
  }
]

export const PaymentStatus: ISelectDefault[] = [
  {
    value: 0,
    label: 'Chưa thanh toán'
  },
  {
    value: 1,
    label: 'Thanh toán 1 phần'
  },
  {
    value: 2,
    label: 'Đã thanh toán'
  }
]

export const ReceiptStatus: ISelectDefault[] = [
  {
    value: 0,
    label: 'Chờ nhập kho'
  },
  {
    value: 1,
    label: 'Nhập kho 1 phần'
  },
  {
    value: 2,
    label: 'Đã nhập kho'
  }
]

export const EditRequestType: ISelectDefault[] = [
  {
    value: 0,
    label: 'Đề nghị mua'
  },
  {
    value: 1,
    label: 'Đơn mua hàng'
  }
]

export const statusBoolean: ISelectDefault[] = [
  {
    value: false,
    label: 'Không'
  },
  {
    value: true,
    label: 'Có'
  }
]