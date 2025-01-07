import { Controller } from "react-hook-form"
import { Label, FormFeedback } from "reactstrap"
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
import {CDN_URL_VIEW, UPLOADFILE} from "@src/domain/constants"
import {getToken} from "@src/infra/api/user"

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
  control: any,
  name: string,
  label: string,
  labelSize?: string,
  required?: boolean,
  errors?: any,
  classes?: string,
  height?: number | string,
  // disabled?: boolean,
  row?: number,
  isLabel?: boolean,
  inLine?: boolean,
  // autoFocus?: boolean,
  // widthInput?: number | string
  // AlignRight?: boolean
  placeholder?: string,
  callback?: any
  disable?: boolean
  showToolbar?: boolean
  editorTab?: boolean
}

const RickEditorInput = (props: IFFormInput) => {
  const { t } = useTranslation()
  const  { control, name, label, labelSize, required, errors, height, placeholder, isLabel, inLine, classes, disable, showToolbar, editorTab  } = props

  const injectServices = showToolbar ? [Toolbar, Image, Link, HtmlEditor, QuickToolbar, Table] : [Image, Link, HtmlEditor, Table]

  const imageUploaded = (args: any) => {
    const jsonUrl = args.e.currentTarget.response
    args.file.name = `${CDN_URL_VIEW}/${JSON.parse(jsonUrl).path}`
    const filename: any = document.querySelectorAll('.e-input.e-img-url')[0]
    filename.innerHTML = args.file.name.replace(document.querySelectorAll(".e-file-type")[0].innerHTML, '')
    filename.value = `${CDN_URL_VIEW}/${JSON.parse(jsonUrl).path}`
  }

  const imageUploading = (args: any) => (
    (args.currentRequest as XMLHttpRequest).setRequestHeader("Authorization",  `Bearer ${getToken()}`)
  )

  const renderLabel = () => {
    return (
      <Fragment>
        {isLabel === false ? '' : <Label className="form-label" for={name}>{t(label ? label : '')} {required ? <span className="text-danger">*</span> : ''} </Label>}
      </Fragment>
    )
  }

  const renderInput = () => {
    return (
      <Fragment>
        <Controller
          name={name}
          control={control}
          render={({ field: { value, onChange} }) => {
            return (
              <RichTextEditorComponent
                enabled={!disable}
                toolbarSettings={toolbarSettings}
                insertImageSettings={insertImageSettings}
                imageUploadSuccess={imageUploaded}
                imageUploading={imageUploading}
                name={name}
                className={`form-control ${editorTab ? 'editor-tab' : '' }`}
                height={height}
                // showCharCount={true}
                placeholder={placeholder}
                value={value}
                change={(val: any) => onChange(val.value)}
              >
                {/*<Inject services={[Toolbar, Image, Link, HtmlEditor, QuickToolbar, Table]}/>*/}
                <Inject services={injectServices}/>
              </RichTextEditorComponent>
            )
          }}
        />
        {errors && <FormFeedback>{errors?.message}</FormFeedback>}
      </Fragment>
    )

  }
  return (
    <Fragment>
      <div
        className={classnames(' align', {
          [labelSize ? labelSize : '']: labelSize,
          [classes ? classes : '']: classes,
          'form-row-inline-error': errors
        }, inLine === false ? 'form-group ' : 'form-row-inline d-flex'
        )}
      >
        {renderLabel()}
        <div className={classnames('form-input-content', { 'hidden-label': isLabel === false })} style={{  }}>
          {renderInput()}
        </div>
      </div>
    </Fragment>
  )
}

RickEditorInput.defaultProps = {
  height: 300,
  isLabel: true,
  disable: false,
  showToolbar: true
}

export default RickEditorInput
