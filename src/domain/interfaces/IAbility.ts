import { Ability } from '@casl/ability'
// const resources = (localStorage.getItem('resources'))
const iPerActions = ['ADD', 'READ', 'EDIT', 'DELETE', 'ACTIVE', 'SEARCH', 'OPEN', 'read']

export type IActions = (typeof iPerActions)[number]

export type ISubjects = 'Users' | 'Todo' | 'all' | 'Menu'

export type IFields = 'content' | 'author'

export type IAppAbility = Ability<[IActions, ISubjects]>

export interface IAbility {
  action?: IActions | IActions[];
  subject?: ISubjects | ISubjects[];
  fields?: IFields[];
  conditions?: any;
}

export interface IFUser {
  id?: number;
  name?: string;
  email?: string;
  isAdmin?:boolean;
  ability?: IAbility;
}
