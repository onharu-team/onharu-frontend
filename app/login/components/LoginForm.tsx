"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import Input from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import Checkbox from "@/components/ui/Checkbox";
import KakaoLoginButton from "./KakaoLoginButton";
import { LoginFormValues } from "../data/login";

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<LoginFormValues>();

  const [loginError, setLoginError] = useState("");

  const onSubmit = (data: LoginFormValues) => {
    console.log("로그인 데이터:", data);

    if (data.userId !== "test" || data.password !== "1234") {
      setLoginError("아이디 또는 비밀번호를 잘못 입력하셨습니다.");
      return;
    }

    setLoginError("");

    // 아이디 기억하기
    if (data.rememberId) {
      localStorage.setItem("rememberedUserId", data.userId);
    } else {
      localStorage.removeItem("rememberedUserId");
    }

    alert("로그인 성공!");
  };

  useEffect(() => {
    const savedId = localStorage.getItem("rememberedUserId");
    if (savedId) {
      setValue("userId", savedId);
      setValue("rememberId", true);
    }
  }, [setValue]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-8 bg-gray-50 px-4">
      <h2 className="text-2xl font-bold">로그인</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="flex w-full max-w-sm flex-col gap-5">
        <Input
          label="아이디"
          id="userId"
          placeholder="아이디를 입력해 주세요."
          register={register("userId", { required: "아이디를 입력해주세요." })}
          error={errors.userId}
        />

        <Input
          label="비밀번호"
          id="password"
          type="password"
          placeholder="비밀번호를 입력해 주세요."
          register={register("password", { required: "비밀번호를 입력해주세요." })}
          error={
            errors.password || (loginError ? { type: "manual", message: loginError } : undefined)
          }
        />

        <Checkbox label="아이디 기억하기" {...register("rememberId")} />

        <Button type="submit" varient="default" width="lg" height="md" fontSize="md">
          로그인
        </Button>

        <div className="text-text-secondary flex items-center justify-center text-sm">
          <Link href="/find-id" className="hover:text-main">
            아이디 찾기
          </Link>

          <Link href="/find-password" className="hover:text-main relative flex items-center">
            <span className="before:bg-text-secondary before:mx-4 before:block before:h-4 before:w-px before:content-['']" />
            비밀번호 찾기
            <span className="after:bg-text-secondary after:mx-4 after:block after:h-4 after:w-px after:content-['']" />
          </Link>

          <Link href="/signup" className="hover:text-main">
            회원가입
          </Link>
        </div>

        <hr className="my-6.25 border-gray-300" />

        <KakaoLoginButton className="flex justify-center" />
      </form>
    </div>
  );
}
