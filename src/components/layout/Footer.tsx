import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="w-full px-margin-mobile md:px-margin-desktop py-10 flex flex-col md:flex-row items-center justify-between gap-6 bg-surface border-t border-outline-variant/20 mt-auto">
      <div className="flex items-center gap-2 text-primary">
        <img src="/logo.svg" alt="Proplity Logo" className="h-10 w-auto" />
      </div>
      <div className="flex flex-wrap justify-center gap-6 font-label-sm text-label-sm">
        <Link className="text-on-surface-variant hover:text-primary transition-colors" href="#">Privacy Policy</Link>
        <Link className="text-on-surface-variant hover:text-primary transition-colors" href="#">Terms of Service</Link>
      </div>
      <p className="font-body-md text-body-md text-on-surface-variant text-sm text-center md:text-left">
        &copy; {new Date().getFullYear()} Proplity. Look before you Leap.
      </p>
    </footer>
  );
}
