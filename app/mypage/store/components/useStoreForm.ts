"use client";

import { useState } from "react";
import { CATEGORY_MAP, DAY_MAP, DAYS } from "@/app/mypage/sharing/create/constants/schedule";
import { CATEGORY_OPTIONS, TIME_OPTIONS } from "../constants";
import type { StoreInitialData } from "../types";
import { DisplayFile } from "@/components/feature/DocumentUploadField";
import { createStore, updateStore } from "@/lib/stores";
import { CreateStoreReq, UpdateStoreReq } from "@/lib/api/types/stores";
import { useUploadImage } from "@/hooks/useUploadImage";
import { useQueryClient } from "@tanstack/react-query";

const reverseDayMap = Object.fromEntries(Object.entries(DAY_MAP).map(([k, v]) => [v, k]));

function convertSelectedDays(days?: string | string[]) {
  if (!days) return [];

  if (Array.isArray(days)) {
    return days.map(d => reverseDayMap[d]);
  }

  return [reverseDayMap[days]];
}

function createInitialDocuments(files?: string[]): DisplayFile[] {
  if (!files) return [];

  return files.map((url, index) => ({
    id: index,
    name: `existing-${index}`,
    url,
    isExisting: true as const,
  }));
}

function buildBusinessHours(selectedDays: string[], openTime: string, closeTime: string) {
  return selectedDays.map(day => ({
    businessDay: DAY_MAP[day],
    openTime,
    closeTime,
  }));
}

export function useStoreForm(initialData: StoreInitialData, storeId?: string) {
  const queryClient = useQueryClient();
  
  const { mutateAsync: uploadImage } = useUploadImage();

  const [selectedDays, setSelectedDays] = useState<string[]>(
    convertSelectedDays(initialData.selectedDays)
  );

  const [storeName, setStoreName] = useState(initialData.storeName || "");
  const [category, setCategory] = useState(initialData.category || "");
  const [intro, setIntro] = useState(initialData.intro || "");
  const [content, setContent] = useState(initialData.content || "");
  const [phone, setPhone] = useState(initialData.phone || "");

  const [openTime, setOpenTime] = useState(
    initialData.openTime ? initialData.openTime.slice(0, 5) : ""
  );

  const [closeTime, setCloseTime] = useState(
    initialData.closeTime ? initialData.closeTime.slice(0, 5) : ""
  );

  const [tags, setTags] = useState(initialData.tags || []);

  const [initialFiles] = useState<string[]>([...(initialData.files || [])]);

  const [allDocuments, setAllDocuments] = useState<DisplayFile[]>(
    createInitialDocuments(initialData.files)
  );

  const [address, setAddress] = useState(initialData?.address ?? "");
  const [lat, setLat] = useState<string>(initialData?.lat ?? "");
  const [lng, setLng] = useState<string>(initialData?.lng ?? "");

  const toggleDay = (day: string) =>
    setSelectedDays(prev => (prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day]));

  const handleFilesChange = (files: DisplayFile[]) => {
    setAllDocuments(files);
  };

  const uploadNewImages = async (docs: DisplayFile[]) => {
    const newImages = docs.filter(file => !file.isExisting && file.file);

    return Promise.all(
      newImages.map(async file => {
        const uploadedUrl = await uploadImage(file.file as File);

        return {
          fileKey: uploadedUrl.split("/onharu-minio/")[1],
          filePath: uploadedUrl,
        };
      })
    );
  };

  const buildImages = async () => {
    const existingImages = allDocuments.filter(file => file.isExisting);

    const uploadedImages = await uploadNewImages(allDocuments);

    return [
      ...existingImages.map((img, index) => ({
        fileKey: img.url.split("/onharu-minio/")[1],
        filePath: img.url,
        displayOrder: index,
      })),
      ...uploadedImages.map((img, index) => ({
        fileKey: img.filePath.split("/onharu-minio/")[1],
        filePath: img.filePath,
        displayOrder: existingImages.length + index,
      })),
    ];
  };

  const handleSubmit = async () => {
    const categoryId = CATEGORY_MAP[category];

    let images;

    try {
      images = await buildImages();
    } catch (error) {
      console.error(error);
      return;
    }

    const businessHours = buildBusinessHours(selectedDays, openTime, closeTime);

    if (storeId) {
      const updateBody: UpdateStoreReq = {
        categoryId,
        address,
        phone,
        lat,
        lng,
        introduction: content,
        intro,
        isOpen: true,
        isSharing: true,
        tagNames: tags,
        businessHours,
        images,
      };

      await updateStore(storeId, updateBody);
      return;
    }

    const createBody: CreateStoreReq = {
      categoryId,
      name: storeName,
      address,
      phone,
      lat,
      lng,
      introduction: content,
      intro,
      tagNames: tags,
      businessHours,
      images,
    };

    await createStore(createBody);

    await queryClient.invalidateQueries({ queryKey: ["auth"] });

  };

  const isValid =
    storeName.trim() &&
    category &&
    intro.trim() &&
    content.trim() &&
    phone.trim() &&
    allDocuments.length > 0 &&
    selectedDays.length > 0 &&
    openTime &&
    closeTime &&
    tags.length > 0 &&
    address &&
    lat &&
    lng;

  return {
    state: {
      storeName,
      category,
      intro,
      content,
      phone,
      selectedDays,
      openTime,
      closeTime,
      tags,
      initialFiles,
      address,
      lat,
      lng,
    },
    actions: {
      setStoreName,
      setCategory,
      setIntro,
      setContent,
      setPhone,
      setSelectedDays,
      setOpenTime,
      setCloseTime,
      setTags,
      handleFilesChange,
      toggleDay,
      handleSubmit,
      setAddress,
      setLat,
      setLng,
    },
    computed: {
      isValid,
      CATEGORY_OPTIONS,
      TIME_OPTIONS,
      DAYS,
    },
  };
}
