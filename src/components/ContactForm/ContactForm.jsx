import { Component } from 'react';
import { string, object } from 'yup';
import { Field, Form, Formik, ErrorMessage } from 'formik';
import PropTypes from 'prop-types';
import css from './ContactForm.module.css';

const schema = object({
  name: string()
    .max(20, 'Too Long!')
    .required('Required')
    .matches(
      /^[a-zA-Zа-яА-Я]+(([' \\-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/,
      'Invalid name format'
    ),

  number: string()
    .required('Required')
    .max(15, 'Too Long!')
    .matches(
      /\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/,
      'Invalid phone number format'
    ),
});

export class ContactForm extends Component {
  static propTypes = {
    contactData: PropTypes.func.isRequired,
  };
  values = {
    name: '',
    number: '',
  };
  handleSubmit = (value, { resetForm }) => {
    this.props.contactData(value);
    resetForm();
  };
  render() {
    return (
      <Formik
        initialValues={this.values}
        validationSchema={schema}
        onSubmit={this.handleSubmit}
      >
        <Form className={css.form}>
          <label className={css.label}>
            Name
            <Field
              className={css.input}
              type="text"
              name="name"
              title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            />
            <div className={css.wrapperError}>
              <ErrorMessage
                className={css.errorMessage}
                name="name"
                component="div"
              />
            </div>
          </label>
          <label className={css.label}>
            Number
            <Field
              className={css.input}
              type="tel"
              name="number"
              title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            />
            <div className={css.wrapperError}>
              <ErrorMessage
                className={css.errorMessage}
                name="number"
                component="div"
              />
            </div>
          </label>

          <button className={css.submit} type="submit">
            Add Contact
          </button>
        </Form>
      </Formik>
    );
  }
}
