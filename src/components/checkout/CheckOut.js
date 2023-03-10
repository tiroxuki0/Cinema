import * as React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import AddressForm from "./AddressForm";
import PaymentForm from "./PaymentForm";
import Review from "./Review";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import useToast from "../../hooks/useToast";
import useScrollDisable from "../../hooks/useScrollDisable";
import {
  toggleCheckOut,
  setActiveStep,
  clearOrderDetails,
} from "../../redux/commonSlice";
import { clearAll } from "../../redux/cartSlice";

const steps = [
  "Shipping address",
  "Payment details",
  "Review your order details",
];

function getStepContent(step) {
  switch (step) {
    case 0:
      return <AddressForm />;
    case 1:
      return <PaymentForm />;
    case 2:
      return <Review />;
    default:
      throw new Error("Unknown step");
  }
}

export default function Checkout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { notify } = useToast();
  const isCheckOutRedux = useSelector((state) => state.common.isCheckOut);
  const uid = useSelector((state) => state.common.formUserInfo.uid);
  const idOrder = useSelector((state) => state.common.orderDetails?.id);
  const activeStep = useSelector((state) => state.common.orderDetails?.step);
  const formRef = React.useRef();
  const backdropRef = React.useRef();
  const modalRef = React.useRef();

  const createOrder = async () => {
    if (idOrder) {
    }
  };

  const handleClickOutSide = async (e) => {
    if (e.target === backdropRef.current || e.target === modalRef.current) {
      dispatch(toggleCheckOut(false));
    }
  };

  const closeOnClick = async (e) => {
    dispatch(toggleCheckOut(false));
    createOrder();
  };

  useScrollDisable(isCheckOutRedux);

  return (
    <>
      {isCheckOutRedux && (
        <div
          className="backdrop"
          onClick={handleClickOutSide}
          ref={backdropRef}
        >
          <div className="modal_centered" ref={modalRef}>
            <Paper
              variant="outlined"
              sx={{
                my: { xs: 3, md: 6 },
                p: { xs: 2, md: 3 },
                maxWidth: "700px",
                width: "100%",
              }}
              className="checkout_form"
              ref={formRef}
            >
              <Typography component="h1" variant="h4" align="center">
                Checkout
              </Typography>
              <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
                {steps.map((label) => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
              <React.Fragment>
                {activeStep === steps.length ? (
                  <React.Fragment>
                    <Typography variant="h5" gutterBottom>
                      Thank you for your order.
                    </Typography>
                    <Typography variant="subtitle1">
                      Your order number is #{idOrder}. We have emailed your
                      order confirmation, and will send you an update when your
                      order has shipped.
                    </Typography>
                    <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                      <Button
                        variant="contained"
                        onClick={closeOnClick}
                        sx={{ mt: 3, ml: 1 }}
                      >
                        Close
                      </Button>
                    </Box>
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    {getStepContent(activeStep ? activeStep : 0)}
                  </React.Fragment>
                )}
              </React.Fragment>
            </Paper>
          </div>
        </div>
      )}
    </>
  );
}
