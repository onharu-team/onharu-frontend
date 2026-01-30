"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Input from "@/components/ui/Input";
import AccountEditForm, { EditForm, UserRole } from "./AccountEditForm";
import useModal from "@/hooks/useModal";
import FormPageLayout from "../../components/FormPageLayout";

interface PasswordConfirmForm {
  password: string;
}

export default function EditAccountFlow() {
  const [step, setStep] = useState<"confirm" | "edit">("confirm");
  const [serverError, setServerError] = useState("");
  const [editData, setEditData] = useState<EditForm | null>(null);
  const [userRole, setUserRole] = useState<UserRole>("child"); // 나중에 로그인 유저 정보로 변경
  const [nicknameError, setNicknameError] = useState("");

  const router = useRouter();

  const { open, handleOpenModal, handleCloseModal } = useModal();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset: resetPasswordForm,
  } = useForm<PasswordConfirmForm>();

  // mock fetch function
  const fetchEditData = async (): Promise<EditForm> => {
    return new Promise(resolve => {
      setTimeout(() => {
        if (userRole === "child") {
          resolve({ name: "홍길동", nickname: "홍홍홍", phone: "01012341234" });
        } else {
          resolve({ name: "가게주인", phone: "01098765432", businessNumber: "1234567890" });
        }
      }, 300);
    });
  };

  const handleModalConfirm = () => {
    handleCloseModal();
    setStep("confirm");
    setEditData(null);
    resetPasswordForm();
  };

  // 비밀번호 확인
  const onSubmitPassword = async (data: PasswordConfirmForm) => {
    setServerError("");
    if (data.password === "1234") {
      const fetchedData = await fetchEditData();
      setEditData(fetchedData);
      setStep("edit");
    } else {
      setServerError("비밀번호가 일치하지 않습니다.");
    }
  };

  // 회원 정보 수정
  const onSubmitEdit = async (data: EditForm) => {
    setNicknameError("");

    const isNicknameDuplicate = data.nickname === "홍홍홍"; // mock

    if (isNicknameDuplicate) {
      setNicknameError("이미 사용 중인 닉네임입니다.");
      return;
    }

    console.log("회원정보 수정 데이터:", data);
    handleOpenModal();
  };

  return (
    <div>
      {/* 비밀번호 확인 */}
      {step === "confirm" && (
        <>
          <FormPageLayout
            title={
              <>
                <p>회원정보를 안전하게 보호하기 위해</p>
                <p>비밀번호를 한 번 더 입력해주세요.</p>
              </>
            }
            onCancel={() => router.push("/mypage")}
            onSubmit={handleSubmit(onSubmitPassword)}
            modalOpen={false}
            modalMessage=""
            onModalConfirm={() => {}}
          >
            <Input label="이메일" id="email" placeholder="test@test.com" disabled />

            <Input
              label="비밀번호"
              id="password"
              type="password"
              placeholder="비밀번호를 입력해 주세요."
              isRequired
              register={register("password", { required: "비밀번호는 필수입니다." })}
              error={
                errors.password ||
                (serverError ? { type: "server", message: serverError } : undefined)
              }
            />
          </FormPageLayout>
        </>
      )}
      {step === "edit" && editData && (
        <FormPageLayout
          modalOpen={open}
          modalMessage="회원정보가 성공적으로 수정되었습니다."
          onModalConfirm={handleModalConfirm}
          showActions={false}
        >
          {editData && (
            <AccountEditForm
              defaultValues={editData}
              userRole={userRole}
              onSubmit={onSubmitEdit}
              serverNicknameError={nicknameError}
            />
          )}
        </FormPageLayout>
      )}
    </div>
  );
}
