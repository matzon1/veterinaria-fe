import { NavBar } from "../../components/NavBar"
import { Card, Button, Container, Row } from "react-bootstrap"
import borderImg from "../../img/border.jpg";
import catImg from "../../img/gato.jpg"
import { useState, useEffect } from "react";
import NavBarTemporal from "../../components/NavBarTemporal";
import {
    customFetch,
    handleServerError,
  } from "../../utils/helpers";
  import { useAuthDispatch, useAuth } from "../../context/AuthContextProvider";
  import { toast } from "react-toastify";

const ClientHome = () => {

  const [quantity, setQuantity] = useState(1);
  const dispatch = useAuthDispatch();
  const auth = useAuth();
  const [product, setProduct] = useState([]);
  function increaseCartQuantity(quantity) {
        
            return quantity + 1 ;
  }
        
  const getProducts = () => {
    customFetch("GET", "api/Product", auth.token)
      .then((response) => {
        const error = handleServerError(dispatch, response);
        if (error) {
          return;
        }
        return response.json();
      })
      .then((body) => {
        setProduct(body);
        console.log(body);
      })
      .catch((er) => {
        console.log(er);
        toast.error("Ocurrió un error");
      });
  };

  useEffect(() => {
    getProducts(); 
  }, []);

  return (
    <div>
        <NavBarTemporal/>
        <NavBar/>

    <h1 className="mt-5 d-flex justify-content-center align-items-center ">Elegi el combo para tu mascota</h1>
    <Container className="mt-5">
    <Row  md={3} xs={1}  className=" d-flex justify-content-center align-items-center ">

        {product.map((p) => 
    <Card className="h-100 p-0" key={p.id}>
         <Card.Img variant="top" src={p.id === 1 ? borderImg : catImg} height='200px'  style={{ objectFit: "cover" }}/> 

        <Card.Body className="d-flex flex-column">
            <Card.Title className="d-flex justify-content-between align-items-baseline mb-4">
                <span className="fs-2">{p.name}</span>

            </Card.Title>
            <div className="mt-auto">
                    <Button className="w-100" /* onClick={() => increaseCartQuantity(id)} */> Add to Cart</Button>

              <div className="d-flex align-items-center flex-column" style={{ gap: ".5rem"}}>
                    
                    <div className="d-flex align-items-center justify-content-center" style={{ gap: ".5rem"}}>
                        <Button /* onClick={() => decreaseCartQuantity(id)} */>-</Button>
                        <div className="">
                        <span className="fs-3">quantity</span>
                        </div>
                        <Button /* onClick={() => increaseCartQuantity(id)} */>+</Button>
                    </div>
                    <Button variant="danger" /* onClick={() => removeFromCart(id)} */>Remove</Button>
                    </div>{/* } */}
            </div>
        </Card.Body>
    </Card>
    )}
    
    </Row>
    </Container>
    
    </div>
  )
}

export default ClientHome