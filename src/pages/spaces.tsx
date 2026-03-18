import { useState } from 'react';
import { useAuth } from '@lib/context/auth-context';
import { HomeLayout, ProtectedLayout } from '@components/layout/common-layout';
import { MainLayout } from '@components/layout/main-layout';
import { SEO } from '@components/common/seo';
import { MainHeader } from '@components/home/main-header';
import { MainContainer } from '@components/home/main-container';
import { HeroIcon } from '@components/ui/hero-icon';
import { Loading } from '@components/ui/loading';
import { Button } from '@components/ui/button';

interface Space {
  id: string;
  title: string;
  hostId: string;
  hostName: string;
  hostAvatar: string;
  participants: number;
  listeners: number;
  isLive: boolean;
  scheduledFor?: Date;
  topic: string;
}

export default function Spaces(): JSX.Element {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'live' | 'scheduled' | 'listeners'>('live');

  // Placeholder - would connect to backend in production
  const liveSpaces: Space[] = [];
  const scheduledSpaces: Space[] = [];
  const loading = false;

  const displayedSpaces = activeTab === 'live' 
    ? liveSpaces 
    : activeTab === 'scheduled' 
      ? scheduledSpaces 
      : [];

  return (
    <MainContainer>
      <SEO title='Spaces / X' />
      <MainHeader title='Spaces'>
        <button className='rounded-full p-2 hover:bg-light-primary/10 dark:hover:bg-dark-primary/10'>
          <HeroIcon className='h-6 w-6' iconName='Cog6ToothIcon' />
        </button>
      </MainHeader>

      <div className='border-b border-light-border dark:border-dark-border'>
        <div className='flex'>
          <button
            onClick={() => setActiveTab('live')}
            className={`flex-1 py-4 text-center font-bold transition-colors 
              ${activeTab === 'live' 
                ? 'border-b-4 border-main-accent text-main-accent' 
                : 'text-light-secondary hover:bg-light-primary/5 dark:text-dark-secondary dark:hover:bg-dark-primary/5'
              }`}
          >
            Live
          </button>
          <button
            onClick={() => setActiveTab('scheduled')}
            className={`flex-1 py-4 text-center font-bold transition-colors 
              ${activeTab === 'scheduled' 
                ? 'border-b-4 border-main-accent text-main-accent' 
                : 'text-light-secondary hover:bg-light-primary/5 dark:text-dark-secondary dark:hover:bg-dark-primary/5'
              }`}
          >
            Scheduled
          </button>
          <button
            onClick={() => setActiveTab('listeners')}
            className={`flex-1 py-4 text-center font-bold transition-colors 
              ${activeTab === 'listeners' 
                ? 'border-b-4 border-main-accent text-main-accent' 
                : 'text-light-secondary hover:bg-light-primary/5 dark:text-dark-secondary dark:hover:bg-dark-primary/5'
              }`}
          >
            Your Listeners
          </button>
        </div>
      </div>

      <section>
        {loading ? (
          <Loading className='mt-5' />
        ) : displayedSpaces.length === 0 ? (
          <div className='flex flex-col items-center justify-center py-16 text-center'>
            <div className='mb-4 rounded-full bg-light-primary/5 p-4 dark:bg-dark-primary/5'>
              <HeroIcon className='h-12 w-12 text-light-secondary dark:text-dark-secondary' iconName='MicrophoneIcon' />
            </div>
            <h2 className='text-xl font-bold'>
              {activeTab === 'live' 
                ? 'Live Spaces' 
                : activeTab === 'scheduled'
                  ? 'Scheduled Spaces'
                  : 'Your Listeners'
              }
            </h2>
            <p className='mt-2 max-w-sm text-light-secondary dark:text-dark-secondary'>
              {activeTab === 'live'
                ? 'Listen to live conversations happening right now.'
                : activeTab === 'scheduled'
                  ? 'Spaces scheduled by people you follow will appear here.'
                  : 'People who have listened to your Spaces will appear here.'
              }
            </p>
            <Button className='mt-6 bg-main-accent text-white hover:brightness-90'>
              Start a Space
            </Button>
          </div>
        ) : (
          <div>
            {displayedSpaces.map((space) => (
              <SpaceCard key={space.id} space={space} />
            ))}
          </div>
        )}
      </section>
    </MainContainer>
  );
}

function SpaceCard({ space }: { space: Space }): JSX.Element {
  return (
    <div className='flex items-start gap-4 border-b border-light-border p-4 transition-colors hover:bg-light-primary/5 dark:border-dark-border dark:hover:bg-dark-primary/5'>
      <img
        src={space.hostAvatar || '/assets/twitter-avatar.jpg'}
        alt={space.hostName}
        className='h-12 w-12 rounded-full object-cover'
      />
      <div className='flex-1'>
        <div className='flex items-center gap-2'>
          <span className='font-bold'>{space.hostName}</span>
          <HeroIcon className='h-4 w-4 text-accent-blue' iconName='CheckBadgeIcon' solid />
        </div>
        <p className='mt-1 font-medium'>{space.title}</p>
        <div className='mt-2 flex items-center gap-4 text-sm text-light-secondary dark:text-dark-secondary'>
          <div className='flex items-center gap-1'>
            <HeroIcon className='h-4 w-4' iconName='MicrophoneIcon' solid />
            <span>{space.participants}</span>
          </div>
          <div className='flex items-center gap-1'>
            <HeroIcon className='h-4 w-4' iconName='UserGroupIcon' />
            <span>{space.listeners}</span>
          </div>
          {space.topic && (
            <span className='rounded-full bg-light-primary/10 px-2 py-0.5 text-xs dark:bg-dark-primary/10'>
              {space.topic}
            </span>
          )}
        </div>
      </div>
      <Button className='bg-main-accent text-white hover:brightness-90'>
        Listen
      </Button>
    </div>
  );
}

Spaces.getLayout = (page: React.ReactElement): React.ReactNode => (
  <ProtectedLayout>
    <MainLayout>
      <HomeLayout>{page}</HomeLayout>
    </MainLayout>
  </ProtectedLayout>
);
