import { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import { Message } from "primereact/message";

import { DEFAULT_URL_QUERY, RETURN_URL_QUERY } from "@constant/route.constant";

import { setAppToken } from "@libs/features/auth/auth.slice";
import { useLoginMutation } from "@libs/features/auth/auth.service";
import Input from "@libs/components/Input";
import Button from "@libs/components/Button";
import { ILoginRequest } from "@libs/dtos/request/auth.request";
import { FormError, FormLabel } from "@libs/components/FormElement";

import appLogo from "@assets/img/logo.png";

export default function SignIn() {
    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<ILoginRequest>();
    const [
        login,
        { data: loginResponse, isSuccess: isLoginSuccess, isLoading, error },
    ] = useLoginMutation();

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleFormSubmit = useCallback(
        async (data: ILoginRequest) => {
            await login(data);
        },
        [login]
    );

    useEffect(() => {
        if (isLoginSuccess) {
            dispatch(setAppToken(loginResponse.token));
            // Get last url where user is logged out
            const returnUrl =
                new URLSearchParams(window.location.search).get(
                    RETURN_URL_QUERY
                ) ?? DEFAULT_URL_QUERY;
            navigate(returnUrl);
        }
    }, [isLoginSuccess, loginResponse, dispatch, navigate]);

    return (
        <>
            <div className="w-full flex justify-center">
                <img className="w-11" src={appLogo} />
            </div>
            <h3 className="m-2 text-black dark:text-white text-center text-2xl font-medium">
                Welcome back!
            </h3>

            <p className="text-gray-500 text-center">
                Please enter your credentials to sign in!
            </p>

            {error !== undefined && <div>{error.data.message}</div>}

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
                        render={({ field: { onChange } }) => (
                            <>
                                <Input
                                    id="username"
                                    onChange={onChange}
                                    state={
                                        errors.username?.message ? "error" : ""
                                    }
                                />
                                <FormError>
                                    {errors.username?.message ?? ""}
                                </FormError>
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
                        render={({ field: { onChange } }) => (
                            <>
                                <Input
                                    id="password"
                                    type="password"
                                    onChange={onChange}
                                    state={
                                        errors.password?.message ? "error" : ""
                                    }
                                />
                                <FormError>
                                    {errors.password?.message ?? ""}
                                </FormError>
                            </>
                        )}
                    />
                </div>
                <Button
                    className="w-full h-10 mt-2"
                    variant="solid"
                    loading={isLoading}
                >
                    Sign In
                </Button>
            </form>
        </>
    );
}
