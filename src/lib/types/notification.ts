import {
  FirestoreDataConverter,
  QueryDocumentSnapshot,
  SnapshotOptions
} from 'firebase/firestore';

export type NotificationType = 'like' | 'retweet' | 'reply' | 'follow' | 'mention';

export interface Notification {
  id: string;
  type: NotificationType;
  fromUserId: string;
  fromUsername: string;
  fromUserName: string;
  fromUserAvatar: string;
  tweetId?: string;
  createdAt: Date;
}

export const notificationConverter: FirestoreDataConverter<Notification> = {
  toFirestore(notification: Notification): Record<string, unknown> {
    return {
      ...notification,
      createdAt: notification.createdAt
    };
  },
  fromFirestore(
    snapshot: QueryDocumentSnapshot,
    options?: SnapshotOptions
  ): Notification {
    const data = snapshot.data(options);
    return {
      id: snapshot.id,
      type: data.type,
      fromUserId: data.fromUserId,
      fromUsername: data.fromUsername,
      fromUserName: data.fromUserName,
      fromUserAvatar: data.fromUserAvatar,
      tweetId: data.tweetId,
      createdAt: data.createdAt?.toDate() ?? new Date()
    };
  }
};
