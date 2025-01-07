interface IProps {
  params?: any
}
const DefaultTemplate = (iProps: IProps) => {
  const { params } = iProps
  return (
    <div>{params}</div>
  )
}
export default DefaultTemplate