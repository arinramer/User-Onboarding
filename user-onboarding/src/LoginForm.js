import React from 'react';
import { withFormik, Form, Field } from 'formik';
import * as Yup from 'yup';
import styled from 'styled-components';
import axios from "axios";
import { Button, Input, Alert, InputGroup, InputGroupText, Spinner } from 'reactstrap';
import Data from './Data';

const Container = styled.div`
    display: flex;
    justify-content: center;
    margin: 5%;
`
const Flexbox = styled.div`
    display: flex;
    margin: 10%;
    justify-content: center;
`
const inputStyle = {
    textAlign: "center"
}

let submitting = false;

function LoginForm({ errors, touched, values, status }) {
    return (
        <Container>
            <Form>
                {touched.username && errors.username && <Alert color="danger">{errors.username}</Alert>}
                <Flexbox>
                    <Input tag={Field} style={inputStyle} type="text" name="username" placeholder="Username"/>
                </Flexbox>
                {touched.email && errors.email && <Alert color="danger">{errors.email}</Alert>}
                <Flexbox>
                    <Input tag={Field} style={inputStyle} type="text" name="email" placeholder="Email"/>
                </Flexbox>
                {touched.password && errors.password && <Alert color="danger">{errors.password}</Alert>}
                <Flexbox>
                    <Input tag={Field} style={inputStyle} type="password" name="password" placeholder="Password"/>
                </Flexbox>
                {touched.tos && errors.tos && <Alert color="danger">{errors.tos}</Alert>}
                <Flexbox>
                    <label>
                        <InputGroup>
                            <InputGroupText>
                                <Input addon type="checkbox" tag={Field} name="tos" checked={values.tos}/>
                                I Accept the Terms of Service
                            </InputGroupText>
                        </InputGroup>
                    </label>
                </Flexbox>
                {
                (submitting === true)
                    ? <Flexbox><Spinner color="secondary" /></Flexbox>
                    : <Data status={status}/>
                }
                <Flexbox>
                    <Button type="submit">Submit!</Button>
                </Flexbox>
            </Form>
        </Container>
    );
}

const FormikLoginForm = withFormik({
    mapPropsToValues({username, email, password, tos}) {
        return {
            username: username || "",
            email: email || "",
            password: password || "",
            tos: tos || false
        };
    },
    validationSchema: Yup.object().shape({
        username: Yup.string()
        .max(20, "Username cannot be more than 20 characters")
        .required("A username is required"),
        email: Yup.string()
        .email("Please use a valid email address")
        .required("An email is required"),
        password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("A password is required"),
        tos: Yup.boolean()
        .oneOf([true], 'You Must Accept the Terms and Conditions'),
        }),
    handleSubmit(values, { resetForm, setSubmitting, setStatus }) {
        submitting = true;
        axios
            .post("https://reqres.in/api/users", values)
            .then(res => {
                resetForm();
                setSubmitting(false);
                submitting = false;
                setStatus(res.data);
            })
            .catch(err => {
                console.log(err); // There was an error creating the data and logs to console
                setSubmitting(false);
            });
    }
})(LoginForm)

export default FormikLoginForm;