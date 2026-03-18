import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@lib/context/auth-context';
import { HomeLayout, ProtectedLayout } from '@components/layout/common-layout';
import { MainLayout } from '@components/layout/main-layout';
import { SEO } from '@components/common/seo';
import { MainHeader } from '@components/home/main-header';
import { MainContainer } from '@components/home/main-container';
import { HeroIcon } from '@components/ui/hero-icon';
import { Loading } from '@components/ui/loading';
import { Button } from '@components/ui/button';

interface Community {
  id: string;
  name: string;
  description: string;
  bannerImage?: string;
  memberCount: number;
  isVerified: boolean;
}

export default function Communities(): JSX.Element {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'discover' | 'following'>('discover');
  const [searchQuery, setSearchQuery] = useState('');

  // Placeholder - would connect to Firebase in production
  const communities: Community[] = [];
  const loading = false;

  return (
    <MainContainer>
      <SEO title='Communities / X' />
      <MainHeader title='Communities' />

      <div className='border-b border-light-border dark:border-dark-border'>
        <div className='flex'>
          <button
            onClick={() => setActiveTab('discover')}
            className={`flex-1 py-4 text-center font-bold transition-colors 
              ${activeTab === 'discover' 
                ? 'border-b-4 border-main-accent text-main-accent' 
                : 'text-light-secondary hover:bg-light-primary/5 dark:text-dark-secondary dark:hover:bg-dark-primary/5'
              }`}
          >
            Discover
          </button>
          <button
            onClick={() => setActiveTab('following')}
            className={`flex-1 py-4 text-center font-bold transition-colors 
              ${activeTab === 'following' 
                ? 'border-b-4 border-main-accent text-main-accent' 
                : 'text-light-secondary hover:bg-light-primary/5 dark:text-dark-secondary dark:hover:bg-dark-primary/5'
              }`}
          >
            Your Communities
          </button>
        </div>
      </div>

      <div className='p-4'>
        <div className='relative'>
          <HeroIcon className='absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-light-secondary' iconName='MagnifyingGlassIcon' />
          <input
            type='text'
            placeholder='Search Communities'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className='w-full rounded-full bg-light-primary/5 py-2 pl-10 pr-4 outline-none dark:bg-dark-primary/5'
          />
        </div>
      </div>

      <section>
        {loading ? (
          <Loading className='mt-5' />
        ) : communities.length === 0 ? (
          <div className='flex flex-col items-center justify-center py-16 text-center'>
            <div className='mb-4 rounded-full bg-light-primary/5 p-4 dark:bg-dark-primary/5'>
              <HeroIcon className='h-12 w-12 text-light-secondary dark:text-dark-secondary' iconName='UsersIcon' />
            </div>
            <h2 className='text-xl font-bold'>Discover Communities</h2>
            <p className='mt-2 max-w-sm text-light-secondary dark:text-dark-secondary'>
              Find and join Communities that match your interests. Create your own to bring people together.
            </p>
            <Button className='mt-6 bg-main-accent text-white hover:brightness-90'>
              Create a Community
            </Button>
          </div>
        ) : (
          <div className='grid gap-4 p-4'>
            {communities.map((community) => (
              <CommunityCard key={community.id} community={community} />
            ))}
          </div>
        )}
      </section>
    </MainContainer>
  );
}

function CommunityCard({ community }: { community: Community }): JSX.Element {
  return (
    <Link href={`/communities/${community.id}`}>
      <a className='group block overflow-hidden rounded-2xl border border-light-border transition-colors hover:bg-light-primary/5 dark:border-dark-border dark:hover:bg-dark-primary/5'>
        {community.bannerImage && (
          <div className='h-24 w-full bg-cover bg-center' style={{ backgroundImage: `url(${community.bannerImage})` }} />
        )}
        <div className='p-4'>
          <div className='flex items-center gap-2'>
            <div className='flex h-12 w-12 items-center justify-center rounded-full bg-main-accent'>
              <HeroIcon className='h-6 w-6 text-white' iconName='UsersIcon' />
            </div>
            <div>
              <div className='flex items-center gap-1'>
                <span className='font-bold'>{community.name}</span>
                {community.isVerified && (
                  <HeroIcon className='h-4 w-4 text-accent-blue' iconName='CheckBadgeIcon' solid />
                )}
              </div>
              <span className='text-sm text-light-secondary dark:text-dark-secondary'>
                {community.memberCount.toLocaleString()} members
              </span>
            </div>
          </div>
          {community.description && (
            <p className='mt-3 text-sm text-light-secondary dark:text-dark-secondary'>
              {community.description}
            </p>
          )}
          <Button className='mt-4 w-full bg-white text-black hover:bg-light-primary/10 dark:bg-white dark:text-black'>
            Join
          </Button>
        </div>
      </a>
    </Link>
  );
}

Communities.getLayout = (page: React.ReactElement): React.ReactNode => (
  <ProtectedLayout>
    <MainLayout>
      <HomeLayout>{page}</HomeLayout>
    </MainLayout>
  </ProtectedLayout>
);
