import { Link } from "react-router-dom";
import { t } from "@/lib/i18n";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArrowLeft } from "lucide-react";

export default function PrivacyPage({ locale, setLocale }) {
  return (
    <div className="min-h-screen bg-[#080808]" data-testid="privacy-page">
      <Header locale={locale} setLocale={setLocale} />

      <section className="relative pt-32 pb-12">
        <div className="absolute inset-0 bg-gradient-to-b from-[#c9a84c]/[0.03] to-transparent" />
        <div className="relative max-w-4xl mx-auto px-6">
          <Link to="/" className="inline-flex items-center gap-2 text-[#c9a84c]/60 hover:text-[#c9a84c] text-sm mb-8 transition-colors" data-testid="back-home">
            <ArrowLeft className="w-4 h-4" /> Home
          </Link>
          <h1 className="text-4xl sm:text-5xl font-serif text-white font-bold">{t(locale, "privacy_title")}</h1>
          <p className="text-white/30 text-sm mt-3">{t(locale, "privacy_last_update")}: 7 Febbraio 2026</p>
        </div>
      </section>

      <section className="py-12 bg-[#0a0a0a]">
        <div className="max-w-4xl mx-auto px-6 prose-invert">
          <div className="space-y-10 text-white/50 text-sm leading-relaxed">

            <div>
              <h2 className="text-white font-serif text-xl font-bold mb-4">1. Titolare del Trattamento</h2>
              <p>Il Titolare del trattamento dei dati personali e <strong className="text-white/70">Mauro Ferrante Consulting Studio</strong>, con sede operativa internazionale. Per qualsiasi comunicazione relativa al trattamento dei dati personali, e possibile contattare il Titolare all'indirizzo email: <a href="mailto:mauro@mauroferranteconsulting.com" className="text-[#c9a84c] hover:underline">mauro@mauroferranteconsulting.com</a>.</p>
            </div>

            <div>
              <h2 className="text-white font-serif text-xl font-bold mb-4">2. Tipologie di Dati Raccolti</h2>
              <p>I dati personali raccolti dal Sito, sia in modo autonomo che tramite terze parti, includono:</p>
              <ul className="list-disc pl-6 mt-3 space-y-2">
                <li><strong className="text-white/60">Dati di navigazione:</strong> Cookie tecnici, indirizzo IP, tipo di browser, sistema operativo, pagine visitate, tempo di permanenza e dati di interazione con il sito.</li>
                <li><strong className="text-white/60">Dati forniti volontariamente:</strong> Nome, cognome, indirizzo email, numero di telefono e qualsiasi altra informazione fornita tramite il modulo di contatto.</li>
                <li><strong className="text-white/60">Dati di terze parti:</strong> Informazioni provenienti da servizi di analytics (es. Google Analytics), piattaforme social (LinkedIn, Instagram, Facebook) e servizi di comunicazione (WhatsApp).</li>
              </ul>
            </div>

            <div>
              <h2 className="text-white font-serif text-xl font-bold mb-4">3. Finalita del Trattamento</h2>
              <p>I dati personali sono trattati per le seguenti finalita:</p>
              <ul className="list-disc pl-6 mt-3 space-y-2">
                <li><strong className="text-white/60">Risposta alle richieste di contatto:</strong> Gestione delle comunicazioni ricevute tramite il modulo di contatto, email o WhatsApp.</li>
                <li><strong className="text-white/60">Erogazione dei servizi:</strong> Fornitura dei servizi di consulenza in project management, digital marketing e real estate.</li>
                <li><strong className="text-white/60">Analisi e miglioramento del sito:</strong> Monitoraggio delle performance del sito, analisi del traffico e ottimizzazione dell'esperienza utente.</li>
                <li><strong className="text-white/60">Marketing diretto:</strong> Previo consenso, invio di comunicazioni commerciali, newsletter e aggiornamenti sui servizi offerti.</li>
                <li><strong className="text-white/60">Obblighi legali:</strong> Adempimento di obblighi di legge, regolamenti o normative vigenti.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-white font-serif text-xl font-bold mb-4">4. Base Giuridica del Trattamento</h2>
              <p>Il trattamento dei dati personali si basa sulle seguenti basi giuridiche ai sensi del Regolamento (UE) 2016/679 (GDPR):</p>
              <ul className="list-disc pl-6 mt-3 space-y-2">
                <li><strong className="text-white/60">Consenso (Art. 6.1.a):</strong> Per l'invio di comunicazioni di marketing e l'installazione di cookie non tecnici.</li>
                <li><strong className="text-white/60">Esecuzione di un contratto (Art. 6.1.b):</strong> Per la fornitura dei servizi richiesti.</li>
                <li><strong className="text-white/60">Legittimo interesse (Art. 6.1.f):</strong> Per l'analisi e il miglioramento del sito web e la prevenzione di frodi.</li>
                <li><strong className="text-white/60">Obbligo legale (Art. 6.1.c):</strong> Per l'adempimento di obblighi fiscali e legali.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-white font-serif text-xl font-bold mb-4">5. Cookie e Tecnologie di Tracciamento</h2>
              <p>Il Sito utilizza le seguenti tipologie di cookie:</p>
              <ul className="list-disc pl-6 mt-3 space-y-2">
                <li><strong className="text-white/60">Cookie tecnici:</strong> Necessari per il funzionamento del sito (navigazione, preferenze di lingua). Non richiedono consenso.</li>
                <li><strong className="text-white/60">Cookie analitici:</strong> Utilizzati per raccogliere statistiche aggregate sull'utilizzo del sito (es. Google Analytics). Richiedono il consenso dell'utente.</li>
                <li><strong className="text-white/60">Cookie di terze parti:</strong> Cookie installati da servizi esterni integrati nel sito (LinkedIn, Facebook, Instagram, WhatsApp).</li>
              </ul>
              <p className="mt-3">L'utente puo gestire le preferenze sui cookie attraverso il banner di consenso presente sul sito o tramite le impostazioni del proprio browser.</p>
            </div>

            <div>
              <h2 className="text-white font-serif text-xl font-bold mb-4">6. Periodo di Conservazione</h2>
              <p>I dati personali saranno conservati per il tempo strettamente necessario al raggiungimento delle finalita per cui sono stati raccolti:</p>
              <ul className="list-disc pl-6 mt-3 space-y-2">
                <li><strong className="text-white/60">Dati di contatto:</strong> 24 mesi dall'ultima interazione, salvo diversa richiesta dell'interessato.</li>
                <li><strong className="text-white/60">Dati contrattuali:</strong> Per la durata del rapporto contrattuale e per i successivi 10 anni per obblighi fiscali.</li>
                <li><strong className="text-white/60">Cookie:</strong> Secondo le scadenze specificate nella tabella cookie. I cookie di sessione vengono eliminati alla chiusura del browser.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-white font-serif text-xl font-bold mb-4">7. Diritti dell'Interessato</h2>
              <p>Ai sensi degli Articoli 15-22 del GDPR, l'utente ha diritto di:</p>
              <ul className="list-disc pl-6 mt-3 space-y-2">
                <li><strong className="text-white/60">Accesso:</strong> Ottenere conferma dell'esistenza di un trattamento e accedere ai propri dati personali.</li>
                <li><strong className="text-white/60">Rettifica:</strong> Ottenere la correzione di dati inesatti o incompleti.</li>
                <li><strong className="text-white/60">Cancellazione:</strong> Richiedere la cancellazione dei propri dati personali ("diritto all'oblio").</li>
                <li><strong className="text-white/60">Limitazione:</strong> Richiedere la limitazione del trattamento in determinate circostanze.</li>
                <li><strong className="text-white/60">Portabilita:</strong> Ricevere i propri dati in formato strutturato e leggibile da dispositivo automatico.</li>
                <li><strong className="text-white/60">Opposizione:</strong> Opporsi al trattamento per motivi legittimi, incluso il marketing diretto.</li>
                <li><strong className="text-white/60">Reclamo:</strong> Presentare reclamo all'Autorita Garante per la protezione dei dati personali.</li>
              </ul>
              <p className="mt-3">Per esercitare i propri diritti, l'utente puo inviare una richiesta a: <a href="mailto:mauro@mauroferranteconsulting.com" className="text-[#c9a84c] hover:underline">mauro@mauroferranteconsulting.com</a></p>
            </div>

            <div>
              <h2 className="text-white font-serif text-xl font-bold mb-4">8. Trasferimento dei Dati</h2>
              <p>I dati personali possono essere trasferiti verso paesi al di fuori dello Spazio Economico Europeo (SEE) solo in presenza di adeguate garanzie di protezione, conformemente all'Art. 46 del GDPR, incluse clausole contrattuali standard approvate dalla Commissione Europea e decisioni di adeguatezza.</p>
            </div>

            <div>
              <h2 className="text-white font-serif text-xl font-bold mb-4">9. Sicurezza dei Dati</h2>
              <p>Il Titolare adotta misure tecniche e organizzative appropriate per garantire la sicurezza dei dati personali, tra cui la crittografia delle comunicazioni (SSL/TLS), l'accesso limitato ai dati e procedure di backup regolari.</p>
            </div>

            <div>
              <h2 className="text-white font-serif text-xl font-bold mb-4">10. Modifiche alla Privacy Policy</h2>
              <p>Il Titolare si riserva il diritto di modificare la presente Privacy Policy in qualsiasi momento. Le modifiche saranno pubblicate su questa pagina con indicazione della data di ultimo aggiornamento. Si consiglia di consultare periodicamente questa pagina.</p>
            </div>

            <div className="border-t border-white/10 pt-8">
              <p className="text-white/30 text-xs">Per qualsiasi domanda o richiesta relativa alla presente Privacy Policy, si prega di contattare: <a href="mailto:mauro@mauroferranteconsulting.com" className="text-[#c9a84c] hover:underline">mauro@mauroferranteconsulting.com</a></p>
            </div>
          </div>
        </div>
      </section>

      <Footer locale={locale} />
    </div>
  );
}
