import { Label } from "reactstrap"
import classnames from "classnames"
import { Fragment } from "react"
import { useTranslation } from "react-i18next"
import {
  // Count,
  HtmlEditor,
  Image,
  Inject,
  Link,
  QuickToolbar,
  RichTextEditorComponent, Table,
  Toolbar
} from "@syncfusion/ej2-react-richtexteditor"
import { CDN_URL_VIEW, UPLOADFILE} from "@src/domain/constants"

const toolbarSettings: any = {
  items: [
    'Bold', 'Italic', 'Underline', 'StrikeThrough',
    'FontName', 'FontSize', 'FontColor', 'BackgroundColor',
    'LowerCase', 'UpperCase', '|',
    'Formats', 'Alignments', 'OrderedList', 'UnorderedList',
    'Outdent', 'Indent', '|',
    'CreateLink', 'Image', '|', 'ClearFormat', 'Print',
    'SourceCode', 'FullScreen', '|', 'Undo', 'Redo'
  ],
  type: 'Expand'
}

const  insertImageSettings : any = {
  saveUrl: `${UPLOADFILE.URL_API.EDITOR_UPLOAD_IMAGE}`,
  path: ''
}

interface IFFormInput {
  label?: string,
  labelSize?: string,
  required?: boolean,
  classes?: string,
  height?: number | string,
  disabled?: boolean,
  isLabel?: boolean,
  inLine?: boolean,
  placeholder?: string,
  callback?: any
  disable?: boolean
  showToolbar?: boolean
  styleFormInput?: any,
  value: any,
  onChange?: any
  readonly?: boolean
}

const RickEditor = (props: IFFormInput) => {
  const { t } = useTranslation()
  const  { label, labelSize, height, placeholder, isLabel, inLine, classes, showToolbar, styleFormInput, value, onChange, disabled, readonly  } = props

  const injectServices = showToolbar ? [Toolbar, Image, Link, HtmlEditor, QuickToolbar, Table] : [Image, Link, HtmlEditor, Table]

  const imageUploaded = (args: any) => {
    const jsonUrl = args.e.currentTarget.response
    args.file.name = `${CDN_URL_VIEW}/${JSON.parse(jsonUrl).path}`
    const filename: any = document.querySelectorAll('.e-input.e-img-url')[0]
    filename.innerHTML = args.file.name.replace(document.querySelectorAll(".e-file-type")[0].innerHTML, '')
    filename.value = `${CDN_URL_VIEW}/${JSON.parse(jsonUrl).path}`
  }

  const imageUploading = (args: any) => {
    const xhr = args.currentRequest as XMLHttpRequest
    xhr.withCredentials = true
  }

  const renderLabel = () => {
    return (
      <Fragment>
        {isLabel === false ? '' : <Label className="form-label" for={''}>{t(label ? label : '')} </Label>}
      </Fragment>
    )
  }

  const renderInput = () => {
    return (
      <Fragment>
        <RichTextEditorComponent
          enabled={!disabled}
          readonly={readonly}
          toolbarSettings={toolbarSettings}
          insertImageSettings={insertImageSettings}
          imageUploadSuccess={imageUploaded}
          imageUploading={imageUploading}
          className="form-control"
          height={height}
          // showCharCount={true}
          placeholder={placeholder}
          value={value}
          change={(val: any) => (onChange ? onChange(val.value) : undefined)}
        >
          {/*<Inject services={[Toolbar, Image, Link, HtmlEditor, QuickToolbar, Table]}/>*/}
          <Inject services={injectServices}/>
        </RichTextEditorComponent>
      </Fragment>
    )

  }
  return (
    <Fragment>
      <div
        className={classnames(' align', {
          [labelSize ? labelSize : '']: labelSize,
          [classes ? classes : '']: classes
        }, inLine === false ? 'form-group ' : 'form-row-inline d-flex'
        )}
      >
        {renderLabel()}
        <div className={classnames('form-input-content', { 'hidden-label': isLabel === false })} style={styleFormInput ? styleFormInput : {}}>
          {renderInput()}
        </div>
      </div>
    </Fragment>
  )
}

RickEditor.defaultProps = {
  height: 300,
  isLabel: true,
  disable: false,
  showToolbar: true
}

export default RickEditor
