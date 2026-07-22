import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="section">
      <div className="container-page flex min-h-[50vh] flex-col items-center justify-center text-center">
        <p className="eyebrow">Lost the thread</p>
        <h1 className="mt-3 font-display text-5xl sm:text-6xl">Page not found</h1>
        <p className="mt-4 max-w-md text-espresso-600">
          The page you’re after has moved or never existed. Let’s get you back to something
          delicious.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/" className="btn-primary">
            Back home
          </Link>
          <Link href="/menu" className="btn-ghost">
            View the menu
          </Link>
        </div>
      </div>
    </section>
  );
}
