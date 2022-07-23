import { useState } from "react";
import Button from "../others/Button";
import Modal from "./Modal";
import CommentItem from "../post/CommentItem";
import './ZoomPostModal.css'

const ZoomPostModal = (props)=>{
    const [showComments, setShowComments] = useState(false)
    const [addComment, setAddComment] = useState(false)
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
    const addCommentHandler = () =>{
        setAddComment(true)
    }
    const closeHandler = () =>{
        setAddComment(false)
    }
    console.log(props.selected.comments[0].name)
    return (<Modal>
    <div><img className="post" src="https://c.tenor.com/fIqul3ygsG8AAAAM/happy-birthday.gif"></img></div>
        <Button onClick={commentsHandler}>{showComments ? 'Hide Comments':'Show Comments'}</Button>
        <Button onClick={close}>Close</Button>
        {showComments && <Button onClick={addCommentHandler}>Add Comments</Button>}
        {addComment && <div className="commentBox"><input></input><div className="buttonBox"><Button>Submit</Button><Button onClick={closeHandler}>cancel</Button></div></div>}
        {showComments && props.selected.comments.map((comment) => {return <CommentItem item={comment}></CommentItem>})}
    </Modal>)
};
export default ZoomPostModal;