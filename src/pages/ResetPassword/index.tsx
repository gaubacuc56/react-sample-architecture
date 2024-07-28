import { useCallback, useEffect, useState } from "react";

import { Controller, useForm } from "react-hook-form";

import { CatchMutationData } from "@app-core/redux-manager/method";

import { useResetPasswordMutation } from "@libs/features/auth/service";

import Input from "@libs/components/ui/Input";
import Button from "@libs/components/ui/Button";
import { FormError, FormLabel } from "@libs/components/ui/FormElement";
import ActionLink from "@libs/components/ui/ActionLink";

import appLogo from "@assets/img/logo.png";
import { useNavigate, useSearchParams } from "react-router-dom";
import { HiOutlineEyeOff, HiOutlineEye } from "react-icons/hi";

interface IResetPasswordForm {
    password: string;
    confirmPassword: string;
}

export default function ResetPassword() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const resetKey = searchParams.get("resetKey");
    const {
        handleSubmit,
        control,
        formState: { errors },
        watch,
    } = useForm<IResetPasswordForm>();

    const [isShowPassword, setIsShowPassword] = useState(false);
    const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(false);

    const [resetPassword, { isLoading }] = useResetPasswordMutation();

    const handleShowPassword = (show: boolean) => {
        setIsShowPassword(show);
    };

    const handleShowConfirmPassword = (show: boolean) => {
        setIsShowConfirmPassword(show);
    };

    const handleFormSubmit = useCallback(
        async (data: IResetPasswordForm) => {
            const payload = {
                resetKey: resetKey as string,
                newPassword: data.password,
            };
            const response = CatchMutationData(await resetPassword(payload));

            if (response) navigate("/auth/sign-in");
        },
        [navigate, resetKey, resetPassword]
    );

    useEffect(() => {
        if (!resetKey) navigate("/auth/login");
    }, [navigate, resetKey]);

    // Watch the value of the password field to use it in the confirm password validation
    const password = watch("password");

    return (
        <>
            <div className="w-full flex justify-center">
                <img className="w-11" src={appLogo} />
            </div>
            <h3 className="m-2 text-black dark:text-white text-center text-2xl font-medium">
                Reset Password
            </h3>

            <p className="text-gray-400 text-center text-sm">
                Your new password must different from previous password
            </p>

            <form
                className="mt-4 flex flex-col"
                onSubmit={handleSubmit(handleFormSubmit)}
            >
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
                                    state={
                                        errors.password?.message ? "error" : ""
                                    }
                                    rightIcon={
                                        isShowPassword ? (
                                            <HiOutlineEyeOff
                                                onClick={() =>
                                                    handleShowPassword(false)
                                                }
                                            />
                                        ) : (
                                            <HiOutlineEye
                                                onClick={() =>
                                                    handleShowPassword(true)
                                                }
                                            />
                                        )
                                    }
                                    extra="mt-2"
                                    placeholder="Enter your password"
                                />
                                <FormError>
                                    {errors.password?.message ?? ""}
                                </FormError>
                            </>
                        )}
                    />
                </div>

                <div className="h-[7rem]">
                    <FormLabel htmlFor="confirmPassword">
                        Confirm Password
                    </FormLabel>
                    <Controller
                        control={control}
                        name="confirmPassword"
                        rules={{
                            required: "Password confirm is required",
                            validate: (value) =>
                                value === password || "Password does not match",
                        }}
                        render={({ field: { onChange, value } }) => (
                            <>
                                <Input
                                    value={value}
                                    id="confirmPassword"
                                    type={
                                        !isShowConfirmPassword
                                            ? "password"
                                            : "text"
                                    }
                                    onChange={onChange}
                                    state={
                                        errors.confirmPassword?.message
                                            ? "error"
                                            : ""
                                    }
                                    rightIcon={
                                        isShowConfirmPassword ? (
                                            <HiOutlineEyeOff
                                                onClick={() =>
                                                    handleShowConfirmPassword(
                                                        false
                                                    )
                                                }
                                            />
                                        ) : (
                                            <HiOutlineEye
                                                onClick={() =>
                                                    handleShowConfirmPassword(
                                                        true
                                                    )
                                                }
                                            />
                                        )
                                    }
                                    extra="mt-2"
                                    placeholder="Confirm your password"
                                />
                                <FormError>
                                    {errors.confirmPassword?.message ?? ""}
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
                    Submit
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
