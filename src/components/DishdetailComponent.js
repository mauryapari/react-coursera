import {Link} from 'react-router-dom';
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';

function RenderDish( {dish} )  {
   if(dish != null) {
      return (
         <Card>
            <CardImg top src={dish.image} alt={dish.name}/>
            <CardBody>
               <CardTitle>{dish.name}</CardTitle>
               <CardText>{dish.description}</CardText>
            </CardBody>
         </Card>
      );
   }
   return (<div></div>);
}

function RenderComments( {comments }) {
   if(comments && comments.length) {
      const list = comments.map(item=> {
         return (
            <li key={item.id}>
               <p>{item.comment}</p>
               <p>-- {item.author} , {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(item.date)))}</p>
            </li>
         )
      });
      return (
         <div>
            <h4>Comments</h4>
            <ul className="list-unstyled">
               { list }
            </ul>
         </div>
      )
   }
   return <div></div>
}

const DishDetail = (props) => {
   return(
      <div className="container">
         <div className="row">
            <Breadcrumb>
               <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
               <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
            </Breadcrumb>
            <div className="col-12">
               <h3>{props.dish.name}</h3>
            </div>
         </div>
         <div className="row">
            <div className="col-12 col-md-5 m-1">
               <RenderDish dish={props.dish} />
            </div>
            <div className="col-12 col-md-5 m-1">
               <RenderComments comments = {props?.comments} />
            </div>
         </div>
      </div>
   );
}

export default DishDetail ;

