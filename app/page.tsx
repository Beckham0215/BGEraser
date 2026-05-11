import { BGEraserTool } from "@/components/BGEraserTool";
import { AdSlot } from "@/components/AdSlot";

export default function HomePage() {
  return (
    <>
      {/* ── Header ──────────────────────────────────────────────── */}
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur-sm">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2">
            <span className="text-xl font-extrabold tracking-tight">
              <span className="text-blue-600">BG</span>
              <span className="text-slate-900">Eraser</span>
            </span>
          </a>
          <nav className="hidden sm:flex items-center gap-6 text-sm font-medium text-slate-600">
            <a href="#how-it-works" className="hover:text-slate-900 transition">
              How it works
            </a>
            <a href="#features" className="hover:text-slate-900 transition">
              Features
            </a>
            <button
              disabled
              className="ml-2 bg-blue-600 text-white px-4 py-1.5 rounded-full text-sm font-semibold opacity-75 cursor-not-allowed"
              title="Coming soon"
            >
              Upgrade
            </button>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        {/* ── Hero ────────────────────────────────────────────────── */}
        <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 pt-14 pb-10 text-center">
          <span className="inline-block bg-blue-50 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full mb-5 border border-blue-100">
            100% Free · No Account · No Upload
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
            Remove Image Backgrounds
            <br />
            <span className="text-blue-600">Instantly &amp; For Free</span>
          </h1>
          <p className="mt-5 text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            AI-powered background removal that runs entirely in your browser.
            Your images never leave your device — no sign-up, no watermarks, no cost.
          </p>

          {/* Trust badges */}
          <div className="mt-6 flex flex-wrap justify-center gap-4 text-xs text-slate-500 font-medium">
            {[
              { icon: "🔒", label: "100% Private" },
              { icon: "⚡", label: "Instant results" },
              { icon: "🆓", label: "Free forever" },
              { icon: "📱", label: "Mobile friendly" },
            ].map(({ icon, label }) => (
              <span key={label} className="flex items-center gap-1.5">
                {icon} {label}
              </span>
            ))}
          </div>
        </section>

        {/* ── Ad slot — top ───────────────────────────────────────── */}
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <AdSlot slot="1234567890" format="horizontal" />
        </div>

        {/* ── Main tool ───────────────────────────────────────────── */}
        <section className="mx-auto max-w-3xl px-4 sm:px-6 pb-16">
          <BGEraserTool />
        </section>

        {/* ── How it works ────────────────────────────────────────── */}
        <section
          id="how-it-works"
          className="bg-white border-t border-slate-200"
        >
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-16">
            <h2 className="text-3xl font-bold text-slate-900 text-center mb-12">
              How it works
            </h2>
            <div className="grid sm:grid-cols-3 gap-8">
              {[
                {
                  step: "1",
                  title: "Upload your image",
                  desc: "Drag & drop or click to select a JPG, PNG, or WebP image from your device.",
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                    </svg>
                  ),
                },
                {
                  step: "2",
                  title: "AI removes background",
                  desc: "Our AI model processes your image directly in your browser using WebAssembly — no server needed.",
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                    </svg>
                  ),
                },
                {
                  step: "3",
                  title: "Download PNG",
                  desc: "Get your transparent PNG instantly. Compare before/after with the slider, then download.",
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                  ),
                },
              ].map(({ step, title, desc, icon }) => (
                <div key={step} className="flex flex-col items-center text-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
                    {icon}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-1">
                      Step {step}
                    </p>
                    <h3 className="font-bold text-slate-900 text-lg mb-2">{title}</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Features ────────────────────────────────────────────── */}
        <section id="features" className="bg-slate-50 border-t border-slate-200">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-16">
            <h2 className="text-3xl font-bold text-slate-900 text-center mb-12">
              Why BGEraser?
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: "100% Private",
                  desc: "Your images are processed locally using WebAssembly. Nothing is ever sent to a server.",
                  color: "bg-green-50 text-green-600",
                },
                {
                  title: "No Account Required",
                  desc: "Just upload and remove. No sign-up, no email, no hassle.",
                  color: "bg-blue-50 text-blue-600",
                },
                {
                  title: "Free Forever",
                  desc: "3 free removals per day at no cost. Upgrade coming soon for unlimited use.",
                  color: "bg-purple-50 text-purple-600",
                },
                {
                  title: "High Quality Output",
                  desc: "Full-resolution transparent PNG output — no watermarks, no compression.",
                  color: "bg-amber-50 text-amber-600",
                },
                {
                  title: "Before/After Preview",
                  desc: "Compare the original and result side-by-side with an interactive drag slider.",
                  color: "bg-pink-50 text-pink-600",
                },
                {
                  title: "Works on Mobile",
                  desc: "Fully responsive design — use BGEraser on any device, anywhere.",
                  color: "bg-teal-50 text-teal-600",
                },
              ].map(({ title, desc, color }) => (
                <div
                  key={title}
                  className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm"
                >
                  <div className={`inline-flex w-10 h-10 rounded-xl ${color} items-center justify-center mb-4`}>
                    <span className="text-lg font-bold">✓</span>
                  </div>
                  <h3 className="font-bold text-slate-900 mb-2">{title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Bottom ad ───────────────────────────────────────────── */}
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <AdSlot slot="4567890123" format="horizontal" />
        </div>
      </main>

      {/* ── Footer ──────────────────────────────────────────────── */}
      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-slate-500">
          <p>
            &copy; {new Date().getFullYear()}{" "}
            <span className="font-semibold text-slate-700">BGEraser</span>. Free AI background remover.
          </p>
          <p className="text-xs">
            Powered by{" "}
            <a
              href="https://img.ly"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-slate-700"
            >
              @imgly/background-removal
            </a>{" "}
            · Runs 100% in your browser
          </p>
        </div>
      </footer>
    </>
  );
}
