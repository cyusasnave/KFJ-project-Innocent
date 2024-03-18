import * as yup from "yup";

const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
// min 8 characters, 1 uppercase letter, 1 lower case letter, 1 numeric digit.

const signupSchema = yup.object().shape({
    email: yup.string().email("Please enter a valid email").required("Required"),
    password: yup
    .string()
    .min(5).matches(passwordRules, {message: "Please create a stronger password"})
    .required("Required"),
    confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords don't match")
    .required("Required")
})

export default signupSchema;