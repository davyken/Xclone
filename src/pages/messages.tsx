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

interface Conversation {
  id: string;
  participants: string[];
  lastMessage?: {
    text: string;
    senderId: string;
    createdAt: Date;
  };
  createdAt: Date;
  updatedAt: Date;
}

export default function Messages(): JSX.Element {
  const { user } = useAuth();
  const [showNewMessage, setShowNewMessage] = useState(false);
  const userId = user?.id as string;

  // Placeholder - would connect to Firebase in production
  const conversations: Conversation[] = [];
  const loading = false;

  return (
    <MainContainer>
      <SEO title='Messages / X' />
      <MainHeader title='Messages'>
        <div className='flex items-center gap-2'>
          <button
            onClick={() => setShowNewMessage(!showNewMessage)}
            className='rounded-full p-2 hover:bg-light-primary/10 dark:hover:bg-dark-primary/10'
          >
            <HeroIcon className='h-6 w-6' iconName='EnvelopeIcon' solid={showNewMessage} />
          </button>
          <HeroIcon className='h-6 w-6' iconName='Cog6ToothIcon' />
        </div>
      </MainHeader>

      {showNewMessage && (
        <NewMessageSection onClose={() => setShowNewMessage(false)} />
      )}

      <section>
        {loading ? (
          <Loading className='mt-5' />
        ) : conversations.length === 0 ? (
          <div className='flex flex-col items-center justify-center py-16 text-center'>
            <div className='mb-4 rounded-full bg-light-primary/5 p-4 dark:bg-dark-primary/5'>
              <HeroIcon className='h-12 w-12 text-light-secondary dark:text-dark-secondary' iconName='PaperAirplaneIcon' />
            </div>
            <h2 className='text-xl font-bold'>Welcome to your Messages</h2>
            <p className='mt-2 max-w-sm text-light-secondary dark:text-dark-secondary'>
              Send private messages to other X users. Start a conversation by clicking the button below.
            </p>
            <Button
              className='mt-6 bg-main-accent text-white hover:brightness-90'
              onClick={() => setShowNewMessage(true)}
            >
              New Message
            </Button>
          </div>
        ) : (
          <div>
            {conversations.map((conversation) => (
              <ConversationItem key={conversation.id} conversation={conversation} currentUserId={userId} />
            ))}
          </div>
        )}
      </section>
    </MainContainer>
  );
}

function NewMessageSection({ onClose }: { onClose: () => void }): JSX.Element {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUser, setSelectedUser] = useState<string | null>(null);

  return (
    <div className='border-b border-light-border p-4 dark:border-dark-border'>
      <div className='flex items-center justify-between'>
        <h3 className='font-bold'>New Message</h3>
        <button
          onClick={onClose}
          className='rounded-full p-1 hover:bg-light-primary/10 dark:hover:bg-dark-primary/10'
        >
          <HeroIcon className='h-5 w-5' iconName='XMarkIcon' />
        </button>
      </div>
      <div className='mt-4'>
        <input
          type='text'
          placeholder='Search people...'
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className='w-full rounded-full bg-light-primary/5 px-4 py-2 outline-none dark:bg-dark-primary/5'
        />
      </div>
      <p className='mt-4 text-sm text-light-secondary dark:text-dark-secondary'>
        Select a user to start messaging
      </p>
    </div>
  );
}

function ConversationItem({ conversation, currentUserId }: { conversation: Conversation; currentUserId: string }): JSX.Element {
  const otherParticipantId = conversation.participants.find(id => id !== currentUserId);

  return (
    <Link href={`/messages/${conversation.id}`}>
      <a className='flex items-center gap-4 border-b border-light-border p-4 transition-colors hover:bg-light-primary/5 dark:border-dark-border dark:hover:bg-dark-primary/5'>
        <div className='flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-light-secondary dark:bg-dark-secondary'>
          <HeroIcon className='h-6 w-6 text-white' iconName='UserIcon' />
        </div>
        <div className='flex-1 overflow-hidden'>
          <div className='flex items-center justify-between'>
            <span className='font-bold truncate'>User Name</span>
            <span className='text-xs text-light-secondary dark:text-dark-secondary'>
              {conversation.lastMessage?.createdAt?.toLocaleDateString()}
            </span>
          </div>
          <p className='truncate text-sm text-light-secondary dark:text-dark-secondary'>
            {conversation.lastMessage?.text || 'No messages yet'}
          </p>
        </div>
      </a>
    </Link>
  );
}

Messages.getLayout = (page: React.ReactElement): React.ReactNode => (
  <ProtectedLayout>
    <MainLayout>
      <HomeLayout>{page}</HomeLayout>
    </MainLayout>
  </ProtectedLayout>
);
