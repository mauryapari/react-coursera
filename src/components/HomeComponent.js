import React from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle} from 'reactstrap';
function RenderCard({element}) {
   return (
      <Card>
         <CardImg src={element.image} alt={element.name} />
         <CardBody>
            <CardTitle>{element.name}</CardTitle>
            {element.designation ? <CardSubtitle>{element.designation}</CardSubtitle> : null }
            <CardText>{element.description}</CardText>
         </CardBody>
      </Card>
   );
}


function Home(props) {
    return(
      <div className="container">
         <div className="row align-items-start">
            <div className="col-12 col-md m-1">
               <RenderCard element={props.dish} />
            </div>
            <div className="col-12 col-md m-1">
               <RenderCard element={props.promotion} />
            </div>
            <div className="col-12 col-md m-1">
               <RenderCard element={props.leader} />
            </div>
         </div>
      </div>
    );
}

export default Home;   