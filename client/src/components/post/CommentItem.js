import './CommentItem.css'
const CommentItem = (props) =>{
    console.log(props.item.time)
    return (<div>
        <div>
        <h4>{props.item.name}</h4>
        </div>
        <div className='content'>
        <h5>{props.item.comment}</h5>
        <h6 className="date">{new Date(props.item.time).toLocaleDateString('en-US')}</h6>
        </div>
        <hr></hr>
    </div>)
    }
export default CommentItem