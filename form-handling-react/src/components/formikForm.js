import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const FormikForm = () => {
  // Define initial form values
  const initialValues = {
    username: '',
    email: '',
    password: ''
  };

  // Define validation schema using Yup
  const validationSchema = Yup.object({
    username: Yup.string().required('Username is required')
      .trim(),
    email: Yup.string().required('Email is required')
      .email('Invalid email format'),
    password: Yup.string().required('Password is required')
      .min(6, 'Password must be at least 6 characters')
  });

  // Handle form submission
  const handleSubmit = async (values, { setSubmitting, resetForm, setStatus }) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Form submitted successfully:', values);
      
      // Set success status and reset form
      setStatus({ success: true });
      resetForm();
    } catch (error) {
      console.error('Error submitting form:', error);
      setStatus({ success: false });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="form-container">
      <h2>User Registration with Formik</h2>
      
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, status }) => (
          <Form>
            {status && status.success && (
              <div className="success-message">Registration successful!</div>
            )}
            
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <Field
                type="text"
                id="username"
                name="username"
                className="form-control"
              />
              <ErrorMessage name="username" component="div" className="error-message" />
            </div>
            
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <Field
                type="email"
                id="email"
                name="email"
                className="form-control"
              />
              <ErrorMessage name="email" component="div" className="error-message" />
            </div>
            
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <Field
                type="password"
                id="password"
                name="password"
                className="form-control"
              />
              <ErrorMessage name="password" component="div" className="error-message" />
            </div>
            
            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Submitting...' : 'Register'}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default formikForm;