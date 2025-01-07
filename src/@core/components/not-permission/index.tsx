import {Button} from "reactstrap"
import {Link} from "react-router-dom"
import {ArrowLeft} from "becoxy-icons"

const NotPermission = () => {
  return (
    <>
      <div className='content-center pt-5 pb-5'>
        <div style={{ padding: 5, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
          <div>
            <h4 style={{ marginBottom: 1.5 }}>
              You are not authorized!
            </h4>
            <p style={{ color: 'text.secondary' }}>
              You do not have permission to view this page using the credentials that you have provided while login.
            </p>
            <p style={{ marginBottom: 6, color: 'text.secondary' }}>Please contact your site administrator.</p>
            <Link to={'/'}>
              <Button color={'primary'}>
                <ArrowLeft fontSize={18} /> Trang chủ
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default NotPermission