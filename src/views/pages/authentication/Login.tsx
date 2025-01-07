// ** React Imports
import { useEffect } from 'react'
// import { Link } from 'react-router-dom'
import { Controller, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

// ** Reactstrap Imports
import { Card, CardBody, CardTitle, CardText, Form, Label, Input, Button, FormFeedback } from 'reactstrap'
// ** Styles
import '@styles/react/pages/page-authentication.scss'
import { getCookie, setCookie } from '@utils/Utils'
import { useAppContext } from '@src/contexts/AppContext'

// import { useNavigate } from 'react-router-dom'
const loginUrl = process.env.REACT_APP_LOGIN_URL

interface ITenant {
  tenantCode: string
}
const Login = () => {
  const { state } = useAppContext()
  const { isAuthenticated } = state
  // const navigate = useNavigate()
  useEffect(() => {
    const url = window.location
    const queryString = url.search
    const urlParams = new URLSearchParams(queryString)
    const prevPath = urlParams.get('redirect')
    const tenant = urlParams.get('tenant')

    if (prevPath) {
      window.localStorage.setItem('redirect', prevPath)
    }
    let savedTenant = tenant
    if (!savedTenant || savedTenant === 'null') {
      savedTenant = getCookie('tenant')
    }

    const domain = `${window.location.protocol}//${window.location.host}`

    if (!isAuthenticated && savedTenant) {
      if (prevPath) {
        window.location.href = `${loginUrl?.replace('{tenant}', savedTenant)!}?returnUrl=${domain + prevPath}`
        return
      } else {
        window.location.href = `${loginUrl?.replace('{tenant}', savedTenant)!}?returnUrl=${domain}`
        return
      }
    } else {
      // window.location.href = '/dashboad'
    }
    if (savedTenant) {
      // setCookie('tenant', tenant, 365)
      window.location.href = '/'
    }
  }, [])

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

  const onSubmit = (data: any) => {
    setCookie('tenant', data.tenantCode, 365)
    window.location.href = '/'
    // navigate('/callback')
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

export default Login
