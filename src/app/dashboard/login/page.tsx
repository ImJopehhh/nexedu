"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema, type LoginInput } from "@/lib/zod-schemas";
import { loginAction } from "@/lib/actions";
import { useState } from "react";
import { Building2, Lock, Mail, Loader2, AlertCircle } from "lucide-react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginInput>({
        resolver: zodResolver(LoginSchema),
    });

    const onSubmit = async (data: LoginInput) => {
        setLoading(true);
        setError(null);

        const formData = new FormData();
        formData.append("email", data.email);
        formData.append("password", data.password);

        try {
            const result = await loginAction(formData);
            if (result?.error) {
                setError(result.error);
                setLoading(false);
            } else {
                router.push("/dashboard");
            }
        } catch (err) {
            setError("Terjadi kesalahan sistem");
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                <div className="text-center mb-10">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 text-white rounded-2xl shadow-xl shadow-blue-100 mb-6">
                        <Building2 className="w-9 h-9" />
                    </div>
                    <h1 className="text-3xl font-extrabold text-gray-900">NexEdu Portal</h1>
                    <p className="text-gray-500 mt-2">Masuk untuk mengelola dashboard sekolah Anda</p>
                </div>

                <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8">
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    {...register("email")}
                                    className={`w-full pl-12 pr-4 py-4 bg-gray-50 border rounded-xl outline-none focus:ring-2 transition-all ${errors.email ? "border-red-500 focus:ring-red-100" : "border-gray-100 focus:ring-blue-100 focus:border-blue-500"
                                        }`}
                                    placeholder="name@school.com"
                                    type="email"
                                />
                            </div>
                            {errors.email && <p className="text-red-500 text-xs mt-1.5 ml-1">{errors.email.message}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    {...register("password")}
                                    className={`w-full pl-12 pr-4 py-4 bg-gray-50 border rounded-xl outline-none focus:ring-2 transition-all ${errors.password ? "border-red-500 focus:ring-red-100" : "border-gray-100 focus:ring-blue-100 focus:border-blue-500"
                                        }`}
                                    placeholder="••••••••"
                                    type="password"
                                />
                            </div>
                            {errors.password && <p className="text-red-500 text-xs mt-1.5 ml-1">{errors.password.message}</p>}
                        </div>

                        {error && (
                            <div className="bg-red-50 border border-red-100 text-red-600 p-4 rounded-xl flex items-center gap-3 text-sm animate-shake">
                                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                                {error}
                            </div>
                        )}

                        <button
                            disabled={loading}
                            className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-blue-700 active:scale-[0.98] transition-all disabled:opacity-70 shadow-lg shadow-blue-100"
                            type="submit"
                        >
                            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Sign In to Dashboard"}
                        </button>
                    </form>
                </div>

                <p className="text-center mt-10 text-sm text-gray-500">
                    Kesulitan masuk? Hubungi <span className="text-blue-600 font-semibold cursor-pointer">Admin IT Sekolah</span>
                </p>
            </div>
        </div>
    );
}
