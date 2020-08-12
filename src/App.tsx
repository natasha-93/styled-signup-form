import React, { useState } from "react";
import Loader from "./Loader";
import styled from "styled-components";
import { FormData } from "./models/FormData";
import { submitForm } from "./api";

const defaultFormData = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
};

function App() {
  const [formData, setFormData] = useState<FormData>(defaultFormData);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
  };

  if (successMessage != null)
    return (
      <Card>
        <Success>{successMessage}</Success>
      </Card>
    );

  return (
    <>
      {isLoading && <Loader />}
      <Card>
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            setIsLoading(true);
            submitForm(formData)
              .then((data) => {
                console.log("Success:", data);
                setFormData(defaultFormData);
                setSuccessMessage(data.message);
                setError(null);
              })
              .catch((error) => {
                setError(error.message);
              })
              .finally(() => setIsLoading(false));
          }}
        >
          <Title>Signup Form</Title>
          {error && <StyledError>{error}</StyledError>}
          <Label>
            First Name:
            <StyledInput
              required
              name="firstName"
              placeholder="Enter first name here"
              value={formData.firstName}
              onChange={handleInputChange}
            />
          </Label>

          <Label>
            Last Name:
            <StyledInput
              required
              name="lastName"
              placeholder="Enter last name here"
              value={formData.lastName}
              onChange={handleInputChange}
            />
          </Label>

          <Label>
            Email Address:
            <StyledInput
              required
              type="email"
              name="email"
              placeholder="Enter email address here"
              value={formData.email}
              onChange={handleInputChange}
            />
          </Label>

          <Label>
            Password:
            <StyledInput
              required
              type="password"
              name="password"
              placeholder="Enter password here"
              value={formData.password}
              onChange={handleInputChange}
            />
          </Label>

          <Button disabled={isLoading}>Submit</Button>
        </Form>
      </Card>
    </>
  );
}

export default App;

const Card = styled.div`
  width: 100%;
  max-width: 25rem;
  margin: auto;
  padding: 1.6rem 3rem;
  border: 0.1rem solid black;

  background-image: linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%);
  border: none;
  box-shadow: 3px 3px 25px 8px rgba(0, 0, 0, 0.24);
  border-radius: 1.25rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Title = styled.h1`
  align-self: center;
`;

const Label = styled.label`
  margin: 0.8rem 0;
  font-weight: bold;
`;

const StyledInput = styled.input`
  margin: 0.2rem 0;
  font-size: 1.2rem;
  padding: 0.3rem 0.6rem;
  border: none;
  border-bottom: 1px solid black;
  background-color: transparent;
  width: 100%;
`;

const Button = styled.button`
  margin: 1rem 0;
  border-radius: 1.25rem;
  font-size: 1.8rem;
  padding: 0.3rem 1rem;
  background-color: #e2e1e1;

  &:hover {
    background-color: #eac1fb;
  }
`;

const StyledError = styled.div`
  background-color: red;
  color: white;
  font-weight: bold;
  padding: 1rem;
  margin-bottom: 0.3rem;
  border-radius: 1.25rem;
  text-align: center;
`;

const Success = styled.p`
  font-size: 1.5rem;
  font-weight: bold;
  text-align: center;
`;
