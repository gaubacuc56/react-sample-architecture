import { useCallback } from "react";

import { Controller, useForm } from "react-hook-form";

import { CatchMutationData } from "@app-core/redux-manager/method";

import { useForgetPasswordMutation } from "@libs/features/auth/service";

import { IForgetPasswordRequest } from "@libs/dtos/request/auth.request";

import Input from "@libs/components/ui/Input";
import Button from "@libs/components/ui/Button";
import { FormError, FormLabel } from "@libs/components/ui/FormElement";
import ActionLink from "@libs/components/ui/ActionLink";

import appLogo from "@assets/img/logo.png";
import { useNavigate } from "react-router-dom";

export default function ForgetPassword() {
    const navigate = useNavigate();
    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<IForgetPasswordRequest>();
    const [forgetPassword, { isLoading }] = useForgetPasswordMutation();

    const handleFormSubmit = useCallback(
        async (data: IForgetPasswordRequest) => {
            const response = CatchMutationData(await forgetPassword(data));
            if (response) navigate("/auth/sign-in");
        },
        [forgetPassword, navigate]
    );

    return (
        <>
            <div className="w-full flex justify-center">
                <img className="w-11" src={appLogo} />
            </div>
            <h3 className="m-2 text-black dark:text-white text-center text-2xl font-medium">
                Forgot Password
            </h3>

            <p className="text-gray-400 text-center text-sm">
                Please enter your email address to reset your password
            </p>

            <form
                className="mt-4 flex flex-col"
                onSubmit={handleSubmit(handleFormSubmit)}
            >
                <div className="h-[7rem]">
                    <FormLabel htmlFor="email">Email</FormLabel>
                    <Controller
                        control={control}
                        name="email"
                        rules={{
                            required: "Email is required",
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: "Invalid email address",
                            },
                        }}
                        render={({ field: { onChange, value } }) => (
                            <>
                                <Input
                                    id="username"
                                    onChange={onChange}
                                    state={errors.email?.message ? "error" : ""}
                                    value={value}
                                    extra="mt-2"
                                    placeholder="Enter your password"
                                />
                                <FormError>
                                    {errors.email?.message ?? ""}
                                </FormError>
                            </>
                        )}
                    />
                </div>

                <Button
                    className="w-full h-10 my-1 text-sm"
                    variant="solid"
                    loading={isLoading}
                >
                    Send Email
                </Button>
                <div className="mt-4 text-center">
                    <span className="text-sm mr-1">Back to</span>
                    <ActionLink className="text-sm" to="/auth/sign-in">
                        Sign in
                    </ActionLink>
                </div>
            </form>
        </>
    );
}
