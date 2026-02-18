import {
    Users,
    GraduationCap,
    Newspaper,
    TrendingUp,
    ArrowUpRight,
    Calendar
} from "lucide-react";
import { auth } from "@/auth";

export default async function DashboardPage() {
    const session = await auth();

    const stats = [
        { label: "Total Siswa", value: "1,240", icon: <Users />, color: "bg-blue-500", trend: "+12%" },
        { label: "Total Guru", value: "86", icon: <GraduationCap />, color: "bg-purple-500", trend: "0%" },
        { label: "Berita Aktif", value: "24", icon: <Newspaper />, color: "bg-orange-500", trend: "+3" },
    ];

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Halo, {session?.user?.name || "Admin"} 👋</h1>
                <p className="text-gray-500">Berikut adalah ringkasan sekolah Anda hari ini.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {stats.map((stat, i) => (
                    <div key={i} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow group">
                        <div className="flex justify-between items-start mb-4">
                            <div className={`w-12 h-12 ${stat.color} text-white rounded-2xl flex items-center justify-center shadow-lg`}>
                                {stat.icon}
                            </div>
                            <div className="flex items-center gap-1 text-green-600 text-xs font-bold bg-green-50 px-2 py-1 rounded-lg">
                                <TrendingUp size={12} />
                                {stat.trend}
                            </div>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-500 mb-1">{stat.label}</p>
                            <h3 className="text-3xl font-extrabold text-gray-900 tracking-tight">{stat.value}</h3>
                        </div>
                        <div className="mt-4 pt-4 border-t border-gray-50 flex items-center justify-between group-hover:text-blue-600 transition-colors">
                            <span className="text-xs font-semibold text-gray-400">Lihat Detail</span>
                            <ArrowUpRight size={14} />
                        </div>
                    </div>
                ))}
            </div>

            {/* Calendar / Quick Action Placeholder */}
            <div className="grid lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-white rounded-3xl border border-gray-100 shadow-sm p-8">
                    <div className="flex items-center justify-between mb-8">
                        <h3 className="text-xl font-bold">Aktivitas Terbaru</h3>
                        <button className="text-sm text-blue-600 font-bold hover:underline">Semua Aktivitas</button>
                    </div>
                    <div className="space-y-6">
                        {[1, 2, 3].map((_, i) => (
                            <div key={i} className="flex gap-4">
                                <div className="w-10 h-10 rounded-full bg-gray-100 flex-shrink-0 flex items-center justify-center">
                                    <Calendar size={18} className="text-gray-500" />
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm font-bold text-gray-800">Update Kurikulum 2026</p>
                                    <p className="text-xs text-gray-500">Oleh Admin Pusat • 2 jam yang lalu</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-gradient-to-br from-blue-600 to-blue-800 p-8 rounded-3xl text-white shadow-xl shadow-blue-200 flex flex-col justify-between">
                    <div>
                        <h3 className="text-xl font-bold mb-2">NexEdu Pro</h3>
                        <p className="text-blue-100 text-sm">Update ke versi Pro untuk fitur pengelolaan keuangan otomatis.</p>
                    </div>
                    <button className="bg-white text-blue-600 w-full py-3 rounded-xl font-bold text-sm mt-8 hover:bg-blue-50 transition-colors">
                        Cek Keuntungan
                    </button>
                </div>
            </div>
        </div>
    );
}
