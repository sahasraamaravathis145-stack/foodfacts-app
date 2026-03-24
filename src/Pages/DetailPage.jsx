import { useParams } from 'react-router-dom'

function DetailPage() {
  const { barcode } = useParams()

  return (
    <div>
      <h1>Detail Page</h1>
      <p>Barcode: {barcode}</p>
    </div>
  )
}

export default DetailPage