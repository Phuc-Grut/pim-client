import {AbilityBuilder, Ability} from '@casl/ability'
type ElementType < T extends ReadonlyArray < unknown > > = T extends ReadonlyArray<
    infer ElementType
    >
  ? ElementType
  : never
// const storeResources = (localStorage.getItem('resources'))
// export const allPermission = storeResources ? JSON.parse(storeResources) : []
export const allAction = ['ADD', 'READ', 'EDIT', 'DELETE', 'ACTIVE', 'SEARCH', 'OPEN', 'VIEW', 'DETAIL', 'APPROVE', 'read'] as const
export const allSubjects = [
  "Dashboard",
  "Product",
  "ProductBrand",
  "ProductOrigin",
  "Manufacturer",
  "Store",
  "Warehouse",

  "ServiceAdd",
  "Attibute",
  "SpecificationAttribute",
  "Product attribute",
  "Catalog",
  "InfomationChannel",
  "CategoryProduct",
  "Currency",
  "ExchangeRate",
  "GroupUnitCatalog",
  "Unit",
  "TaxCategory",
  "DeliverTime",
  "ProductTag",

  "User",
  "GroupUser",
  "Permission",
  "DataSettings",
  "Location",
  "GlobalZone",
  "Country",
  "Province",
  "District",
  "Ward",
  "Currency",
  "ExchangeRate",
  "CodeSetting",
  "AppSetting",
  "SmtpServer",
  "EmailTemplate",
  "EmailTransaction",
  "ExportTemplate",
  "System",
  "SystemUser",
  "SystemGroupUser",
  "SystemPermission",
  "SystemPermissionInformaiton",
  "SystemPermissionFunction",
  "SystemPermissionIdentity",
  "ProductTopicPage",
  "ProductTopic",
  "ProductTopicDetail"
] as const

export type IActions = ElementType<typeof allAction>
export type ISubjects = 'Menu' | ElementType<typeof allSubjects>

type UserAction = Record<ElementType<typeof allAction>, ElementType<typeof allAction>>
type UserSubject = Record<ElementType<typeof allSubjects>, ElementType<typeof allSubjects>>

const sub: any = {}
const act: any = {}


allAction?.forEach((element: IActions) => {
  act[element] = element
})

allSubjects?.forEach((element: ISubjects) => {
  sub[element]  = element
})

export const userAction: UserAction = act
export const userSubject: UserSubject = sub

// console.log(userAction)
// console.log(userSubject)


export type IAppAbility = Ability<[IActions, ISubjects]>

const defineAbilitiesFor = () => {
  const {
    can,
    // cannot,
    build
  } = new AbilityBuilder<IAppAbility>(Ability)

  can('read', 'Menu')
  // allPermission.map((item: any) => {
  //   for (const property in item.privileges) {
  //     item.privileges[property] ? can(property, item.code) : cannot(property, item.code)
  //   }
  // })

  return build()
}

export default defineAbilitiesFor
