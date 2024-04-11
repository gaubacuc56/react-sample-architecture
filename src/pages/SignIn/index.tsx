import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";

import { DEFAULT_URL_QUERY, RETURN_URL_QUERY } from "@constant/route.constant";

import {
  savedAccount,
  setAppToken,
  setSavedAccount,
} from "@libs/features/auth/auth.slice";
import { useLoginMutation } from "@libs/features/auth/auth.service";
import Input from "@libs/components/Input";
import Button from "@libs/components/Button";
import { ILoginRequest } from "@libs/dtos/request/auth.request";
import { FormError, FormLabel } from "@libs/components/FormElement";

import appLogo from "@assets/img/logo.png";
import { useFetchError } from "@libs/hooks/useFetchError";
import Alert from "@libs/components/Alert";
import { HiOutlineEyeOff, HiOutlineEye } from "react-icons/hi";
import Checkbox from "@/libs/components/Checkbox";
import ActionLink from "@/libs/components/ActionLink";

export default function SignIn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    handleSubmit,
    control,
    getValues,
    formState: { errors },
  } = useForm<ILoginRequest>({
    defaultValues: {
      username: useSelector(savedAccount)?.username,
      password: useSelector(savedAccount)?.password,
    },
  });
  const [
    login,
    { data: loginResponse, isSuccess: isLoginSuccess, isLoading, error },
  ] = useLoginMutation();

  const { errMsg } = useFetchError(error);

  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isRememberAccount, setIsRememberAccount] = useState(
    useSelector(savedAccount) !== undefined
  );

  const handleShowPassword = useCallback((show: boolean) => {
    setIsShowPassword(show);
  }, []);

  const handleRememberAccount = useCallback(() => {
    setIsRememberAccount(!isRememberAccount);
  }, [isRememberAccount]);

  const handleFormSubmit = useCallback(
    async (data: ILoginRequest) => {
      await login(data);
    },
    [login]
  );

  useEffect(() => {
    if (isLoginSuccess) {
      console.log("ischecked", isRememberAccount);
      dispatch(setAppToken(loginResponse.token));
      if (isRememberAccount) {
        dispatch(
          setSavedAccount({
            username: getValues("username"),
            password: getValues("password"),
          })
        );
      } else dispatch(setSavedAccount(undefined));
      // Get last url where user is logged out
      const returnUrl =
        new URLSearchParams(window.location.search).get(RETURN_URL_QUERY) ??
        DEFAULT_URL_QUERY;
      navigate(returnUrl);
    }
  }, [
    isLoginSuccess,
    loginResponse,
    dispatch,
    navigate,
    isRememberAccount,
    getValues,
  ]);

  return (
    <>
      <div className="w-full flex justify-center">
        <img className="w-11" src={appLogo} />
      </div>
      <h3 className="m-2 text-black dark:text-white text-center text-2xl font-medium">
        Welcome back!
      </h3>

      <p className="text-gray-400 text-center text-sm">
        Please enter your credentials to sign in!
      </p>

      {errMsg !== undefined && (
        <Alert showIcon className="my-5 !text-sm" type="danger">
          {errMsg}
        </Alert>
      )}

      <form
        className="mt-4 flex flex-col"
        onSubmit={handleSubmit(handleFormSubmit)}
      >
        <div className="h-[7rem]">
          <FormLabel htmlFor="username">Email</FormLabel>
          <Controller
            control={control}
            name="username"
            rules={{
              required: "Username is required",
              // pattern: {
              //   value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              //   message: "Invalid email address",
              // },
            }}
            render={({ field: { onChange, value } }) => (
              <>
                <Input
                  id="username"
                  onChange={onChange}
                  state={errors.username?.message ? "error" : ""}
                  value={value}
                />
                <FormError>{errors.username?.message ?? ""}</FormError>
              </>
            )}
          />
        </div>
        <div className="h-[7rem]">
          <FormLabel htmlFor="password">Password</FormLabel>
          <Controller
            control={control}
            name="password"
            rules={{
              required: "Password is required",
            }}
            render={({ field: { onChange, value } }) => (
              <>
                <Input
                  value={value}
                  id="password"
                  type={!isShowPassword ? "password" : "text"}
                  onChange={onChange}
                  state={errors.password?.message ? "error" : ""}
                  rightIcon={
                    isShowPassword ? (
                      <HiOutlineEyeOff
                        onClick={() => handleShowPassword(false)}
                      />
                    ) : (
                      <HiOutlineEye onClick={() => handleShowPassword(true)} />
                    )
                  }
                />
                <FormError>{errors.password?.message ?? ""}</FormError>
              </>
            )}
          />
        </div>
        <div className="flex justify-between mb-6 items-center">
          <div className="flex gap-2">
            <Checkbox
              children={
                <span className="text-sm text-gray-400">Remember Me</span>
              }
              defaultChecked={isRememberAccount}
              onChange={handleRememberAccount}
            />
          </div>
          <ActionLink className="text-sm" to="">
            Forgot Password?
          </ActionLink>
        </div>
        <Button
          className="w-full h-10 my-1"
          variant="solid"
          loading={isLoading}
        >
          Sign In
        </Button>
        <div className="mt-4 text-center">
          <span className="text-sm mr-1">Don't have an account yet?</span>
          <ActionLink className="text-sm" to="">
            Sign up
          </ActionLink>
        </div>
      </form>
    </>
  );
}
