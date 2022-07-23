import ImageUpload from "../post/ImageUpload";
import Modal from "./Modal";
import { useForm } from "../hooks/form-hook";
import Button from "../others/Button";
import {useHttpClient} from "../hooks/http-hook"
const PostModal = (props) =>{
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const placeSubmitHandler = async event => {
        event.preventDefault();
        try {
          const formData = new FormData();
          formData.append('image', formState.inputes)
          formData.append('image', formState.inputs.image.value);
          await sendRequest('http://localhost:5000/api/post', 'POST', formData);
        } catch (err) {}
      };
    const [formState, inputHandler] = useForm(
        {
          title: {
            value: '',
            isValid: false
          },
          description: {
            value: '',
            isValid: false
          },
          address: {
            value: '',
            isValid: false
          },
          image: {
            value: null,
            isValid: false
          }
        },
        false
      );
      const close = () =>{
        props.onClose()
      }
    return (<Modal>
    <form className="place-form" onSubmit={placeSubmitHandler}>
    <div>
    <ImageUpload></ImageUpload>
    <label> Comment <input></input></label>
    </div>
    <Button type="submit" disabled></Button><Button onClick={close}>cancel</Button>
    <label> Image <input></input></label>
    </form>
   </Modal>)
};

export default PostModal;