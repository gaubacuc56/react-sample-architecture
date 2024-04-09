import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { setAppToken } from "@libs/features/auth/auth.slice";
import { useLoginMutation } from "@libs/features/auth/auth.service";

import { DEFAULT_URL_QUERY, RETURN_URL_QUERY } from "@/constant/route.constant";
import Input from "@libs/components/Input";
import { Button } from "primereact/button";

export default function SignIn() {
  const [login, { data: loginResponse, isSuccess: isLoginSuccess }] =
    useLoginMutation();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoginSuccess) {
      dispatch(setAppToken(loginResponse.token));
      // Get last url where user is logged out
      const returnUrl = new URLSearchParams(window.location.search).get(
        RETURN_URL_QUERY
      );
      navigate(returnUrl ?? DEFAULT_URL_QUERY);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoginSuccess, loginResponse]);

  return (
    <div className="mb-8">
      <h3 className="mb-1 text-white text-center">Welcome back!</h3>
      <p className="text-white">Please enter your credentials to sign in!</p>
      <form>
        <div>
          <label htmlFor="username">User Name</label>
          <Input id="username" />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <Input id="password" type="password" />
        </div>
        <Button label="Sign In" className="bg-emerald-600 w-full py-3 text-white font-medium mt-3"  />
      </form>
      {/* <Form>
        <FormContainer>
          <FormItem
            label="User Name"
            invalid={(errors.userName && touched.userName) as boolean}
            errorMessage={errors.userName}
          >
            <Field
              type="text"
              autoComplete="off"
              name="userName"
              placeholder="User Name"
              component={Input}
            />
          </FormItem>
          <FormItem
            label="Password"
            invalid={(errors.password && touched.password) as boolean}
            errorMessage={errors.password}
          >
            <Field
              autoComplete="off"
              name="password"
              placeholder="Password"
              component={PasswordInput}
            />
          </FormItem>
          <div className="flex justify-between mb-6">
            <Field className="mb-0" name="rememberMe" component={Checkbox}>
              Remember Me
            </Field>
            <ActionLink to={forgotPasswordUrl}>Forgot Password?</ActionLink>
          </div>
          <Button block loading={isSubmitting} variant="solid" type="submit">
            {isSubmitting ? "Signing in..." : "Sign In"}
          </Button>
          <div className="mt-4 text-center">
            <span>{`Don't have an account yet?`} </span>
            <ActionLink to={signUpUrl}>Sign up</ActionLink>
          </div>
        </FormContainer>
      </Form> */}
    </div>
  );
}
