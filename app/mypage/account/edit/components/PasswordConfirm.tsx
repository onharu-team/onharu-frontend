"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Input from "@/components/ui/Input";
import AccountEditForm, { EditForm } from "./AccountEditForm";
import useModal from "@/hooks/ui/useModal";
import FormPageLayout from "../../components/FormPageLayout";
import {
  ChildData,
  OwnerData,
  UpdateChildProfileReq,
  UpdateOwnerProfileReq,
} from "@/lib/api/types/auth";
import { useValidatePassword } from "@/hooks/useValidatePw";
import { useEditProfile } from "@/hooks/useEditProfile";
import { useAuthProfile } from "@/hooks/useAuth";

interface PasswordConfirmForm {
  password: string;
}

export default function EditAccountFlow() {
  const [step, setStep] = useState<"confirm" | "edit">("confirm");
  const [serverError, setServerError] = useState("");
  const [editData, setEditData] = useState<EditForm | null>(null);
  const [nicknameError, setNicknameError] = useState("");

  const router = useRouter();
  const { open, handleOpenModal, handleCloseModal } = useModal();

  const { data: profileData, refetch: refetchProfile } = useAuthProfile();
  const userType = !!profileData ? profileData.userType : "CHILD";

  const { mutate: validatePassword } = useValidatePassword();
  const { mutate: editProfile } = useEditProfile(userType || "CHILD");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset: resetPasswordForm,
  } = useForm<PasswordConfirmForm>();

  const fetchEditData = (): EditForm | null => {
    if (!profileData || !userType) return null;

    if (userType === "CHILD" && "nickname" in profileData) {
      const childProfile = profileData as unknown as ChildData;
      return {
        loginId: childProfile.loginId,
        name: childProfile.name,
        nickname: childProfile.nickname,
        phone: childProfile.phone,
      };
    }

    if (userType === "OWNER" && "businessNumber" in profileData) {
      const ownerProfile = profileData as unknown as OwnerData;
      return {
        loginId: ownerProfile.loginId,
        name: ownerProfile.name,
        phone: ownerProfile.phone,
        businessNumber: ownerProfile.businessNumber,
      };
    }

    return null;
  };

  // 비밀번호 확인
  const onSubmitPassword = (data: PasswordConfirmForm) => {
    setServerError("");

    validatePassword(
      { password: data.password },
      {
        onSuccess: () => {
          const fetchedData = fetchEditData();
          if (!fetchedData) return;
          setEditData(fetchedData);
          setStep("edit");
        },
        onError: () => {
          setServerError("비밀번호가 일치하지 않습니다.");
        },
      }
    );
  };

  // 회원 정보 수정
  const onSubmitEdit = (data: EditForm) => {
    if (!userType) return;

    setNicknameError("");

    if (userType === "CHILD") {
      const requestData: UpdateChildProfileReq = {
        name: data.name,
        phone: data.phone,
        nickname: data.nickname ?? "",
      };

      editProfile(requestData, {
        onSuccess: handleOpenModal,
        onError: console.error,
      });
      return;
    }

    if (userType === "OWNER" && data.businessNumber) {
      const requestData: UpdateOwnerProfileReq = {
        name: data.name,
        phone: data.phone,
        businessNumber: data.businessNumber,
      };

      editProfile(requestData, {
        onSuccess: handleOpenModal,
        onError: console.error,
      });
    }
  };

  const handleModalConfirm = async () => {
    handleCloseModal();
    setStep("confirm");
    setEditData(null);
    resetPasswordForm();

    await refetchProfile();
  };

  return (
    <div>
      {step === "confirm" && (
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
          <Input label="이메일" id="email" placeholder={profileData?.loginId} disabled />

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
      )}

      {step === "edit" && editData && userType && (
        <FormPageLayout
          modalOpen={open}
          modalMessage="회원정보가 성공적으로 수정되었습니다."
          onModalConfirm={handleModalConfirm}
          showActions={false}
        >
          <AccountEditForm
            defaultValues={editData}
            userType={userType}
            onSubmit={onSubmitEdit}
            serverNicknameError={nicknameError}
          />
        </FormPageLayout>
      )}
    </div>
  );
}
