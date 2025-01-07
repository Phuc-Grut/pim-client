// ** Imports createContext function
import { createContext } from 'react'
// ** Imports createContextualCan function
import { createContextualCan } from '@casl/react'

import initAbility from '../../configs/acl/initialAbility'
import {IAppAbility} from "@configs/acl/ability"

export const AbilityContext = createContext<IAppAbility>(initAbility)

// ** Init Can Context
export const CanPer = createContextualCan<IAppAbility>(AbilityContext.Consumer)