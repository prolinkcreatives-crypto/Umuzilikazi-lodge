import { Facebook, MapPin, Phone } from 'lucide-react';
import ShieldMark from '../ShieldMark';
import { lodgeInfo } from '../../design-system/tokens';

export default function Footer() {
  return (
    <footer className="bg-forest-green-deep text-ivory-white">
      <div className="mx-auto max-w-content px-margin-mobile md:px-gutter py-16 grid grid-cols-1 md:grid-cols-3 gap-12">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <ShieldMark className="h-9 w-auto text-ivory-white" />
            <span className="font-display text-lg">{lodgeInfo.name}</span>
          </div>
          <p className="text-body-md text-ivory-white/70 max-w-xs">{lodgeInfo.tagline}</p>
        </div>

        <div>
          <h3 className="label-caps text-warm-gold-bright mb-4">Visit</h3>
          <ul className="space-y-3 text-body-md text-ivory-white/80">
            <li className="flex gap-3">
              <MapPin size={18} className="shrink-0 mt-0.5 text-warm-gold-bright" />
              <span>{lodgeInfo.address}</span>
            </li>
            <li className="flex gap-3">
              <Phone size={18} className="shrink-0 mt-0.5 text-warm-gold-bright" />
              <a href={`tel:${lodgeInfo.phone.replace(/\s/g, '')}`} className="hover:text-ivory-white">
                {lodgeInfo.phone}
              </a>
            </li>
            <li className="text-ivory-white/60">{lodgeInfo.hours}</li>
          </ul>
        </div>

        <div>
          <h3 className="label-caps text-warm-gold-bright mb-4">Connect</h3>
          <div className="flex gap-4">
            <a
              href={lodgeInfo.facebook}
              target="_blank"
              rel="noreferrer"
              aria-label="Umuzilikazi Lodge on Facebook"
              className="h-11 w-11 rounded-full border border-ivory-white/20 flex items-center justify-center hover:bg-ivory-white/10 transition-colors"
            >
              <Facebook size={18} />
            </a>
            <a
              href={`https://wa.me/${lodgeInfo.whatsapp.replace('+', '')}`}
              target="_blank"
              rel="noreferrer"
              className="label-caps px-5 py-3 rounded border border-ivory-white/20 hover:bg-ivory-white/10 transition-colors"
            >
              WhatsApp Us
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-ivory-white/10">
        <div className="mx-auto max-w-content px-margin-mobile md:px-gutter py-6 flex flex-col md:flex-row items-center justify-between gap-3 text-label-sm text-ivory-white/50">
          <span>© {new Date().getFullYear()} {lodgeInfo.name}. All rights reserved.</span>
          <span>{lodgeInfo.footerCredit}</span>
        </div>
      </div>
    </footer>
  );
}
