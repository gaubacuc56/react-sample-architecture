import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { setAppToken } from "@libs/features/auth/auth.slice";
import { useLoginMutation } from "@libs/features/auth/auth.service";

import { DEFAULT_URL_QUERY, RETURN_URL_QUERY } from "@/constant/route.constant";

export default function SignIn() {
  const [login, { data: loginResponse, isSuccess: isLoginSuccess }] =
    useLoginMutation();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    login({
      username: "kminchelle",
      password: "0lelplR",
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  return <div>SignIn</div>;
}
