// ** Reactstrap Imports
import { Card, CardBody, CardTitle, CardText, Form, Label, Input, Button, FormFeedback } from 'reactstrap'

// ** Styles
import '@styles/react/pages/page-authentication.scss'
import * as yup from 'yup'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { getCookie, setCookie } from '@utils/Utils'
// import config from "@configs/appsettings"
// import {useNavigate} from "react-router-dom"

interface ITenant {
  tenantCode: string
}

const TenantsPage = () => {
  const formSchema = yup.object().shape({
    tenantCode: yup.string().required()
  })

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<ITenant>({
    defaultValues: { tenantCode: '' },
    mode: 'onChange',
    resolver: yupResolver(formSchema)
  })

  const tenantCode = getCookie('tenant')
  console.log(tenantCode)

  const onSubmit = (data: any) => {
    setCookie('tenant', data.tenantCode, 2)
    window.location.href = '/'
  }

  return (
    <div className='auth-wrapper auth-basic px-2'>
      <div className='auth-inner my-2'>
        <Card className='mb-0'>
          <CardBody>
            {/*<Link className='brand-logo' to='/' onClick={e => e.preventDefault()}>*/}
            {/*<h2 className='brand-text text-primary ms-1'>Vuexy</h2>*/}
            {/*</Link>*/}
            <CardTitle tag='h4' className='mb-1'>
              Welcome to 👋
            </CardTitle>
            <CardText className='mb-2'>Please enter your tenant and start the adventure</CardText>
            <Form className='auth-login-form mt-2' onSubmit={handleSubmit(onSubmit)}>
              <div className='mb-1'>
                <Label className='form-label' for='tenant-name'>
                  Tenant
                </Label>
                <Controller
                  name='tenantCode'
                  control={control}
                  render={({ field }) => (
                    <Input
                      placeholder='Enter tenant code'
                      className='new-todo-item-title'
                      invalid={errors.tenantCode && true}
                      {...field}
                    />
                  )}
                />
                {errors.tenantCode && <FormFeedback>{errors.tenantCode?.message}</FormFeedback>}
              </div>

              <Button color='primary' block>
                Submit
              </Button>
            </Form>
          </CardBody>
        </Card>
      </div>
    </div>
  )
}

export default TenantsPage
