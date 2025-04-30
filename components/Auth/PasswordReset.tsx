"use client";

import { BASE_API_URL } from "@/public/Server";
import { setAuthUser } from "@/Store/authSlice";
import axios from "axios";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import LoadingButton from "../Helper/LoadingButton";
import { Button } from "../ui/button";
import { handleAuthRequest } from "../utils/apiRequest";
import PasswordInput from "./PasswordInput";

const PasswordReset = () => {
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleSubmit = async () => {
    if (!otp || !password || !passwordConfirm) {
      return;
    }
    const data = { email, otp, password, passwordConfirm };
    const resetPassReq = async () =>
      await axios.post(`${BASE_API_URL}/users/reset-password`, data, {
        withCredentials: true,
      });
    const result = await handleAuthRequest(resetPassReq, setIsLoading);

    if (result) {
      dispatch(setAuthUser(result.data.data.user));
      toast.success(result.data.message);
      router.push("/auth/login");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center flex-col">
      <h1 className="text-2xl sm:text-3xl font-bold mb-3">
        Reset your Password
      </h1>
      <p className="mb-6 text-sm sm:text-base text-center text-gray-600 font-medium">
        Enter your OTP and new password to reset your password
      </p>
      <input
        type="number"
        placeholder="Enter OTP"
        className="block w-[90%] sm:w-[80%] md:w-[60%] lg:w-[40%] xl:w-[30%] mx-auto px-6 py-3  rounded-lg no-spinner outline-none bg-gray-300 "
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
      />
      <div className="mb-4 mt-4 w-[90%] sm:w-[80%] md:w-[60%] lg:w-[40%] xl:w-[30%]">
        <PasswordInput
          name="password"
          placeholder="Enter new password"
          inputClassName="px-6 py-3 bg-gray-300 rounded-lg outline-none "
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="w-[90%] sm:w-[80%] md:w-[60%] lg:w-[40%] xl:w-[30%]">
        <PasswordInput
          name="passwordconfirm"
          placeholder="Confirm new password"
          inputClassName="px-6 py-3 bg-gray-300 rounded-lg outline-none "
          value={passwordConfirm}
          onChange={(e) => setPasswordConfirm(e.target.value)}
        />
      </div>
      <div className="flex items-center space-x-4 mt-6">
        <LoadingButton onClick={handleSubmit} isLoading={isLoading}>
          Change Password
        </LoadingButton>
        <Button variant={"ghost"}>
          <Link href="/auth/forget-password">Go Back</Link>
        </Button>
      </div>
    </div>
  );
};

export default PasswordReset;
