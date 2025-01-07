import {useTranslation} from "react-i18next"
// import {removeSpace} from "@utils/Utils"
import {Fragment} from "react"

const HeaderGridTemplate = (props: any) => {
  const {t} = useTranslation()
  // const id = removeSpace(props.headerText)
  return (
    <Fragment>
      {t(props.headerText)}
      {/*<span id={id}>{t(props.headerText)}</span>*/}
      {/*<UncontrolledTooltip target={id}>*/}
      {/*  {props.headerDescription ? t(props.headerDescription) : t(props.headerText)}*/}

      {/*</UncontrolledTooltip>*/}

    </Fragment>
  )
}

export default HeaderGridTemplate