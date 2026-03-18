import { useState } from 'react';
import { useAuth } from '@lib/context/auth-context';
import { notificationsCollection } from '@lib/firebase/collections';
import { query, orderBy } from 'firebase/firestore';
import { HomeLayout, ProtectedLayout } from '@components/layout/common-layout';
import { MainLayout } from '@components/layout/main-layout';
import { SEO } from '@components/common/seo';
import { MainHeader } from '@components/home/main-header';
import { MainContainer } from '@components/home/main-container';
import { HeroIcon } from '@components/ui/hero-icon';
import { Loading } from '@components/ui/loading';
import { StatsEmpty } from '@components/tweet/stats-empty';

type NotificationType = 'like' | 'retweet' | 'reply' | 'follow' | 'mention';

interface NotificationItem {
  id: string;
  type: NotificationType;
  fromUserId: string;
  fromUsername: string;
  fromUserName: string;
  fromUserAvatar: string;
  tweetId?: string;
  createdAt: Date;
}

export default function Notifications(): JSX.Element {
  const { user } = useAuth();
  const [filter, setFilter] = useState<NotificationType | 'all'>('all');

  const userId = user?.id as string;

  // Placeholder for now - in production this would use useCollection hook
  const loading = false;
  const notifications: NotificationItem[] = [];

  const filteredNotifications = filter === 'all' 
    ? notifications 
    : notifications?.filter((n) => n.type === filter);

  const filters: { label: string; value: NotificationType | 'all' }[] = [
    { label: 'All', value: 'all' },
    { label: 'Mentions', value: 'mention' },
    { label: 'Replies', value: 'reply' },
    { label: 'Likes', value: 'like' },
    { label: 'Retweets', value: 'retweet' },
    { label: 'Follows', value: 'follow' }
  ];

  return (
    <MainContainer>
      <SEO title='Notifications / X' />
      <MainHeader title='Notifications'>
        <div className='flex gap-1'>
          {filters.map(({ label, value }) => (
            <button
              key={value}
              onClick={() => setFilter(value)}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors
                ${filter === value 
                  ? 'bg-main-accent text-white' 
                  : 'hover:bg-light-primary/10 dark:hover:bg-dark-primary/10'
                }`}
            >
              {label}
            </button>
          ))}
        </div>
      </MainHeader>
      <section>
        {loading ? (
          <Loading className='mt-5' />
        ) : !filteredNotifications || filteredNotifications.length === 0 ? (
          <StatsEmpty
            title='Nothing to see here'
            description='When someone interacts with your Tweets, you’ll see it here.'
            imageData={{ src: '/assets/no-notifications.png', alt: 'No notifications' }}
          />
        ) : (
          <div>
            {filteredNotifications?.map((notification) => (
              <NotificationRow key={notification.id} notification={notification} />
            ))}
          </div>
        )}
      </section>
    </MainContainer>
  );
}

function NotificationRow({ notification }: { notification: NotificationItem }): JSX.Element {
  const iconMap: Record<NotificationType, { icon: JSX.Element; color: string }> = {
    like: { 
      icon: <HeroIcon className='h-4 w-4' iconName='HeartIcon' solid />, 
      color: 'text-accent-red' 
    },
    retweet: { 
      icon: <HeroIcon className='h-4 w-4' iconName='ArrowPathIcon' solid />, 
      color: 'text-accent-green' 
    },
    reply: { 
      icon: <HeroIcon className='h-4 w-4' iconName='ChatBubbleLeftIcon' solid />, 
      color: 'text-accent-blue' 
    },
    follow: { 
      icon: <HeroIcon className='h-4 w-4' iconName='UserPlusIcon' solid />, 
      color: 'text-accent-blue' 
    },
    mention: { 
      icon: <HeroIcon className='h-4 w-4' iconName='AtSymbolIcon' solid />, 
      color: 'text-accent-blue' 
    }
  };

  const { icon, color } = iconMap[notification.type];

  const actionText: Record<NotificationType, string> = {
    like: 'liked your Tweet',
    retweet: 'retweeted your Tweet',
    reply: 'replied to your Tweet',
    follow: 'followed you',
    mention: 'mentioned you in a Tweet'
  };

  return (
    <a
      href={`/user/${notification.fromUsername}`}
      className='flex items-start gap-4 border-b border-light-border p-4 transition-colors 
                 hover:bg-light-primary/5 dark:border-dark-border dark:hover:bg-dark-primary/5'
    >
      <div className={`mt-1 ${color}`}>
        {icon}
      </div>
      <div className='flex-1'>
        <div className='flex items-center gap-2'>
          <img
            src={notification.fromUserAvatar || '/assets/twitter-avatar.jpg'}
            alt={notification.fromUsername}
            className='h-10 w-10 rounded-full bg-light-secondary object-cover'
          />
          <div>
            <span className='font-bold'>{notification.fromUserName}</span>
            <span className='ml-1 text-light-secondary dark:text-dark-secondary'>
              @{notification.fromUsername}
            </span>
            <span className='ml-1 text-light-secondary dark:text-dark-secondary'>
              · {actionText[notification.type]}
            </span>
          </div>
        </div>
      </div>
      {notification.tweetId && (
        <div className='mt-2 rounded-2xl border border-light-border p-3 dark:border-dark-border'>
          <p className='text-sm text-light-secondary dark:text-dark-secondary'>
            View Tweet
          </p>
        </div>
      )}
    </a>
  );
}

Notifications.getLayout = (page: React.ReactElement): React.ReactNode => (
  <ProtectedLayout>
    <MainLayout>
      <HomeLayout>{page}</HomeLayout>
    </MainLayout>
  </ProtectedLayout>
);
