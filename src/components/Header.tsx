import { useTubeStatuses } from '../hooks/useTubeStatuses.ts';
import { Button } from './atoms/Button.tsx';
import { Link } from './atoms/Link.tsx';
import { Logo } from './atoms/Logo';
import { Loader } from './Loader.tsx';

export default function Header() {
  const { lastUpdatedAt, isLoading, refetch } = useTubeStatuses();

  return (
    <header
      id="main-nav"
      className="fixed left-0 top-0 z-20 w-full bg-white px-4 text-tfl-ink shadow-xl md:px-6"
    >
      <div className="relative mx-auto box-border flex min-h-[64px] max-w-[1440px] items-center justify-between gap-3 py-2 md:min-h-[80px] md:py-4">
        <div className="flex items-center gap-3">
          <Link href="/" variant="subtle">
            <span className="inline-flex items-center gap-x-3 whitespace-nowrap">
              {isLoading ? (
                <Loader
                  text=""
                  size="md"
                  variant="simple"
                  className="inline-block shrink-0 align-middle"
                />
              ) : (
                <Logo aria-hidden="true" className="inline-block shrink-0 align-middle" />
              )}
              <h2 className="ml-[23px] mt-0.5 hidden align-middle text-lg font-400 leading-tight sm:inline-block">
                Track Stack
              </h2>
            </span>
          </Link>
        </div>

        <div className="flex items-center gap-3" aria-busy={isLoading ? 'true' : undefined}>
          <p
            className="whitespace-nowrap font-300"
            role="status"
            id="last-updated"
            aria-live="polite"
          >
            Last updated:{' '}
            {lastUpdatedAt ? (
              <time dateTime={lastUpdatedAt.toISOString()} title={lastUpdatedAt.toLocaleString()}>
                {lastUpdatedAt.toLocaleTimeString()}
              </time>
            ) : (
              <span>Never</span>
            )}
          </p>

          <Button
            variant="primary"
            size="sm"
            loading={isLoading}
            aria-label="Refresh statuses"
            aria-controls="last-updated"
            onClick={() => {
              refetch().then();
            }}
          >
            Refresh
          </Button>
        </div>
      </div>
    </header>
  );
}
