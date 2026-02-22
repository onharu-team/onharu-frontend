"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import Input from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import Checkbox from "@/components/ui/Checkbox";
import KakaoLoginButton from "./KakaoLoginButton";
import { LoginFormValues } from "../types";
import { useLogin } from "@/hooks/useLogin";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<LoginFormValues>();

  const [loginError, setLoginError] = useState("");

  const queryClient = useQueryClient();
  const { mutate: login } = useLogin();

  const router = useRouter();

  const onSubmit = (data: LoginFormValues) => {
    login(
      { loginId: data.email, password: data.password },
      {
        onSuccess: async () => {
          // 이메일 기억하기
          if (data.rememberEmail) {
            localStorage.setItem("rememberedEmail", data.email);
          } else {
            localStorage.removeItem("rememberedEmail");
          }

          await queryClient.invalidateQueries({
            queryKey: ["auth"],
          });

          router.refresh();
        },
        onError: error => {
          setLoginError("이메일 또는 비밀번호를 잘못 입력하셨습니다.");
        },
      }
    );
  };

  useEffect(() => {
    const savedId = localStorage.getItem("rememberedEmail");
    if (savedId) {
      setValue("email", savedId);
      setValue("rememberEmail", true);
    }
  }, [setValue]);

  return (
    <div className="mt-section-sm-top md:mt-section-lg-top mb-section-sm-bottom md:mb-section-lg-bottom wrapper flex flex-col items-center">
      <h2 className="text-2xl font-bold">로그인</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="flex w-full max-w-sm flex-col gap-5">
        <Input
          label="이메일"
          id="email"
          placeholder="이메일을 입력해 주세요."
          register={register("email", { required: "이메일을 입력해주세요." })}
          error={errors.email}
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

        <Checkbox label="이메일 기억하기" {...register("rememberEmail")} />

        <Button type="submit" varient="default" width="lg" height="md" fontSize="md">
          로그인
        </Button>

        <div className="text-text-secondary flex items-center justify-center text-sm">
          {/* <Link href="/find-id" className="hover:text-main">
            이메일 찾기
          </Link> */}

          <Link href="/find-password" className="hover:text-main relative flex items-center">
            {/* <span className="before:bg-text-secondary before:mx-4 before:block before:h-4 before:w-px before:content-['']" /> */}
            비밀번호 찾기/재설정
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
