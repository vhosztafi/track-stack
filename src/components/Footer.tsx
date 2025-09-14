import { Link } from './atoms/Link';

export default function Footer() {
  return (
    <footer
      id="footer"
      role="contentinfo"
      className="border-t border-t-tfl-border bg-white text-tfl-ink"
    >
      <div className="mx-auto grid max-w-[1440px] grid-cols-1 gap-8 px-4 py-10 sm:grid-cols-2 md:px-6 lg:grid-cols-4 lg:px-0">
        <section>
          <h2 className="font-lg mb-3 text-base font-400">Attributions</h2>
          <p className="text-[1rem] font-300 leading-6">
            Inspired by{' '}
            <Link
              href="https://tfl.gov.uk/status/tube"
              variant="subtle"
              external={true}
              newTab={true}
            >
              TfL Tube status design.
            </Link>{' '}
            Visual style approximated for demo purposes.
          </p>
        </section>
        <section>
          <h2 className="font-lg mb-3 text-base font-400">Data &amp; accuracy</h2>
          <p className="text-[1rem] font-300 leading-6">
            Statuses may be mocked for development and not reflect live conditions.
          </p>
        </section>
        <section>
          <h2 className="font-lg mb-3 text-base font-400">Credits</h2>
          <p className="text-[1rem] font-300 leading-6">
            Transport for London, Mayor of London, and GLA brand elements acknowledged for
            reference.
          </p>
        </section>
        <section>
          <h2 className="font-lg mb-3 text-base font-400">Affiliation</h2>
          <p className="text-[1rem] font-300 leading-6">
            TrackStack is an independent demo and not affiliated with TfL.
          </p>
        </section>
      </div>

      <div className="bg-tfl-ink text-white">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-4 px-4 py-6 sm:flex-row sm:items-center sm:justify-between md:px-6">
          <p className="text-lg font-300">
            Data source:{' '}
            <Link
              href="https://api.tfl.gov.uk/"
              variant="subtle"
              external={true}
              newTab={true}
              role="link"
            >
              TfL Unified API <span className="sr-only">(opens in a new tab)</span>
            </Link>
          </p>
          <p className="text-lg font-300">
            &copy; TfL and related marks are the property of Transport for London.
          </p>
        </div>
      </div>
    </footer>
  );
}
