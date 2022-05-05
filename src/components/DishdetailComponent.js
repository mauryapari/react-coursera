import { Component } from 'react';
import {Link} from 'react-router-dom';
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, 
   BreadcrumbItem, Button, Modal, ModalHeader, ModalBody, Label, Row, Col } from 'reactstrap';
import { Control, LocalForm, Errors } from 'react-redux-form';


const minLength = (len) => (val) => val && (val.length >= len);
const maxLength = (len) => (val) => !(val) || (val.length <= len);

class CommentForm extends Component {
   constructor(props) {
      super(props);

      this.state = {
         isModalOpen: false
      }

      this.toggleModal = this.toggleModal.bind(this);
   }

   handleSubmit(values) {
      // code to deal with when form is submitted.
      this.props.addComment(this.props.dishId, values.rating, values.author, values.comment);
      this.toggleModal();

   }

   toggleModal() {
      this.setState({
         isModalOpen: !this.state.isModalOpen
      })  
   }

   render() {
      return (
         <div>
            <Button outline onClick={this.toggleModal}><span className="fa fa-pencil fa-lg"></span> Submit Comment</Button>
            <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
               <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
               <ModalBody>
                  <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                     <Row className="form-group">
                        <Label htmlFor="author" md={12}>Rating</Label>
                        <Col md={12}>
                           <Control.select model=".rating" id="rating" name="rating"
                              className="form-control">
                                 <option>1</option>
                                 <option>2</option>
                                 <option>3</option>
                                 <option>4</option>
                                 <option>5</option>
                           </Control.select>
                        </Col>
                     </Row>
                     <Row className="form-group">
                        <Label htmlFor="author" md={12}>Your Name</Label>
                        <Col>
                           <Control.text model=".author" id="author" name="author"
                              placeholder="Your Name"
                              className="form-control"
                              validators={{
                                 minLength: minLength(3), maxLength: maxLength(15)
                              }}/>
                           <Errors
                              className="text-danger"
                              model=".author"
                              show="touched"
                              messages={{
                                 minLength: 'Must be Greater then 2 Characters',
                                 maxLength: 'Must be  15 Characters or less'
                              }}   
                           />
                        </Col>
                     </Row>
                     <Row className="form-group">
                        <Label htmlFor="comment">Comment</Label>
                        <Col>
                           <Control.textarea model=".comment" id="comment" name="comment"
                              rows="6"
                              className="form-control" />
                        </Col>
                     </Row>
                     <Row className="form-group">
                        <Col>
                           <Button type="submit" color="primary">
                           Submit
                           </Button>
                        </Col>
                     </Row>
                  </LocalForm>
               </ModalBody>
            </Modal>
         </div>
      )
   }
}

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

function RenderComments( {comments, addComment, dishId}) {
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
            <CommentForm dishId={dishId} addComment={addComment}></CommentForm>
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
               <RenderComments comments = {props?.comments} 
                  addComment={props.addComment}
                  dishId={props.dish.id}
               />
            </div>
         </div>
      </div>
   );
}

export default DishDetail ;

