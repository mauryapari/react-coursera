import { Component } from 'react';
import {Link} from 'react-router-dom';
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, 
   BreadcrumbItem, Button, Modal, ModalHeader, ModalBody, Label, Row, Col } from 'reactstrap';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import { FadeTransform, Fade, Stagger } from 'react-animation-components';


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
      this.props.postComment(this.props.dishId, values.rating, values.author, values.comment);
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

function RenderDish( {dish, isLoading, errMess} )  {
   if (isLoading) {
      return(
          <div className="container">
              <div className="row">            
                  <Loading />
              </div>
          </div>
      );
  }
  else if (errMess) {
      return(
          <div className="container">
              <div className="row">            
                  <h4>{errMess}</h4>
              </div>
          </div>
      );
  }
  else if(dish != null) {
      return (
         <FadeTransform
            in
            transformProps={{
               exitTransform: 'scale(0.5) translateY(-50%)'
            }}>
            <Card>
               <CardImg top src={baseUrl + dish.image} alt={dish.name}/>
               <CardBody>
                  <CardTitle>{dish.name}</CardTitle>
                  <CardText>{dish.description}</CardText>
               </CardBody>
            </Card>
         </FadeTransform>
      );
   }
   return (<div></div>);
}

function RenderComments( {comments, postComment, dishId}) {
   if(comments && comments.length) {
      const list = comments.map(item=> {
         return (
            <Fade in>
            <li key={item.id}>
               <p>{item.comment}</p>
               <p>-- {item.author} , {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(item.date)))}</p>
            </li>
            </Fade>
         )
      });
      return (
         <div>
            <h4>Comments</h4>
            <ul className="list-unstyled">
               <Stagger in>
               { list }
               </Stagger>
            </ul>
            <CommentForm dishId={dishId} postComment={postComment}></CommentForm>
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
               <RenderDish dish={props.dish} isLoading={props.isLoading} errMess={props.errMess}/>
            </div>
            <div className="col-12 col-md-5 m-1">
               <RenderComments comments = {props?.comments} 
                  postComment={props.postComment}
                  dishId={props.dish.id}
               />
            </div>
         </div>
      </div>
   );
}

export default DishDetail ;

