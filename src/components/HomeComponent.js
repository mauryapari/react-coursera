import React from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle} from 'reactstrap';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';

function RenderCard({element, isLoading, errMess}) {
   if (isLoading) {
      return(<Loading />);
   }
   else if (errMess) {
         return(
               <h4>{errMess}</h4>
         );
   }
   else {
      return (
         <Card>
            <CardImg src={baseUrl + element.image} alt={element.name} />
            <CardBody>
               <CardTitle>{element.name}</CardTitle>
               {element.designation ? <CardSubtitle>{element.designation}</CardSubtitle> : null }
               <CardText>{element.description}</CardText>
            </CardBody>
         </Card>
      );
   }
}


function Home(props) {
    return(
      <div className="container">
         <div className="row align-items-start">
            <div className="col-12 col-md m-1">
               <RenderCard element={props.dish} isLoading={props.dishesLoading} errMess={props.dishesErrMess}  />
            </div>
            <div className="col-12 col-md m-1">
               <RenderCard element={props.promotion} isLoading={props.promoLoading} errMess={props.promoErrMess} />            
            </div>
            <div className="col-12 col-md m-1">
               <RenderCard element={props.leader} />
            </div>
         </div>
      </div>
    );
}

export default Home;   