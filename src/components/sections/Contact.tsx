import React from "react";
import Card from "../Card";
import Input from "../Input";
import { useState } from "react";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import "../../styles/Contact.css";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMesssage] = useState("");
  const [open, setOpen] = useState(false);

  const reset = () => {
    const contactForm = document.getElementById("contact-form");
    if (contactForm) {
      const inputs: NodeList = contactForm.childNodes;
      const len = inputs.length;
      for (let i = 0; i < len; i++) {
        (inputs[i] as HTMLInputElement).value = "";
      }
    }
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (name !== "" && email !== "" && message !== "") {
      reset();
      setOpen(true);
    }
  };

  const handleClose = () => setOpen(false);

  return (
    <React.Fragment>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Message was Sended!
        </Alert>
      </Snackbar>
      <Card className="contact-card">
        <form id="contact-form" onSubmit={handleSubmit}>
          <Input
            placeholder="Name"
            style={{ width: "87%" }}
            onChange={(e: any) => setName(e.target.value)}
          />
          <Input
            placeholder="Email"
            style={{ width: "87%" }}
            onChange={(e: any) => setEmail(e.target.value)}
          />
          <textarea
            name="message"
            placeholder="Type a message"
            onChange={(e: any) => setMesssage(e.target.value)}
            cols={30}
            rows={10}
          ></textarea>
          <Button
            variant="contained"
            size="large"
            type="submit"
            style={{
              backgroundColor: "#4d4d4d",
              width: "20vh",
              borderRadius: "50px",
            }}
          >
            Submit
          </Button>
        </form>
      </Card>
    </React.Fragment>
  );
}

export default Contact;
