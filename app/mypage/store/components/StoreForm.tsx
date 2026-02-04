"use client";

import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/TextArea";
import Select from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import { Section } from "../../sharing/create/components/Section";
import { SelectButton } from "../../sharing/create/components/SelectButton";
import DocumentUploadField from "@/components/feature/DocumentUploadField";
import { useStoreForm } from "./useStoreForm";
import type { StoreInitialData } from "../types";

type StoreFormProps = {
  initialData: StoreInitialData;
};

export default function StoreForm({ initialData }: StoreFormProps) {
  const {
    state: {
      storeName,
      category,
      content,
      phone,
      selectedDays,
      openTime,
      closeTime,
      tags,
      initialFiles,
    },
    actions: {
      setStoreName,
      setCategory,
      setContent,
      setPhone,
      toggleDay,
      setOpenTime,
      setCloseTime,
      setTags,
      handleFilesChange,
      handleSubmit,
    },
    computed: { isValid, CATEGORY_OPTIONS, TIME_OPTIONS, DAYS },
  } = useStoreForm(initialData);

  return (
    <div className="mx-auto flex max-w-125 flex-col gap-2 sm:gap-5">
      {/* 상호명 */}
      <Input
        label="상호명"
        id="storeName"
        value={storeName}
        placeholder="매장명을 입력해 주세요."
        onChange={e => setStoreName(e.target.value)}
        isRequired
      />

      {/* 카테고리 */}
      <div className="flex w-full flex-col">
        <label className="sm:text-md text-base font-medium">
          카테고리<span className="text-danger ml-1">*</span>
        </label>
        <Select
          value={category}
          options={CATEGORY_OPTIONS}
          onChange={value => setCategory(String(value))}
          placeholder="카테고리를 선택해 주세요"
          className="mt-2"
        />
      </div>

      {/* 가게 소개 */}
      <div className="sm:text-md flex flex-col text-base font-medium">
        <label>
          가게 소개<span className="text-danger ml-1">*</span>
        </label>
        <Textarea
          className="mt-2 w-full"
          name="content"
          value={content}
          onChange={e => setContent(e.target.value)}
          placeholder="가게 소개를 입력해 주세요."
          maxLength={500}
        />
      </div>

      {/* 전화번호 */}
      <Input
        label="전화번호"
        id="phone"
        type="tel"
        value={phone}
        onChange={e => setPhone(e.target.value.replace(/[^0-9]/g, ""))}
        placeholder="연락 가능한 매장 번호를 숫자만 입력해 주세요."
        isRequired
      />

      {/* 매장 사진 */}
      <div className="sm:text-md flex flex-col text-base font-medium">
        <label>
          매장 사진<span className="text-danger ml-1">*</span>
        </label>
        <p className="text-text-secondary mt-1.25 mb-2.5 text-sm">
          최소 1장의 매장 사진을 올려주세요.
        </p>
        <DocumentUploadField onFilesChange={handleFilesChange} initialFiles={initialFiles} />
      </div>

      {/* 운영 시간 */}
      <Section title="운영 시간" isRequired>
        <div className="flex flex-wrap gap-2">
          {DAYS.map((day: string) => (
            <SelectButton
              key={day}
              label={day}
              selected={selectedDays.includes(day)}
              onClick={() => toggleDay(day)}
            />
          ))}
        </div>
      </Section>

      <hr />

      {/* 오픈/마감 시간 */}
      <div className="flex gap-3 sm:gap-6.25">
        <div className="sm:text-md flex flex-1 flex-col text-base font-medium">
          <label>
            오픈 시간<span className="text-danger ml-1">*</span>
          </label>
          <Select
            value={openTime}
            options={TIME_OPTIONS}
            onChange={value => setOpenTime(String(value))}
            placeholder="오픈 시간"
            className="mt-2.5 max-w-60"
          />
        </div>
        <div className="sm:text-md flex flex-1 flex-col text-base font-medium">
          <label>
            마감 시간<span className="text-danger ml-1">*</span>
          </label>
          <Select
            value={closeTime}
            options={TIME_OPTIONS}
            onChange={value => setCloseTime(String(value))}
            placeholder="마감 시간"
            className="mt-2.5 max-w-60"
          />
        </div>
      </div>

      {/* 태그 */}
      <Input
        label="태그"
        id="tags"
        value={tags}
        onChange={e => setTags(e.target.value)}
        placeholder="쉼표(,)로 여러 태그를 입력해 주세요. 예: 카페, 빵"
      />

      {/* 등록 버튼 */}
      <div className="mt-7.5 sm:mt-12.5">
        <Button
          varient="default"
          width="lg"
          height="md"
          fontSize="md"
          onClick={handleSubmit}
          disabled={!isValid}
        >
          등록하기
        </Button>
      </div>
    </div>
  );
}
