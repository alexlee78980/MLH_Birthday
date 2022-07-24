import ImageUpload from "../post/ImageUpload";
import Modal from "./Modal";
import { useState, useEffect, useContext } from "react";
import { useForm } from "../hooks/form-hook";
import Button from "../others/Button";
import Input from "../post/Input";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH
} from '../../util/validators';
import {useHttpClient} from "../hooks/http-hook"
import { AuthContext } from "../../context/auth-context";
const GenerateModal = (props) =>{
  const auth = useContext(AuthContext);
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const [formState, inputHandler] = useForm(
      {
        caption: {
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

    const postSubmitHandler = async event => {
        console.log("ran")
        console.log(formState.inputs.image.value)
        console.log(formState.inputs.caption.value)
        event.preventDefault();
        for(let i=0;i<=10; i++){
          try {
            const lat = Math.random()*90 - Math.random()*90
            const lng = Math.random()*180 - Math.random()*180
            const formData = new FormData();
            formData.append('caption', formState.inputs.caption.value);
            formData.append('image', formState.inputs.image.value);
            formData.append('lat', lat);
            formData.append('lng', lng);
            formData.append('creator', auth.name);
            await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/post/addpost`, 'POST', formData);
            props.onClose()
            props.reload()
          } catch (err) {
            console.log(err)
          }
        }
      };
      const close = () =>{
        props.onClose()
      }
    return (<Modal>
    <form className="place-form" onSubmit={postSubmitHandler}>
    <div>
    <ImageUpload id="image"
          onInput={inputHandler} errorText="Please provide an image."></ImageUpload>
   <Input
          id="caption"
          element="input"
          label="caption"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid comment"
          onInput={inputHandler}
        />
    </div>
    <Button type="submit" disabled={!formState.isValid}>Post</Button><Button onClick={close}>cancel</Button>
    </form>
   </Modal>)
};

export default GenerateModal;