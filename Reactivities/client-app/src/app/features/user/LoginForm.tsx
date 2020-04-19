import React, { useContext } from "react";
import { Form as FinalForm, Field } from "react-final-form";
import { Form, Button, Header } from "semantic-ui-react";
import TextInput from "../../common/form/TextInput";
import ErrorMesage from "../../common/form/ErrorMessage";
import { RootStoreContext } from "../../stores/rootStore";
import { IUserFormValues } from "../../models/user";
import { FORM_ERROR } from "final-form";
import { combineValidators, isRequired } from "revalidate";

const validate = combineValidators({
  email: isRequired("email"),
  password: isRequired("password"),
});
export const LoginForm = () => {
  const rootStore = useContext(RootStoreContext);
  const { login } = rootStore.userStore;
  return (
    <FinalForm
      onSubmit={(values: IUserFormValues) =>
        login(values).catch((error) => ({
          [FORM_ERROR]: error,
        }))
      }
      validate={validate}
      render={({
        handleSubmit,
        submitting,
        submitError,
        invalid,
        pristine,
        dirtyFieldsSinceLastSubmit,
      }) => (
        <Form onSubmit={handleSubmit} error>
          <Header as='h2'  content='Login to Reactivities' color='teal' textAlign='center' />
          <Field name="email" component={TextInput} placeholder="Email" />
          <Field
            name="password"
            type="password"
            component={TextInput}
            placeholder="Password"
          />
          {submitError && !dirtyFieldsSinceLastSubmit&& (
           <ErrorMesage error={submitError}  text='invalid username or password'/>
          )}
          <Button
            disabled={invalid || pristine}
            loading={submitting}
            positive
            content="Login"
            fluid
          />
        </Form>
      )}
    />
  );
};

export default LoginForm;
