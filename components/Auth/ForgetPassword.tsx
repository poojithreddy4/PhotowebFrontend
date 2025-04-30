"use client";
import { BASE_API_URL } from "@/public/Server";
import axios from "axios";
import { KeySquareIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import LoadingButton from "../Helper/LoadingButton";
import { handleAuthRequest } from "../utils/apiRequest";

const ForgetPasswordPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const router = useRouter();
  const handleSubmit = async () => {
    const forgetPassReq = async () =>
      await axios.post(
        `${BASE_API_URL}/users/forget-password`,
        { email },
        { withCredentials: true }
      );
    const result = await handleAuthRequest(forgetPassReq, setIsLoading);

    if (result) {
      toast.success(result.data.message);
      router.push(`/auth/reset-password?email=${encodeURIComponent(email)}`);
    }
  };
  return (
    <div className="flex items-center justify-center flex-col w-full h-screen">
      <KeySquareIcon className="w-20 h-20 sm:w-32 sm:h-32 text-red-600 mb-12" />
      <h1 className="text-2xl sm:text-3xl font-bold mb-3">
        Forget your password?
      </h1>
      <p className="mb-6 text-sm sm:text-base text-center text-gray-600 font-medium">
        Enter your email to reset your password
      </p>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter Your email"
        className="px-6 py-3.5 rounded-lg outline-none bg-gray-200 block w-[90%] sm:w-[80%] md:w-[60%] lg:w-[40%] xl:w-[30%] mx-auto"
      />
      <LoadingButton
        onClick={handleSubmit}
        className="w-40 mt-4"
        size={"lg"}
        isLoading={isLoading}
      >
        Continue
      </LoadingButton>
    </div>
  );
};

export default ForgetPasswordPage;
