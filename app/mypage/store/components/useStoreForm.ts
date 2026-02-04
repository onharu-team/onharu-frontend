"use client";

import { useState } from "react";
import { DAYS } from "@/app/mypage/sharing/create/constants/schedule";
import { CATEGORY_OPTIONS, TIME_OPTIONS } from "../constants";
import type { ImageFile, StoreInitialData } from "../types";

export function useStoreForm(initialData: StoreInitialData) {
  const [storeName, setStoreName] = useState(initialData.storeName);
  const [category, setCategory] = useState(initialData.category);
  const [content, setContent] = useState(initialData.content);
  const [phone, setPhone] = useState(initialData.phone);
  const [selectedDays, setSelectedDays] = useState<string[]>([...initialData.selectedDays]);
  const [openTime, setOpenTime] = useState(initialData.openTime);
  const [closeTime, setCloseTime] = useState(initialData.closeTime);
  const [tags, setTags] = useState(initialData.tags);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [initialFiles] = useState<ImageFile[]>([...initialData.files]);

  const toggleDay = (day: string) =>
    setSelectedDays(prev => (prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day]));

  const handleFilesChange = (files: File[]) => setUploadedFiles(files);

  const handleSubmit = () => {
    const payload = {
      storeName,
      category,
      content,
      phone,
      selectedDays,
      openTime,
      closeTime,
      tags,
      uploadedFiles,
    };
    console.log("가게 등록/수정 데이터:", payload);
  };

  const isValid =
    storeName.trim() &&
    category &&
    content.trim() &&
    phone.trim() &&
    (uploadedFiles.length > 0 || initialFiles.length > 0) &&
    selectedDays.length > 0 &&
    openTime &&
    closeTime;

  return {
    state: {
      storeName,
      category,
      content,
      phone,
      selectedDays,
      openTime,
      closeTime,
      tags,
      uploadedFiles,
      initialFiles,
    },
    actions: {
      setStoreName,
      setCategory,
      setContent,
      setPhone,
      setSelectedDays,
      setOpenTime,
      setCloseTime,
      setTags,
      handleFilesChange,
      toggleDay,
      handleSubmit,
    },
    computed: {
      isValid,
      CATEGORY_OPTIONS,
      TIME_OPTIONS,
      DAYS,
    },
  };
}
