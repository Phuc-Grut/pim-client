// ** Icons Import

const Footer = () => {
  return (
    <p className="clearfix mb-0">
      <span className="float-md-start d-block d-md-inline-block mt-25"></span>
      <span className="float-md-end d-none d-md-block">
        Copyright © {new Date().getFullYear()}{" "}
        <a href="https://vfico.com" target="_blank" rel="noopener noreferrer">
          VFico
        </a>
        <span className="d-none d-sm-inline-block">, All rights Reserved</span>
      </span>
    </p>
  )
}

export default Footer
