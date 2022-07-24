import { useContext, useState } from "react";
import Button from "../others/Button";
import Modal from "./Modal";
import CommentItem from "../post/CommentItem";
import './ZoomPostModal.css'
import Input from "../post/Input";
import { VALIDATOR_REQUIRE } from "../../util/validators";
import { useForm } from "../hooks/form-hook";
import { AuthContext } from "../../context/auth-context";
import { useHttpClient } from "../hooks/http-hook";
import ErrorModal from "../error/ErrorModal";

const ZoomPostModal = (props)=>{
    const auth = useContext(AuthContext)
    const [showComments, setShowComments] = useState(false)
    const [addComment, setAddComment] = useState(false)
    const [post, setPost] = useState(props.selected)
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const [comments, setComments] = useState([...post.comments])
    const close = () =>{
        props.onClose()
      }
    const commentsHandler = () => {
        if(showComments){
            setShowComments(false)
            setAddComment(false)
        }else{
            setShowComments(true)
        }
    }
    const [formState, inputHandler] = useForm(
        {
          comment: {
            value: '',
            isValid: false
        
        }},
        false
      );
    const addCommentHandler = () =>{
        setAddComment(true)
    }
    const closeHandler = () =>{
        setAddComment(false)
    }

    const submitComment = async (event) =>{
        event.preventDefault()
        // const comment = {comment: formState.inputs.comment.value, name:auth.name, time: new Date()}
        // setComments(prev=>[comment ,...prev])
        try {
            const req = await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/post/addcomment`, 'PATCH', JSON.stringify({
                id:props.selected.id, comment: formState.inputs.comment.value, name:auth.name, time: new Date()}), {
                'Content-Type': 'application/json'
              } );
              setPost(req.post)
              setComments(req.post.comments)
        } catch (err) { console.log(err) }
        formState.inputs.comment.value =  '';
        setAddComment(false)

    }

    return (<Modal>
    {error && <ErrorModal error={error} onClear={clearError}></ErrorModal>}
    <div><img className="post" src={`${process.env.REACT_APP_BACKEND_URL2}/${post.image}`} alt="img not found"></img></div>
        <h5>{post.caption}</h5>
        <Button onClick={commentsHandler}>{showComments ? 'Hide Comments':'Show Comments'}</Button>
        <Button onClick={close}>Close</Button>
        {showComments && <Button onClick={auth.isLoggedIn ? addCommentHandler: auth.loginPopup}>Add Comments</Button>}
        {addComment && <form className="commentBox" onSubmit={submitComment}><Input
          id="comment"
          element="input"
          label="comment"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid comment"
          onInput={inputHandler}
        /><div className="buttonBox"><Button type="submit">Submit</Button><Button onClick={closeHandler}>cancel</Button></div></form>}
        {showComments && comments.map((comment) => {return <CommentItem item={comment}></CommentItem>})}
    </Modal>)
};
export default ZoomPostModal;