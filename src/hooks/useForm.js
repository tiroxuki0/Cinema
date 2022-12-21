import { useDispatch } from "react-redux";
/* import axios from "axios";
import { Buffer } from "buffer";
import {
  toggleForm as toggleFormRedux,
  setFormUserInfo as setFormUserInfoRedux,
  signUpStart,
  signUpEnd,
} from "../redux/commonSlice"; */
import useToast from "./useToast";

const useForm = () => {
  const dispatch = useDispatch();
  const { notify } = useToast();

  // handling form-submission
  const handleFormSubmit = async (values) => {
    try {
      const { confirm, ...others } = values;
    } catch (err) {
      console.log(err);
    }
  };

  return { handleFormSubmit };
};

export default useForm;
