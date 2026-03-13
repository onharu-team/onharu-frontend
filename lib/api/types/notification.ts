export type NotificationData = {
  notificationResponse: {
    loginId: string;
    isSystemEnabled: boolean;
  };
};

export type NotificationHistory = {
  id: number;
  type: string;
  title: string;
  message: string;
  relatedEntityType: string;
  relatedEntityId: number;
  isRead: boolean;
  createdAt: string;
};

export type NotificationHistoriesRes = {
  histories: NotificationHistory[];
  totalCount: number;
  currentPage: number;
  totalPages: number;
  perPage: number;
};
