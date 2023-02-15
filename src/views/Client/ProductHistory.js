import React from 'react'
import { NavBar } from '../../components/NavBar'
import NavBarTemporal from '../../components/NavBarTemporal'
import { Container, Table } from 'react-bootstrap'


const ProductHistory = () => {
  return (
    <div>
      <NavBarTemporal/>
        <NavBar/>
        <Container>
        
        <h1 className="mt-5 d-flex justify-content-center "> Historial pedidos</h1>
        <Table striped bordered hover className="mt-5 text-center">
          <thead>
            <tr>
              <th>Producto</th>
              <th>Fecha</th>
            </tr>
          </thead>
          <tbody>
              <tr>
                <td></td>
                <td></td>
              </tr>
          </tbody>
        </Table>
      </Container></div>
  )
}

export default ProductHistory