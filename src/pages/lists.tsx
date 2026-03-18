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

interface List {
  id: string;
  name: string;
  description?: string;
  ownerId: string;
  members: string[];
  createdAt: Date;
}

export default function Lists(): JSX.Element {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'for-you' | 'following'>('for-you');
  const userId = user?.id as string;

  // Placeholder - would connect to Firebase in production
  const lists: List[] = [];
  const loading = false;

  return (
    <MainContainer>
      <SEO title='Lists / X' />
      <MainHeader title='Lists'>
        <button className='rounded-full p-2 hover:bg-light-primary/10 dark:hover:bg-dark-primary/10'>
          <HeroIcon className='h-6 w-6' iconName='Cog6ToothIcon' />
        </button>
      </MainHeader>

      <div className='border-b border-light-border dark:border-dark-border'>
        <div className='flex'>
          <button
            onClick={() => setActiveTab('for-you')}
            className={`flex-1 py-4 text-center font-bold transition-colors 
              ${activeTab === 'for-you' 
                ? 'border-b-4 border-main-accent text-main-accent' 
                : 'text-light-secondary hover:bg-light-primary/5 dark:text-dark-secondary dark:hover:bg-dark-primary/5'
              }`}
          >
            For you
          </button>
          <button
            onClick={() => setActiveTab('following')}
            className={`flex-1 py-4 text-center font-bold transition-colors 
              ${activeTab === 'following' 
                ? 'border-b-4 border-main-accent text-main-accent' 
                : 'text-light-secondary hover:bg-light-primary/5 dark:text-dark-secondary dark:hover:bg-dark-primary/5'
              }`}
          >
            Following
          </button>
        </div>
      </div>

      <section>
        {loading ? (
          <Loading className='mt-5' />
        ) : lists.length === 0 ? (
          <div className='flex flex-col items-center justify-center py-16 text-center'>
            <div className='mb-4 rounded-full bg-light-primary/5 p-4 dark:bg-dark-primary/5'>
              <HeroIcon className='h-12 w-12 text-light-secondary dark:text-dark-secondary' iconName='ListBulletIcon' />
            </div>
            <h2 className='text-xl font-bold'>Find lists</h2>
            <p className='mt-2 max-w-sm text-light-secondary dark:text-dark-secondary'>
              Explore lists that interest you or create your own to organize the people you follow.
            </p>
            <Button className='mt-6 bg-main-accent text-white hover:brightness-90'>
              Create a List
            </Button>
          </div>
        ) : (
          <div>
            {lists.map((list) => (
              <ListItem key={list.id} list={list} />
            ))}
          </div>
        )}
      </section>
    </MainContainer>
  );
}

function ListItem({ list }: { list: List }): JSX.Element {
  return (
    <Link href={`/lists/${list.id}`}>
      <a className='flex items-start gap-4 border-b border-light-border p-4 transition-colors hover:bg-light-primary/5 dark:border-dark-border dark:hover:bg-dark-primary/5'>
        <div className='flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-light-secondary dark:bg-dark-secondary'>
          <HeroIcon className='h-6 w-6 text-white' iconName='ListBulletIcon' />
        </div>
        <div className='flex-1 overflow-hidden'>
          <div className='flex items-center justify-between'>
            <span className='font-bold'>{list.name}</span>
            <span className='text-xs text-light-secondary dark:text-dark-secondary'>
              {list.members.length} members
            </span>
          </div>
          {list.description && (
            <p className='mt-1 truncate text-sm text-light-secondary dark:text-dark-secondary'>
              {list.description}
            </p>
          )}
        </div>
      </a>
    </Link>
  );
}

Lists.getLayout = (page: React.ReactElement): React.ReactNode => (
  <ProtectedLayout>
    <MainLayout>
      <HomeLayout>{page}</HomeLayout>
    </MainLayout>
  </ProtectedLayout>
);
