import Link from "next/link";
import { Building2, ArrowRight, Newspaper, UserCircle, Phone } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl text-blue-600">
            <Building2 className="w-8 h-8" />
            <span>NexEdu</span>
          </Link>
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
            <Link href="#news" className="hover:text-blue-600 transition-colors">Berita</Link>
            <Link href="#profile" className="hover:text-blue-600 transition-colors">Profil</Link>
            <Link href="#contact" className="hover:text-blue-600 transition-colors">Kontak</Link>
          </nav>
          <Link
            href="/dashboard/login"
            className="bg-blue-600 text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-blue-700 transition-all flex items-center gap-2 shadow-lg shadow-blue-200"
          >
            Portal Akademik
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1">
        <section className="relative py-20 lg:py-32 overflow-hidden bg-gradient-to-b from-blue-50 to-white">
          <div className="container mx-auto px-4 text-center">
            <div className="inline-block px-4 py-1.5 mb-6 text-sm font-medium text-blue-600 bg-blue-100 rounded-full animate-fade-in">
              Platform Pendidikan Modern
            </div>
            <h1 className="text-4xl lg:text-6xl font-extrabold text-gray-900 mb-6 tracking-tight">
              Selamat Datang di <span className="text-blue-600">NexEdu Scholastic</span>
            </h1>
            <p className="max-w-2xl mx-auto text-lg text-gray-600 mb-10 leading-relaxed">
              Membangun masa depan pendidikan yang lebih baik dengan sistem manajemen sekolah yang cerdas, aman, dan terintegrasi.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/dashboard/login"
                className="bg-blue-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-blue-700 transition-all transform hover:-translate-y-1 shadow-xl shadow-blue-200"
              >
                Mulai Sekarang
              </Link>
              <button className="bg-white text-gray-700 border border-gray-200 px-8 py-4 rounded-xl font-bold hover:bg-gray-50 transition-all">
                Pelajari Lebih Lanjut
              </button>
            </div>
          </div>
        </section>

        {/* Features Preview */}
        <section id="features" className="py-20 bg-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-12">Mengapa Memilih NexEdu?</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { icon: <Building2 />, title: "Manajemen Terpadu", text: "Kelola data sekolah dalam satu platform yang sinkron." },
                { icon: <Newspaper />, title: "Sistem Berita", text: "Informasi sekolah yang cepat dan mudah diakses semua pihak." },
                { icon: <UserCircle />, title: "Portal User", text: "Akses khusus untuk Guru, Siswa, dan Admin." }
              ].map((f, i) => (
                <div key={i} className="p-8 border border-gray-100 rounded-2xl hover:border-blue-200 hover:shadow-xl transition-all group">
                  <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    {f.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3">{f.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{f.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-50 border-t py-12">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2 text-gray-900 font-semibold">
            <Building2 className="w-6 h-6 text-blue-600" />
            NexEdu
          </div>
          <p className="text-gray-500 text-sm">
            © 2026 NexEdu School Management. Semua hak dilindungi.
          </p>
          <div className="text-xs font-mono text-gray-400 bg-gray-100 px-3 py-1 rounded">
            v1.0.0
          </div>
        </div>
      </footer>
    </div>
  );
}
