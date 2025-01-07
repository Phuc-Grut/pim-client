export const BASE_URL = process.env.REACT_APP_BASE_URL
export const BASE_BFF = process.env.REACT_APP_BASE_BFF
export const BASE_URL_CDN = process.env.REACT_APP_BASE_URL_CDN
export const CDN_URL_VIEW = process.env.REACT_APP_CDN_URL_VIEW
export const REPLACE_STRING_CDN = process.env.REACT_APP_REPLACE_STRING_CDN
export const DEFAULT_AVATAR = process.env.REACT_APP_DEFAULT_AVATAR

export const MODULECODE = {
  PRODUCT: "PROD"
}
export const CODESYNTAX = {
  ACTION_TYPES: {
    GETCODE: 'CODESYNTAX/GETCODE'
  },
  URL_API: {
    GETCODE_API: `${BASE_URL}/api/codesyntax/get-code`
  }
}
export const USER = {
  ACTION_TYPES: {
    GET_DATA: 'USERS/GET_DATA',
    GET_USER_ID: 'USERS/GET_USER_ID',
    ADD_USER: 'USERS/GET_ADD_USER',
    EDIT_USER: 'USERS/GET_EDIT_USER',
    DELETE_USER: 'USERS/GET_DELETE_USER'
  },
  URL_API: {
    GET_DATA_API: `${BASE_URL}/users/paging`,
    GET_USER_ID_API: `${BASE_URL}/users`,
    ADD_USER_API: `${BASE_URL}/users/addUser`,
    EDIT_USER_API: `${BASE_URL}/users/editUser`,
    DELETE_USER_API: `${BASE_URL}/users/deleteUser`
  }
}

export const ROLES = {
  ACTION_TYPES: {
    GET_DATA_ROLE: 'ROLES/GET_DATA',
    ADD_ROLE: 'ROLES/ADD_ROLES',
    EDIT_ROLE: 'ROLES/EDIT_ROLES',
    DELETE_ROLE: 'ROLES/DELETE_ROLES'
  },
  URL_API: {
    GET_DATA_ROLE_API: `${BASE_URL}/roles/paging`,
    ADD_ROLE_API: `${BASE_URL}/roles/addRole`,
    EDIT_ROLE_API: `${BASE_URL}/roles/editRole`,
    DELETE_ROLE_API: `${BASE_URL}/roles/deleteRole`
  }
}
export const UPLOADFILE = {
  ACTION_TYPES: {
    UPLOAD_FILE: 'UPLOADFILE/UPLOAD_FILE',
    UPLOAD_IMAGE: 'UPLOADFILE/UPLOAD_IMAGE',
    UPLOAD_FILE_MULTI: 'UPLOADFILE/UPLOAD_FILE_MULTI',
    UPLOAD_IMAGE_MULTI: 'UPLOADFILE/UPLOAD_IMAGE_MULTI'
  },
  URL_API: {
    UPLOAD_FILE_API: `${BASE_URL}/api/file/upload`,
    UPLOAD_IMAGE_API: `${BASE_URL}/api/image/upload`,
    EDITOR_UPLOAD_IMAGE: `${BASE_URL}/api/image/editor-upload`,
    UPLOAD_FILE_MULTI_API: `${BASE_URL}/api/file/upload-mutil`,
    UPLOAD_IMAGE_MULTI_API: `${BASE_URL}/api/image/upload-mutil`
  }
}

export const COUNTRYS = {
  ACTION_TYPES: {
    GET_PAGING: 'COUNTRY/GET_PAGING',
    GET_BY_ID: 'COUNTRY/GET_BY_ID',
    GET_LIST: 'COUNTRY/GET_LIST',
    ADD: 'COUNTRY/ADD',
    UPDATE: 'COUNTRY/UPDATE',
    DELETE: 'COUNTRY/DELETE'
  },
  URL_API: {
    GET_PAGING_API: `${BASE_URL}/api/country/paging`,
    GET_BY_ID_API: `${BASE_URL}/api/country/getById`,
    GET_LIST_API: `${BASE_URL}/api/country/get-listbox`,
    ADD_API: `${BASE_URL}/api/country/add`,
    UPDATE_API: `${BASE_URL}/api/country/edit`,
    DELETE_API: `${BASE_URL}/api/country/delete`
  }
}

export const DISTRICTS = {
  ACTION_TYPES: {
    GET_PAGING: 'DISTRICT/GET_PAGING',
    GET_BY_ID: 'DISTRICT/GET_BY_ID',
    GET_LIST: 'DISTRICT/GET_LIST',
    ADD: 'DISTRICT/ADD',
    UPDATE: 'DISTRICT/UPDATE',
    DELETE: 'DISTRICT/DELETE'
  },
  URL_API: {
    GET_PAGING_API: `${BASE_URL}/api/district/paging`,
    GET_BY_ID_API: `${BASE_URL}/api/district/getById`,
    GET_LIST_API: `${BASE_URL}/api/district/get-listbox`,
    ADD_API: `${BASE_URL}/api/district/add`,
    UPDATE_API: `${BASE_URL}/api/district/edit`,
    DELETE_API: `${BASE_URL}/api/district/delete`
  }
}


export const STATEPROVINCES = {
  ACTION_TYPES: {
    GET_PAGING: 'STATEPROVINCE/GET_PAGING',
    GET_BY_ID: 'STATEPROVINCE/GET_BY_ID',
    GET_LIST: 'STATEPROVINCE/GET_LIST',
    ADD: 'STATEPROVINCE/ADD',
    UPDATE: 'STATEPROVINCE/UPDATE',
    DELETE: 'STATEPROVINCE/DELETE'
  },
  URL_API: {
    GET_PAGING_API: `${BASE_URL}/api/stateprovince/paging`,
    GET_BY_ID_API: `${BASE_URL}/api/stateprovince/getById`,
    GET_LIST_API: `${BASE_URL}/api/stateprovince/get-listbox`,
    ADD_API: `${BASE_URL}/api/stateprovince/add`,
    UPDATE_API: `${BASE_URL}/api/stateprovince/edit`,
    DELETE_API: `${BASE_URL}/api/stateprovince/delete`
  }
}

export const WARDS = {
  ACTION_TYPES: {
    GET_PAGING: 'WARD/GET_PAGING',
    GET_BY_ID: 'WARD/GET_BY_ID',
    GET_LIST: 'WARD/GET_LIST',
    ADD: 'WARD/ADD',
    UPDATE: 'WARD/UPDATE',
    DELETE: 'WARD/DELETE'
  },
  URL_API: {
    GET_PAGING_API: `${BASE_URL}/api/ward/paging`,
    GET_BY_ID_API: `${BASE_URL}/api/ward/getById`,
    GET_LIST_API: `${BASE_URL}/api/ward/get-listbox`,
    ADD_API: `${BASE_URL}/api/ward/add`,
    UPDATE_API: `${BASE_URL}/api/ward/edit`,
    DELETE_API: `${BASE_URL}/api/ward/delete`
  }
}

export const CATEGORY = {
  ACTION_TYPES: {
    GET_DATA: 'CATEGORY/GET_DATA',
    GET_LISTBOX: 'CATEGORY/GET_LISTBOX',
    GET_CBX: 'CATEGORY/GET_CBX',
    ADD: 'CATEGORY/ADD',
    EDIT: 'CATEGORY/EDIT',
    DELETE: 'CATEGORY/DELETE',
    GET_CATEGORY: "CATEGORY/GET",
    SORT: "CATEGORY/SORT",
    GET_PARENT: "CATEGORY/GET_PARENT"
  },
  URL_API: {
    GET_DATA_API: `${BASE_URL}/api/category/paging`,
    GET_LISTBOX_API: `${BASE_URL}/api/category/get-listbox`,
    GET_CBX_API: `${BASE_URL}/api/category/get-cbx`,
    ADD_API: `${BASE_URL}/api/category/add`,
    EDIT_API: `${BASE_URL}/api/category/edit`,
    DELETE_API: `${BASE_URL}/api/category/delete`,
    GET_CATEGORY_API: `${BASE_URL}/api/category/get`,
    SORT_API: `${BASE_URL}/api/category/sort`,
    GET_PARENT_API: `${BASE_URL}/api/category/getAllParent`
  }
}
export const PRODUCTCATEGORY = {
  ACTION_TYPES: {
    GET_DATA: 'PRODUCTCATEGORY/GET_DATA',
    GET_LISTBOX: 'PRODUCTCATEGORY/GET_LISTBOX',
    GET_LIST_CBX: 'PRODUCTCATEGORY/GET_LIST_CBX',
    ADD: 'PRODUCTCATEGORY/ADD',
    EDIT: 'PRODUCTCATEGORY/EDIT',
    DELETE: 'PRODUCTCATEGORY/DELETE',
    GET_PRODUCTCATEGORY: "PRODUCTCATEGORY/GET",
    SORT: "PRODUCTCATEGORY/SORT",
    GET_PARENT: "PRODUCTCATEGORY/GET_PARENT"
  },
  URL_API: {
    GET_DATA_API: `${BASE_URL}/api/categoryroot/paging`,
    GET_LISTBOX_API: `${BASE_URL}/api/categoryroot/get-listbox`,
    GET_LIST_CBX: `${BASE_URL}/api/categoryroot/get-cbx-by-tree`,
    ADD_API: `${BASE_URL}/api/categoryroot/add`,
    EDIT_API: `${BASE_URL}/api/categoryroot/edit`,
    DELETE_API: `${BASE_URL}/api/categoryroot/delete`,
    GET_PRODUCTCATEGORY_API: `${BASE_URL}/api/categoryroot/get`,
    SORT_API: `${BASE_URL}/api/categoryroot/sort`,
    GET_PARENT_API: `${BASE_URL}/api/categoryroot/getAllParent`
  }
}

export const CURRENCY = {
  ACTION_TYPES: {
    GET_DATA: 'CURRENCY/GET_DATA',
    GET_LIST_CBX: 'CURRENCY/GET_LIST_CBX',
    ADD: 'CURRENCY/ADD',
    EDIT: 'CURRENCY/EDIT',
    DELETE: 'CURRENCY/DELETE'
  },
  URL_API: {
    GET_DATA_API: `${BASE_URL}/api/currency/paging`,
    GET_LIST_CBX_API: `${BASE_URL}/api/currency/get-listbox`,
    ADD_API: `${BASE_URL}/api/currency/add`,
    EDIT_API: `${BASE_URL}/api/currency/edit`,
    DELETE_API: `${BASE_URL}/api/currency/delete`
  }
}

export const EXCHANGERATE = {
  ACTION_TYPES: {
    GET_DATA: 'EXCHANGERATE/GET_DATA',
    GET_LIST_CBX: 'EXCHANGERATE/GET_LIST_CBX',
    ADD: 'EXCHANGERATE/ADD',
    EDIT: 'EXCHANGERATE/EDIT',
    DELETE: 'EXCHANGERATE/DELETE'
  },
  URL_API: {
    GET_DATA_API: `${BASE_URL}/api/exchangerate/paging`,
    GET_LIST_CBX_API: `${BASE_URL}/api/exchangerate/get-listbox`,
    ADD_API: `${BASE_URL}/api/exchangerate/add`,
    EDIT_API: `${BASE_URL}/api/exchangerate/edit`,
    DELETE_API: `${BASE_URL}/api/exchangerate/delete`
  }
}

export const GROUPCATEGORY = {
  ACTION_TYPES: {
    GET_DATA: 'GROUPCATEGORY/GET_DATA',
    GET_LISTBOX: 'GROUPCATEGORY/GET_LISTBOX',
    ADD: 'GROUPCATEGORY/ADD',
    EDIT: 'GROUPCATEGORY/EDIT',
    DELETE: 'GROUPCATEGORY/DELETE',
    EDIT_GROUPCATEGORY_SORT: 'GROUPCATEGORY/EDITSORT',
    GET_ALL_GROUPCATEGORY: "GROUPCATEGORY/GETAll"
  },
  URL_API: {
    GET_DATA_API: `${BASE_URL}/api/groupcategory/paging`,
    GET_ALL_GROUPCATEGORY: `${BASE_URL}/api/groupcategory/get-list`,
    GET_LISTBOX_API: `${BASE_URL}/api/groupcategory/get-listbox`,
    ADD_API: `${BASE_URL}/api/groupcategory/add`,
    EDIT_API: `${BASE_URL}/api/groupcategory/edit`,
    DELETE_API: `${BASE_URL}/api/groupcategory/delete`,
    UPDATE_GROUPCATEGORY_SORT: `${BASE_URL}/api/groupcategory/sort`
  }
}

export const MANUFACTURER = {
  ACTION_TYPES: {
    GET_DATA: 'MANUFACTURER/GET_DATA',
    GET_LISTBOX: 'MANUFACTURER/GET_LISTBOX',
    ADD: 'MANUFACTURER/ADD',
    EDIT: 'MANUFACTURER/EDIT',
    SORT: 'MANUFACTURER/SORT',
    DELETE: 'MANUFACTURER/DELETE'
  },
  URL_API: {
    GET_DATA_API: `${BASE_URL}/api/manufacturer/paging`,
    GET_LISTBOX_API: `${BASE_URL}/api/manufacturer/get-listbox`,
    ADD_API: `${BASE_URL}/api/manufacturer/add`,
    EDIT_API: `${BASE_URL}/api/manufacturer/edit`,
    SORT_API: `${BASE_URL}/api/manufacturer/sort`,
    DELETE_API: `${BASE_URL}/api/manufacturer/delete`
  }
}

export const PRODUCTBRAND = {
  ACTION_TYPES: {
    GET_DATA: 'PRODUCTBRAND/GET_DATA',
    GET_LISTBOX: 'PRODUCTBRAND/GET_LISTBOX',
    ADD: 'PRODUCTBRAND/ADD',
    EDIT: 'PRODUCTBRAND/EDIT',
    SORT: 'PRODUCTBRAND/SORT',
    DELETE: 'PRODUCTBRAND/DELETE'
  },
  URL_API: {
    GET_DATA_API: `${BASE_URL}/api/productbrand/paging`,
    GET_LISTBOX_API: `${BASE_URL}/api/productbrand/get-listbox`,
    ADD_API: `${BASE_URL}/api/productbrand/add`,
    EDIT_API: `${BASE_URL}/api/productbrand/edit`,
    SORT_API: `${BASE_URL}/api/productbrand/sort`,
    DELETE_API: `${BASE_URL}/api/productbrand/delete`
  }
}

export const PRODUCTORIGIN = {
  ACTION_TYPES: {
    GET_DATA: 'PRODUCTORIGIN/GET_DATA',
    GET_LISTBOX: 'PRODUCTORIGIN/GET_LISTBOX',
    ADD: 'PRODUCTORIGIN/ADD',
    EDIT: 'PRODUCTORIGIN/EDIT',
    SORT: 'PRODUCTORIGIN/SORT',
    DELETE: 'PRODUCTORIGIN/DELETE'
  },
  URL_API: {
    GET_DATA_API: `${BASE_URL}/api/productorigin/paging`,
    GET_LISTBOX_API: `${BASE_URL}/api/productorigin/get-listbox`,
    ADD_API: `${BASE_URL}/api/productorigin/add`,
    EDIT_API: `${BASE_URL}/api/productorigin/edit`,
    SORT_API: `${BASE_URL}/api/productorigin/sort`,
    DELETE_API: `${BASE_URL}/api/productorigin/delete`
  }
}
export const PRODUCTTYPE = {
  ACTION_TYPES: {
    GET_DATA: 'PRODUCTTYPE/GET_DATA',
    GET_LISTBOX: 'PRODUCTTYPE/GET_LISTBOX',
    ADD: 'PRODUCTTYPE/ADD',
    EDIT: 'PRODUCTTYPE/EDIT',
    SORT: 'PRODUCTTYPE/SORT',
    DELETE: 'PRODUCTTYPE/DELETE'
  },
  URL_API: {
    GET_DATA_API: `${BASE_URL}/api/producttype/paging`,
    GET_LISTBOX_API: `${BASE_URL}/api/producttype/get-listbox`,
    ADD_API: `${BASE_URL}/api/producttype/add`,
    EDIT_API: `${BASE_URL}/api/producttype/edit`,
    SORT_API: `${BASE_URL}/api/producttype/sort`,
    DELETE_API: `${BASE_URL}/api/producttype/delete`
  }
}
export const WAREHOUSE = {
  ACTION_TYPES: {
    GET_DATA: 'WAREHOUSE/GET_DATA',
    GET_LISTBOX: 'WAREHOUSE/GET_LISTBOX',
    ADD: 'WAREHOUSE/ADD',
    EDIT: 'WAREHOUSE/EDIT',
    SORT: 'WAREHOUSE/SORT',
    DELETE: 'WAREHOUSE/DELETE'
  },
  URL_API: {
    GET_DATA_API: `${BASE_URL}/api/warehouse/paging`,
    GET_LISTBOX_API: `${BASE_URL}/api/warehouse/get-listbox`,
    ADD_API: `${BASE_URL}/api/warehouse/add`,
    EDIT_API: `${BASE_URL}/api/warehouse/edit`,
    SORT_API: `${BASE_URL}/api/warehouse/sort`,
    DELETE_API: `${BASE_URL}/api/warehouse/delete`
  }
}
export const DELIVERYTIME = {
  ACTION_TYPES: {
    GET_DATA: 'DELIVERYTIME/GET_DATA',
    GET_LISTBOX: 'DELIVERYTIME/GET_LISTBOX',
    ADD: 'DELIVERYTIME/ADD',
    EDIT: 'DELIVERYTIME/EDIT',
    SORT: 'DELIVERYTIME/SORT',
    DELETE: 'DELIVERYTIME/DELETE'
  },
  URL_API: {
    GET_DATA_API: `${BASE_URL}/api/deliverytime/paging`,
    GET_LISTBOX_API: `${BASE_URL}/api/deliverytime/get-listbox`,
    ADD_API: `${BASE_URL}/api/deliverytime/add`,
    EDIT_API: `${BASE_URL}/api/deliverytime/edit`,
    SORT_API: `${BASE_URL}/api/deliverytime/sort`,
    DELETE_API: `${BASE_URL}/api/deliverytime/delete`
  }
}
export const GROUPUNIT = {
  ACTION_TYPES: {
    GET_DATA: 'GROUPUNIT/GET_DATA',
    GET_LISTBOX: 'GROUPUNIT/GET_LISTBOX',
    ADD: 'GROUPUNIT/ADD',
    EDIT: 'GROUPUNIT/EDIT',
    SORT: 'GROUPUNIT/SORT',
    DELETE: 'GROUPUNIT/DELETE'
  },
  URL_API: {
    GET_DATA_API: `${BASE_URL}/api/groupunit/paging`,
    GET_LISTBOX_API: `${BASE_URL}/api/groupunit/get-listbox`,
    ADD_API: `${BASE_URL}/api/groupunit/add`,
    EDIT_API: `${BASE_URL}/api/groupunit/edit`,
    SORT_API: `${BASE_URL}/api/groupunit/sort`,
    DELETE_API: `${BASE_URL}/api/groupunit/delete`
  }
}
export const UNIT = {
  ACTION_TYPES: {
    GET_DATA: 'UNIT/GET_DATA',
    GET_LISTBOX: 'UNIT/GET_LISTBOX',
    ADD: 'UNIT/ADD',
    EDIT: 'UNIT/EDIT',
    SORT: 'UNIT/SORT',
    DELETE: 'UNIT/DELETE'
  },
  URL_API: {
    GET_DATA_API: `${BASE_URL}/api/unit/paging`,
    GET_LISTBOX_API: `${BASE_URL}/api/unit/get-listbox`,
    ADD_API: `${BASE_URL}/api/unit/add`,
    EDIT_API: `${BASE_URL}/api/unit/edit`,
    SORT_API: `${BASE_URL}/api/unit/sort`,
    DELETE_API: `${BASE_URL}/api/unit/delete`
  }
}
export const PRODUCTTAG = {
  ACTION_TYPES: {
    GET_DATA: 'PRODUCTTAG/GET_DATA',
    GET_LISTBOX: 'PRODUCTTAG/GET_LISTBOX',
    ADD: 'PRODUCTTAG/ADD',
    EDIT: 'PRODUCTTAG/EDIT',
    DELETE: 'PRODUCTTAG/DELETE'
  },
  URL_API: {
    GET_DATA_API: `${BASE_URL}/api/producttag/paging`,
    GET_LISTBOX_API: `${BASE_URL}/api/producttag/get-listbox`,
    ADD_API: `${BASE_URL}/api/producttag/add`,
    EDIT_API: `${BASE_URL}/api/producttag/edit`,
    DELETE_API: `${BASE_URL}/api/producttag/delete`
  }
}
export const STORE = {
  ACTION_TYPES: {
    GET_DATA: 'STORE/GET_DATA',
    GET_LISTBOX: 'STORE/GET_LISTBOX',
    ADD: 'STORE/ADD',
    EDIT: 'STORE/EDIT',
    SORT: 'STORE/SORT',
    DELETE: 'STORE/DELETE'
  },
  URL_API: {
    GET_DATA_API: `${BASE_URL}/api/store/paging`,
    GET_LISTBOX_API: `${BASE_URL}/api/store/get-listbox`,
    ADD_API: `${BASE_URL}/api/store/add`,
    EDIT_API: `${BASE_URL}/api/store/edit`,
    SORT_API: `${BASE_URL}/api/store/sort`,
    DELETE_API: `${BASE_URL}/api/store/delete`
  }
}
export const TAXCATEGORY = {
  ACTION_TYPES: {
    GET_DATA: 'TAXCATEGORY/GET_DATA',
    GET_LISTBOX: 'TAXCATEGORY/GET_LISTBOX',
    ADD: 'TAXCATEGORY/ADD',
    EDIT: 'TAXCATEGORY/EDIT',
    SORT: 'TAXCATEGORY/SORT',
    DELETE: 'TAXCATEGORY/DELETE'
  },
  URL_API: {
    GET_DATA_API: `${BASE_URL}/api/taxcategory/paging`,
    GET_LISTBOX_API: `${BASE_URL}/api/taxcategory/get-listbox`,
    ADD_API: `${BASE_URL}/api/taxcategory/add`,
    EDIT_API: `${BASE_URL}/api/taxcategory/edit`,
    SORT_API: `${BASE_URL}/api/taxcategory/sort`,
    DELETE_API: `${BASE_URL}/api/taxcategory/delete`
  }
}

export const PRODUCT = {
  ACTION_TYPES: {
    GET_PAGING: 'PRODUCT/GET_DATA_API',
    GET_BY_ID: 'PRODUCT/GET_BY_ID',
    CREATE_ALL_VARIANT: 'PRODUCT/CREATE_ALL_VARIANT',
    GET_LISTBOX_API: 'PRODUCT/GET_LISTBOX_API',
    ADD: 'PRODUCT/ADD',
    ADD_VARIANT: 'PRODUCT/ADD_VARIANT',
    EDIT_API: 'PRODUCT/EDIT_API',
    DELETE: 'PRODUCT/DELETE',
    GET_INVENTORY_BY_LIST_ID: 'PRODUCT/GET_INVENTORY_BY_LIST_ID',
    DUPLICATE: 'PRODUCT/DUPLICATE'

  },
  URL_API: {
    GET_PAGING: `${BASE_URL}/api/product/paging`,
    GET_BY_ID_API: `${BASE_URL}/api/product/get-by-id`,
    CREATE_ALL_VARIANT_API: `${BASE_URL}/api/product/create-all-variant`,
    GET_LISTBOX_API: `${BASE_URL}/api/product/get-listbox`,
    ADD_API: `${BASE_URL}/api/product/add`,
    ADD_VARIANT_API: `${BASE_URL}/api/product/add-variant`,
    EDIT_API: `${BASE_URL}/api/product/edit`,
    DELETE_API: `${BASE_URL}/api/product/delete`,
    GET_INVENTORY_BY_LIST_ID: `${BASE_URL}/api/product/inventory-by-list-id`,
    EDITOR_UPLOAD_IMAGE: `${BASE_URL}/api/image/editor-upload`,
    DUPLICATE_API: `${BASE_URL}/api/product/duplicate`

  }
}

export const PRODUCTATTRIBUTEMAPPING = {
  ACTION_TYPES: {
    GET_PAGING: 'PRODUCTATTRIBUTEMAPPING/GET_DATA_API',
    ADD: 'PRODUCTATTRIBUTEMAPPING/ADD',
    EDIT_API: 'PRODUCTATTRIBUTEMAPPING/EDIT_API',
    DELETE: 'PRODUCTATTRIBUTEMAPPING/DELETE'
  },
  URL_API: {
    GET_PAGING: `${BASE_URL}/api/productattributemapping/paging`,
    ADD_API: `${BASE_URL}/api/productattributemapping/add`,
    EDIT_API: `${BASE_URL}/api/productattributemapping/edit`,
    DELETE_API: `${BASE_URL}/api/productattributemapping/delete`
  }
}
export const PRODUCTSPECIFICATIONATTRIBUTEMAPPING = {
  ACTION_TYPES: {
    GET_PAGING: 'PRODUCTSPECIFICATIONATTRIBUTEMAPPING/GET_DATA_API',
    ADD: 'PRODUCTSPECIFICATIONATTRIBUTEMAPPING/ADD',
    EDIT_API: 'PRODUCTSPECIFICATIONATTRIBUTEMAPPING/EDIT_API',
    DELETE: 'PRODUCTSPECIFICATIONATTRIBUTEMAPPING/DELETE'
  },
  URL_API: {
    GET_PAGING: `${BASE_URL}/api/productspecificationattributemapping/paging`,
    ADD_API: `${BASE_URL}/api/productspecificationattributemapping/add`,
    EDIT_API: `${BASE_URL}/api/productspecificationattributemapping/edit`,
    DELETE_API: `${BASE_URL}/api/productspecificationattributemapping/delete`
  }
}

export const PRODUCTSPECIFICATIONCODE = {
  ACTION_TYPES: {
    GET_PAGING: 'PRODUCTSPECIFICATIONCODE/GET_DATA_API',
    ADD: 'PRODUCTSPECIFICATIONCODE/ADD',
    EDIT_API: 'PRODUCTSPECIFICATIONCODE/EDIT_API',
    DELETE: 'PRODUCTSPECIFICATIONCODE/DELETE'
  },
  URL_API: {
    GET_PAGING: `${BASE_URL}/api/productspecificationcode/paging`,
    ADD_API: `${BASE_URL}/api/productspecificationcode/add`,
    EDIT_API: `${BASE_URL}/api/productspecificationcode/edit`,
    DELETE_API: `${BASE_URL}/api/productspecificationcode/delete`
  }
}

export const PRODUCTVARIANTATTRIBUTECOMBINATION = {
  ACTION_TYPES: {
    GET_PAGING: 'PRODUCTVARIANTATTRIBUTECOMBINATION/GET_DATA_API',
    ADD: 'PRODUCTVARIANTATTRIBUTECOMBINATION/ADD',
    GET_LISTBOX_API: 'PRODUCTVARIANTATTRIBUTECOMBINATION/GET_LISTBOX_API',
    EDIT_API: 'PRODUCTVARIANTATTRIBUTECOMBINATION/EDIT_API',
    DELETE: 'PRODUCTVARIANTATTRIBUTECOMBINATION/DELETE'
  },
  URL_API: {
    GET_PAGING: `${BASE_URL}/api/productvariantattributecombination/paging`,
    ADD_API: `${BASE_URL}/api/productvariantattributecombination/add`,
    GET_LISTBOX_API: `${BASE_URL}/api/productvariantattributecombination/get-listbox`,
    EDIT_API: `${BASE_URL}/api/productvariantattributecombination/edit`,
    DELETE_API: `${BASE_URL}/api/productvariantattributecombination/delete`
  }
}

export const PRODUCTVARIANTATTRIBUTEVALUE = {
  ACTION_TYPES: {
    GET_PAGING: 'PRODUCTVARIANTATTRIBUTEVALUE/GET_DATA_API',
    ADD: 'PRODUCTVARIANTATTRIBUTEVALUE/ADD',
    GET_LISTBOX_API: 'PRODUCTVARIANTATTRIBUTEVALUE/GET_LISTBOX_API',
    EDIT_API: 'PRODUCTVARIANTATTRIBUTEVALUE/EDIT_API',
    DELETE: 'PRODUCTVARIANTATTRIBUTEVALUE/DELETE'
  },
  URL_API: {
    GET_PAGING: `${BASE_URL}/api/productvariantattributevalue/paging`,
    ADD_API: `${BASE_URL}/api/productvariantattributevalue/add`,
    GET_LISTBOX_API: `${BASE_URL}/api/productvariantattributevalue/get-listbox`,
    EDIT_API: `${BASE_URL}/api/productvariantattributevalue/edit`,
    DELETE_API: `${BASE_URL}/api/productvariantattributevalue/delete`
  }
}

export const PRODUCTCATEGORYMAPPING = {
  ACTION_TYPES: {
    GET_PAGING: 'PRODUCTCATEGORYMAPPING/GET_DATA_API',
    ADD: 'PRODUCTCATEGORYMAPPING/ADD',
    EDIT_API: 'PRODUCTCATEGORYMAPPING/EDIT_API',
    DELETE: 'PRODUCTCATEGORYMAPPING/DELETE'
  },
  URL_API: {
    GET_PAGING: `${BASE_URL}/api/productcategorymapping/paging`,
    ADD_API: `${BASE_URL}/api/productcategorymapping/add`,
    EDIT_API: `${BASE_URL}/api/productcategorymapping/edit`,
    DELETE_API: `${BASE_URL}/api/productcategorymapping/delete`
  }
}
export const PRODUCTINVENTORY = {
  ACTION_TYPES: {
    GET_PAGING: 'PRODUCTINVENTORY/GET_DATA_API',
    ADD: 'PRODUCTINVENTORY/ADD',
    ADD_MULTI: 'PRODUCTINVENTORY/ADD_MULTI',
    EDIT_API: 'PRODUCTINVENTORY/EDIT_API',
    DELETE: 'PRODUCTINVENTORY/DELETE'
  },
  URL_API: {
    GET_PAGING: `${BASE_URL}/api/productinventory/paging`,
    ADD_API: `${BASE_URL}/api/productinventory/add`,
    ADD_MULTI_API: `${BASE_URL}/api/productinventory/add-list`,
    EDIT_API: `${BASE_URL}/api/productinventory/edit`,
    DELETE_API: `${BASE_URL}/api/productinventory/delete`
  }
}
export const PRODUCTMANUFACTURERMAPPING = {
  ACTION_TYPES: {
    GET_PAGING: 'PRODUCTMANUFACTURERMAPPING/GET_DATA_API',
    ADD: 'PRODUCTMANUFACTURERMAPPING/ADD',
    EDIT_API: 'PRODUCTMANUFACTURERMAPPING/EDIT_API',
    DELETE: 'PRODUCTMANUFACTURERMAPPING/DELETE'
  },
  URL_API: {
    GET_PAGING: `${BASE_URL}/api/productmanufacturermapping/paging`,
    ADD_API: `${BASE_URL}/api/productmanufacturermapping/add`,
    EDIT_API: `${BASE_URL}/api/productmanufacturermapping/edit`,
    DELETE_API: `${BASE_URL}/api/productmanufacturermapping/delete`
  }
}
export const PRODUCTMEIDA = {
  ACTION_TYPES: {
    GET_PAGING: 'PRODUCTMEIDA/GET_DATA_API',
    ADD: 'PRODUCTMEIDA/ADD',
    ADD_MULTI: 'PRODUCTMEIDA/ADD_MULTI',
    EDIT_API: 'PRODUCTMEIDA/EDIT_API',
    DELETE: 'PRODUCTMEIDA/DELETE'
  },
  URL_API: {
    GET_PAGING: `${BASE_URL}/api/productmedia/paging`,
    ADD_API: `${BASE_URL}/api/productmedia/add`,
    ADD_API_MULTI: `${BASE_URL}/api/productmedia/add-list`,
    EDIT_API: `${BASE_URL}/api/productmedia/edit`,
    DELETE_API: `${BASE_URL}/api/productmedia/delete`
  }
}
export const TIERPRICE = {
  ACTION_TYPES: {
    GET_PAGING: 'TIERPRICE/GET_DATA_API',
    ADD: 'TIERPRICE/ADD',
    EDIT_API: 'TIERPRICE/EDIT_API',
    DELETE: 'TIERPRICE/DELETE'
  },
  URL_API: {
    GET_PAGING: `${BASE_URL}/api/tierprice/paging`,
    ADD_API: `${BASE_URL}/api/tierprice/add`,
    EDIT_API: `${BASE_URL}/api/tierprice/edit`,
    DELETE_API: `${BASE_URL}/api/tierprice/delete`
  }
}
export const PRODUCTSERVICEADD = {
  ACTION_TYPES: {
    GET_PAGING: 'PRODUCTSERVICEADD/GET_DATA_API',
    ADD: 'PRODUCTSERVICEADD/ADD',
    EDIT_API: 'PRODUCTSERVICEADD/EDIT_API',
    DELETE: 'PRODUCTSERVICEADD/DELETE'
  },
  URL_API: {
    GET_PAGING: `${BASE_URL}/api/productserviceadd/paging`,
    ADD_API: `${BASE_URL}/api/productserviceadd/add`,
    EDIT_API: `${BASE_URL}/api/productserviceadd/edit`,
    DELETE_API: `${BASE_URL}/api/productserviceadd/delete`
  }
}
export const PRODUCTPACKAGE = {
  ACTION_TYPES: {
    GET_PAGING: 'PRODUCTPACKAGE/GET_DATA_API',
    ADD: 'PRODUCTPACKAGE/ADD',
    EDIT_API: 'PRODUCTPACKAGE/EDIT_API',
    DELETE: 'PRODUCTPACKAGE/DELETE'
  },
  URL_API: {
    GET_PAGING: `${BASE_URL}/api/productpackage/paging`,
    ADD_API: `${BASE_URL}/api/productpackage/add`,
    EDIT_API: `${BASE_URL}/api/productpackage/edit`,
    DELETE_API: `${BASE_URL}/api/productpackage/delete`
  }
}
export const RELATEDPRODUCT = {
  ACTION_TYPES: {
    GET_PAGING: 'RELATEDPRODUCT/GET_DATA_API',
    ADD: 'RELATEDPRODUCT/ADD',
    EDIT_API: 'RELATEDPRODUCT/EDIT_API',
    DELETE: 'RELATEDPRODUCT/DELETE'
  },
  URL_API: {
    GET_PAGING: `${BASE_URL}/api/relatedproduct/paging`,
    ADD_API: `${BASE_URL}/api/relatedproduct/add`,
    EDIT_API: `${BASE_URL}/api/relatedproduct/edit`,
    DELETE_API: `${BASE_URL}/api/relatedproduct/delete`
  }
}
export const PRODUCTREVIEW = {
  ACTION_TYPES: {
    GET_PAGING: 'PRODUCTREVIEW/GET_DATA_API',
    ADD: 'PRODUCTREVIEW/ADD',
    EDIT_API: 'PRODUCTREVIEW/EDIT_API',
    DELETE: 'PRODUCTREVIEW/DELETE'
  },
  URL_API: {
    GET_PAGING: `${BASE_URL}/api/productreview/paging`,
    ADD_API: `${BASE_URL}/api/productreview/add`,
    EDIT_API: `${BASE_URL}/api/productreview/edit`,
    DELETE_API: `${BASE_URL}/api/productreview/delete`
  }
}
export const PRODUCTREVIEWHELPFULNESS = {
  ACTION_TYPES: {
    GET_PAGING: 'PRODUCTREVIEWHELPFULNESS/GET_DATA_API',
    ADD: 'PRODUCTREVIEWHELPFULNESS/ADD',
    EDIT_API: 'PRODUCTREVIEWHELPFULNESS/EDIT_API',
    DELETE: 'PRODUCTREVIEWHELPFULNESS/DELETE'
  },
  URL_API: {
    GET_PAGING: `${BASE_URL}/api/productreviewhelpfulness/paging`,
    ADD_API: `${BASE_URL}/api/productreviewhelpfulness/add`,
    EDIT_API: `${BASE_URL}/api/productreviewhelpfulness/edit`,
    DELETE_API: `${BASE_URL}/api/productreviewhelpfulness/delete`
  }
}

export const PRODUCTATTRIBUTE = {
  ACTION_TYPES: {
    GET_PAGING: 'PRODUCTATTRIBUTE/GET_DATA_API',
    GET_LISTBOX_API: 'PRODUCTATTRIBUTE/GET_LISTBOX_API',
    GET_BY_ID_API: 'PRODUCTATTRIBUTE/GET_BY_ID_API',
    ADD: 'PRODUCTATTRIBUTE/ADD',
    EDIT_API: 'PRODUCTATTRIBUTE/EDIT_API',
    SORT_API: 'PRODUCTATTRIBUTE/SORT_SORT',
    DELETE: 'PRODUCTATTRIBUTE/DELETE'
  },
  URL_API: {
    GET_PAGING: `${BASE_URL}/api/productattribute/paging`,
    GET_LISTBOX_API: `${BASE_URL}/api/productattribute/get-listbox`,
    GET_BY_ID_API: `${BASE_URL}/api/productattribute/get-by-id`,
    ADD_API: `${BASE_URL}/api/productattribute/add`,
    EDIT_API: `${BASE_URL}/api/productattribute/edit`,
    SORT_API: `${BASE_URL}/api/productattribute/sort`,
    DELETE_API: `${BASE_URL}/api/productattribute/delete`
  }
}
export const PRODUCTATTRIBUTEOPTION = {
  ACTION_TYPES: {
    GET_PAGING: 'PRODUCTATTRIBUTEOPTION/GET_DATA_API',
    GET_LISTBOX_API: 'PRODUCTATTRIBUTEOPTION/GET_LISTBOX_API',
    ADD: 'PRODUCTATTRIBUTEOPTION/ADD',
    EDIT_API: 'PRODUCTATTRIBUTEOPTION/EDIT_API',
    DELETE: 'PRODUCTATTRIBUTEOPTION/DELETE'
  },
  URL_API: {
    GET_PAGING: `${BASE_URL}/api/productattributeoption/paging`,
    GET_LISTBOX_API: `${BASE_URL}/api/productattributeoption/get-listbox`,
    ADD_API: `${BASE_URL}/api/productattributeoption/add`,
    EDIT_API: `${BASE_URL}/api/productattributeoption/edit`,
    DELETE_API: `${BASE_URL}/api/productattributeoption/delete`
  }
}
export const PRODUCTATTRIBUTEOPTIONSET = {
  ACTION_TYPES: {
    GET_PAGING: 'PRODUCTATTRIBUTEOPTIONSET/GET_DATA_API',
    GET_LISTBOX_API: 'PRODUCTATTRIBUTEOPTIONSET/GET_LISTBOX_API',
    ADD: 'PRODUCTATTRIBUTEOPTIONSET/ADD',
    EDIT_API: 'PRODUCTATTRIBUTEOPTIONSET/EDIT_API',
    DELETE: 'PRODUCTATTRIBUTEOPTIONSET/DELETE'
  },
  URL_API: {
    GET_PAGING: `${BASE_URL}/api/productattributeoptionset/paging`,
    GET_LISTBOX_API: `${BASE_URL}/api/productattributeoptionset/get-listbox`,
    ADD_API: `${BASE_URL}/api/productattributeoptionset/add`,
    EDIT_API: `${BASE_URL}/api/productattributeoptionset/edit`,
    DELETE_API: `${BASE_URL}/api/productattributeoptionset/delete`
  }
}
export const SPECIFICATIONATTRIBUTE = {
  ACTION_TYPES: {
    GET_PAGING: 'SPECIFICATIONATTRIBUTE/GET_DATA_API',
    GET_LISTBOX_API: 'SPECIFICATIONATTRIBUTE/GET_LISTBOX_API',
    GET_BY_ID_API: 'SPECIFICATIONATTRIBUTE/GET_BY_ID_API',
    ADD: 'SPECIFICATIONATTRIBUTE/ADD',
    EDIT_API: 'SPECIFICATIONATTRIBUTE/EDIT_API',
    SORT_API: 'SPECIFICATIONATTRIBUTE/SORT_API',
    DELETE: 'SPECIFICATIONATTRIBUTE/DELETE'
  },
  URL_API: {
    GET_PAGING: `${BASE_URL}/api/specificationattribute/paging`,
    GET_LISTBOX_API: `${BASE_URL}/api/specificationattribute/get-listbox`,
    GET_BY_ID_API: `${BASE_URL}/api/specificationattribute/get-by-id`,
    ADD_API: `${BASE_URL}/api/specificationattribute/add`,
    EDIT_API: `${BASE_URL}/api/specificationattribute/edit`,
    SORT_API: `${BASE_URL}/api/specificationattribute/sort`,
    DELETE_API: `${BASE_URL}/api/specificationattribute/delete`
  }
}
export const SPECIFICATIONATTRIBUTEOPTION = {
  ACTION_TYPES: {
    GET_PAGING: 'SPECIFICATIONATTRIBUTEOPTION/GET_DATA_API',
    GET_LIST_API: 'SPECIFICATIONATTRIBUTEOPTION/GET_LIST_API',
    GET_LISTBOX_API: 'SPECIFICATIONATTRIBUTEOPTION/GET_LISTBOX_API',
    ADD: 'SPECIFICATIONATTRIBUTEOPTION/ADD',
    EDIT_API: 'SPECIFICATIONATTRIBUTEOPTION/EDIT_API',
    DELETE: 'SPECIFICATIONATTRIBUTEOPTION/DELETE'
  },
  URL_API: {
    GET_PAGING: `${BASE_URL}/api/specificationattributeoption/paging`,
    GET_LISTBOX_API: `${BASE_URL}/api/specificationattributeoption/get-listbox`,
    GET_LIST_API: `${BASE_URL}/api/specificationattributeoption/get-list`,
    ADD_API: `${BASE_URL}/api/specificationattributeoption/add`,
    EDIT_API: `${BASE_URL}/api/specificationattributeoption/edit`,
    DELETE_API: `${BASE_URL}/api/specificationattributeoption/delete`
  }
}
export const SERVICEADD = {
  ACTION_TYPES: {
    GET_DATA: 'SERVICEADD/GET_DATA',
    GET_LISTBOX: 'SERVICEADD/GET_LISTBOX',
    ADD: 'SERVICEADD/ADD',
    EDIT: 'SERVICEADD/EDIT',
    SORT: 'SERVICEADD/SORT',
    DELETE: 'STSERVICEADDORE/DELETE'
  },
  URL_API: {
    GET_DATA_API: `${BASE_URL}/api/serviceadd/paging`,
    GET_LISTBOX_API: `${BASE_URL}/api/serviceadd/get-listbox`,
    ADD_API: `${BASE_URL}/api/serviceadd/add`,
    EDIT_API: `${BASE_URL}/api/serviceadd/edit`,
    SORT_API: `${BASE_URL}/api/serviceadd/sort`,
    DELETE_API: `${BASE_URL}/api/serviceadd/delete`
  }
}

export const SERVICEADDPRICESYNTAX = {
  ACTION_TYPES: {
    GET_LISTBOX: 'SERVICEADDPRICESYNTAX/GET_LISTBOX'
  },
  URL_API: {
    GET_LISTBOX_API: `${BASE_URL}/api/serviceaddpricesyntax/get-listbox`
  }
}

export const MENU = {
  ACTION_TYPES: {
    GET_DATA_TREE_MENU: 'MENU/GET_TREE_MENU',
    GET_DATA_LIST_MENU: 'MENU/GET_LIST_MENU'
  },
  URL_API: {
    GET_MENU_API: `${BASE_URL}/api/resource/get-listbox`,
    GET_MENU_TREE_API: `${BASE_URL}/api/resource/get-tree-by-product`
  }
}

export const DASHBOARD = {
  ACTION_TYPES: {
    GET_COUNT_PRODUCT: 'DASHBOARD/GET_COUNT_PRODUCT',
    GET_COUNT_PRODUCT_BY_TYPE: 'DASHBOARD/GET_COUNT_PRODUCT_BY_TYPE',
    GET_TOP_CATEGORY: 'DASHBOARD/GET_TOP_CATEGORY',
    GET_TOP_MANUFACTURER: 'DASHBOARD/GET_TOP_MANUFACTURER',
    GET_TOP_PRODUCTS_INVENTORY: 'DASHBOARD/GET_TOP_PRODUCTS_INVENTORY',
    GET_TOP_NEW_PRODUCT: 'DASHBOARD/GET_TOP_NEW_PRODUCT',
    GET_TOP_PRODUCT_BRAND: 'DASHBOARD/GET_TOP_PRODUCT_BRAND'
  },
  URL_API: {
    GET_COUNT_PRODUCT_API: `${BASE_URL}/api/dashboard/count-products`,
    GET_COUNT_PRODUCT_BY_TYPE_API: `${BASE_URL}/api/dashboard/count-products-by-type`,
    GET_TOP_CATEGORY_API: `${BASE_URL}/api/dashboard/get-top-category`,
    GET_TOP_MANUFACTURER_API: `${BASE_URL}/api/dashboard/get-top-manufacture`,
    GET_TOP_PRODUCTS_INVENTORY_API: `${BASE_URL}/api/dashboard/get-top-product-inventory`,
    GET_TOP_NEW_PRODUCT_API: `${BASE_URL}/api/dashboard/get-top-new-product`,
    GET_TOP_PRODUCT_BRAND_API: `${BASE_URL}/api/dashboard/get-top-brand`
  }
}
//Master ---> 
export const TENANTS = {
  ACTION_TYPES: {
    GET_TENANTS: 'TENANTS/GETITEM',
    GET_DATA_LIST_TENANTS: 'TENANTS/GET_LIST_TENANTS',
    ADD_TENANTS: 'TENANTS/ADD',
    EDIT_TENANTS: 'TENANTS/EDIT',
    DELETE_TENANTS: 'TENANTS/DELETE'
  },
  URL_API: {
    GET_TENANTS: `${BASE_URL}/api/tenants/get`,
    GET_PAGING_TENANTS_API: `${BASE_URL}/api/tenants/paging`,
    ADD_TENANTS: `${BASE_URL}/api/tenants/add`,
    UPDATE_TENANTS: `${BASE_URL}/api/tenants/edit`,
    DELETE_TENANTS: `${BASE_URL}/api/tenants/delete`
  }
}

export const GROUP_USER = {
  ACTION_TYPES: {
    GET_PAGING_BY_PRODUCT_CODE: 'GROUP_USER/GET_PAGING_BY_PRODUCT_CODE',
    GET_LIST_BOX_BY_PRODUCT_CODE: 'GROUP_USER/GET_LIST_BOX_BY_PRODUCT_CODE',
    ADD_BY_PRODUCT_CODE: 'GROUP_USER/ADD_USER_GROUP_USER_BY_PRODUCT_CODE',
    GET_PAGING: 'GROUP_USER/GET_PAGING',
    GET_LIST_BOX: 'GROUP_USER/GET_LIST_BOX',
    GET_PAGING_USERS_GROUP_USER: 'GROUP_USER/GET_PAGING_USERS_GROUP_USER',
    ADD: 'GROUP_USER/ADD',
    ADD_USER_GROUP_USER: 'GROUP_USER/ADD_USER_GROUP_USER',
    REMOVE_USER_GROUP_USER: 'GROUP_USER/REMOVE_USER_GROUP_USER',
    GET_PAGING_USERS: 'GROUP_USER/GET_USER_GROUP_USER',
    UPDATE: 'GROUP_USER/UPDATE',
    DELETE: 'GROUP_USER/DELETE'
  },
  URL_API: {
    GET_PAGING_BY_PRODUCT_CODE_API: `${BASE_URL}/api/roles/paging-by-product-code`,
    GET_LISTBOX_BY_PRODUCT_CODE_API: `${BASE_URL}/api/roles/get-listbox-by-product-code`,
    ADD_BY_PRODUCT_CODE_API: `${BASE_URL}/api/roles/add-by-product-code`,
    GET_PAGING_API: `${BASE_URL}/api/roles/paging`,
    GET_LISTBOX_API: `${BASE_URL}/api/roles/get-listbox`,
    GET_PAGING_USERS_GROUP_USER_API: `${BASE_URL}/api/roles/paging-users-role`,
    ADD_API: `${BASE_URL}/api/roles/add`,
    ADD_USERS_GROUP_USER_API: `${BASE_URL}/api/roles/add-users-role`,
    REMOVE_USER_GROUP_USER_API: `${BASE_URL}/api/roles/remove-user-role`,
    GET_PAGING_USERS_API: `${BASE_URL}/api/roles/paging-users-add`,
    UPDATE_API: `${BASE_URL}/api/roles/edit`,
    DELETE_API: `${BASE_URL}/api/roles/delete`
  }
}

export const PERMISSION = {
  ACTION_TYPES: {
    GET_PERMISSION_GROUP_USER_BY_PRODUCT: 'PERMISSION/GET_PERMISSION_GROUP_USER_BY_PRODUCT',
    GET_PERMISSION_USER_BY_PRODUCT: 'PERMISSION/GET_PERMISSION_USER_BY_PRODUCT',
    GET_TREE_PERMISSION: 'PERMISSION/GET_TREE_PERMISSION',
    GET_TREE_RESOURCE_PERMISSION: 'PERMISSION/GET_TREE_RESOURCE_PERMISSION',
    GET_PERMISSION_GROUP_USER: 'PERMISSION/GET_PERMISSION_GROUP_USER',
    GET_PAGING_GROUP_USERS_FOR_ADD: 'PERMISSION/GET_PAGING_GROUP_USERS_FOR_ADD',
    GET_PAGING_GROUP_USERS_FOR_ADD_BY_PRODUCT: 'PERMISSION/GET_PAGING_GROUP_USERS_FOR_ADD_BY_PRODUCT',
    GET_PAGING_USERS_FOR_ADD: 'PERMISSION/GET_PAGING_USERS_FOR_ADD',
    GET_PAGING_USERS_FOR_ADD_BY_PRODUCT: 'PERMISSION/GET_PAGING_USERS_FOR_ADD_BY_PRODUCT',
    GET_PERMISSION_FUNCTION: 'PERMISSION/GET_PERMISSION_FUNCTION',
    GET_PERMISSION_USER: 'PERMISSION/GET_PERMISSION_USER',
    ADD_PERMISSION_GROUP_USER: 'PERMISSION/ADD_PERMISSION_GROUP_USER',
    DELETE_PERMISSION_GROUP_USER: 'PERMISSION/DELETE_PERMISSION_GROUP_USER',
    ADD_PERMISSION_USER: 'PERMISSION/ADD_PERMISSION_USER',
    DELETE_PERMISSION_USER: 'PERMISSION/DELETE_PERMISSION_USER'
  },
  URL_API: {
    GET_PERMISSION_GROUP_USER_BY_PRODUCT_API: `${BASE_URL}/api/privileges/get-permission-role-by-product-code`,
    GET_PERMISSION_USER_BY_PRODUCT_API: `${BASE_URL}/api/privileges/get-permission-user-by-product-code`,
    GET_TREE_PERMISSION_API: `${BASE_URL}/api/resource/get-tree-permission`,
    GET_TREE_RESOURCE_PERMISSION_API: `${BASE_URL}/api/privileges/get-tree-permission-info`,
    GET_PERMISSION_GROUP_USER_API: `${BASE_URL}/api/privileges/get-permission-role`,
    GET_PAGING_GROUP_USERS_FOR_ADD_API: `${BASE_URL}/api/privileges/get-roles-for-add`,
    GET_PAGING_GROUP_USERS_FOR_ADD_BY_PRODUCT_API: `${BASE_URL}/api/privileges/get-roles-for-add-by-product`,
    GET_PAGING_USERS_FOR_ADD_API: `${BASE_URL}/api/privileges/get-users-for-add`,
    GET_PAGING_USERS_FOR_ADD_BY_PRODUCT_API: `${BASE_URL}/api/privileges/get-users-for-add-by-product`,
    GET_PERMISSION_FUNCTION_API: `${BASE_URL}/api/privileges/get-permission-function`,
    GET_PERMISSION_USER_API: `${BASE_URL}/api/privileges/get-permission-user`,
    ADD_PERMISSION_GROUP_USER_API: `${BASE_URL}/api/privileges/add-permission-role`,
    DELETE_PERMISSION_GROUP_USER_API: `${BASE_URL}/api/privileges/delete-permission-role`,
    ADD_PERMISSION_USER_API: `${BASE_URL}/api/privileges/add-permission-user`,
    DELETE_PERMISSION_USER_API: `${BASE_URL}/api/privileges/delete-permission-user`
  }
}

export const SYSTEM_USER = {
  ACTION_TYPES: {
    GET_PAGING_BY_PRODUCT_ID: 'SYSTEM_USER/GET_PAGING_BY_PRODUCT_ID',
    GET_USERS_BY_PRODUCT_ID: 'SYSTEM_USER/GET_USERS_BY_PRODUCT_ID',
    ADD_BY_PRODUCT_ID: 'SYSTEM_USER/ADD_BY_PRODUCT_ID',
    GET_PAGING: 'SYSTEM_USER/GET_PAGING',
    GET_USERS: 'SYSTEM_USER/GET_USERS',
    ADD: 'SYSTEM_USER/ADD',
    UPDATE: 'SYSTEM_USER/UPDATE',
    DELETE: 'SYSTEM_USER/DELETE'
  },
  URL_API: {
    GET_PAGING_BY_PRODUCT_ID: `${BASE_URL}/api/productuser/paging-by-product-id`,
    GET_USERS_BY_PRODUCT_ID: `${BASE_URL}/api/productuser/get-users-add-by-product-id`,
    ADD_BY_PRODUCT_ID: `${BASE_URL}/api/productuser/add-by-product-id`,
    GET_PAGING_API: `${BASE_URL}/api/productuser/paging`,
    GET_USERS_API: `${BASE_URL}/api/productuser/get-users-add`,
    ADD_API: `${BASE_URL}/api/productuser/add`,
    UPDATE_API: `${BASE_URL}/api/productuser/edit`,
    DELETE_API: `${BASE_URL}/api/productuser/delete`
  }
}

export const PRODUCTTOPICPAGE = {
  ACTION_TYPES: {
    GET_DATA: 'PRODUCTTOPICPAGE/GET_DATA',
    GET_LIST_BOX: 'PRODUCTTOPICPAGE/GET_LIST_BOX',
    GET_BY_ID: 'PRODUCTTOPICPAGE/GET_BY_ID',
    ADD: 'PRODUCTTOPICPAGE/ADD',
    UPDATE: 'PRODUCTTOPICPAGE/UPDATE',
    SORT: 'PRODUCTTOPICPAGE/SORT',
    DELETE: 'PRODUCTTOPICPAGE/DELETE'
  },
  URL_API: {
    GET_DATA_API: `${BASE_URL}/api/producttopicpage/paging`,
    GET_LIST_BOX_API: `${BASE_URL}/api/producttopicpage/get-listbox`,
    GET_BY_ID_API: `${BASE_URL}/api/producttopicpage/get`,
    ADD_API: `${BASE_URL}/api/producttopicpage/add`,
    UPDATE_API: `${BASE_URL}/api/producttopicpage/edit`,
    SORT_API: `${BASE_URL}/api/producttopicpage/sort`,
    DELETE_API: `${BASE_URL}/api/producttopicpage/delete`
  }
}

export const PRODUCTTOPIC = {
  ACTION_TYPES: {
    GET_DATA: 'PRODUCTTOPIC/GET_DATA',
    GET_LIST_BOX: 'PRODUCTTOPIC/GET_LIST_BOX',
    GET_BY_ID: 'PRODUCTTOPIC/GET_BY_ID',
    ADD: 'PRODUCTTOPIC/ADD',
    UPDATE: 'PRODUCTTOPIC/UPDATE',
    SORT: 'PRODUCTTOPIC/SORT',
    DELETE: 'PRODUCTTOPIC/DELETE'
  },
  URL_API: {
    GET_DATA_API: `${BASE_URL}/api/producttopic/paging`,
    GET_LIST_BOX_API: `${BASE_URL}/api/producttopic/get-listbox`,
    GET_BY_ID_API: `${BASE_URL}/api/producttopic/get`,
    ADD_API: `${BASE_URL}/api/producttopic/add`,
    UPDATE_API: `${BASE_URL}/api/producttopic/edit`,
    SORT_API: `${BASE_URL}/api/producttopic/sort`,
    DELETE_API: `${BASE_URL}/api/producttopic/delete`
  }
}

export const PRODUCTTOPICQUERY = {
  ACTION_TYPES: {
    GET_DATA: 'PRODUCTTOPICQUERY/GET_DATA',
    GET_LIST_BOX: 'PRODUCTTOPICQUERY/GET_LIST_BOX',
    GET_BY_ID: 'PRODUCTTOPICQUERY/GET_BY_ID',
    ADD: 'PRODUCTTOPICQUERY/ADD',
    UPDATE: 'PRODUCTTOPICQUERY/UPDATE',
    SORT: 'PRODUCTTOPICQUERY/SORT',
    DELETE: 'PRODUCTTOPICQUERY/DELETE'
  },
  URL_API: {
    GET_DATA_API: `${BASE_URL}/api/producttopicquery/paging`,
    GET_LIST_BOX_API: `${BASE_URL}/api/producttopicquery/get-listbox`,
    GET_BY_ID_API: `${BASE_URL}/api/producttopicquery/get`,
    ADD_API: `${BASE_URL}/api/producttopicquery/add`,
    UPDATE_API: `${BASE_URL}/api/producttopicquery/edit`,
    SORT_API: `${BASE_URL}/api/producttopicquery/sort`,
    DELETE_API: `${BASE_URL}/api/producttopicquery/delete`
  }
}
export const CONFIG = {
  ACTION_TYPES: {
    GET_PAGING: 'CONFIG/GET_PAGING',
    GET_BY_CODE: 'CONFIG/GET_BY_CODE'
  },
  URL_API: {
    GET_BY_CODE_API: `${BASE_URL}/api/config/get-by-code-config`
  }
}
export const COMMON = {
  ACTION_TYPES: {
    GET_USER_INFO: 'COMMON/GET_USER_INFO'
  },
  URL_API: {
    GET_USER_INFO: `${BASE_BFF}/account/userinfo`
  }
}
