"use client";
import { useSidebar } from "@/context/SidebarContext";
import { LogIn, Menu, UploadCloud, CheckCircle, FileText, SkipBack, LucideStepBack, } from "lucide-react";
import Link from "next/link";

export default function CreateUserPage() {
    const { setSidebarOpen } = useSidebar();

    return (
        <>
            {/* Header Content */}
            <header className="bg-white dark:bg-gray-800 shadow-sm px-6 py-4 transition-colors">
                <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center space-x-4">
                        <button
                            onClick={() => setSidebarOpen(true)}
                            className="lg:hidden text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-gray-100">
                            <Menu className="w-6 h-6" />
                        </button>
                        <div>
                            <nav className="text-sm text-gray-500 dark:text-gray-400">
                                <span>Pages</span>
                                <span className="mx-2">/</span>
                                <span className="text-gray-900 dark:text-gray-200 font-medium">
                                    Forms
                                </span>
                            </nav>
                        </div>
                    </div>
                    <div className="flex items-center space-x-4">
                        <input
                            type="text"
                            placeholder="Type here..."
                            className="w-52 md:w-64 pl-4 pr-10 py-2 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button className="text-blue-600 hover:text-blue-700">
                            <LogIn className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </header>

            {/* Main Content - Form */}
            <main className="p-6">
                <div className='flex justify-between items-start gap-4 mb-2'>
                    <h1 className="text-2xl font-bold mb-6">User Registration Form</h1>
                    <Link href='/admin/users' className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                        <LucideStepBack className="w-5 h-5 inline mr-2" />
                        Kembali
                    </Link>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 lg:p-8 transition-colors">
                    <form className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                        {/* Full Name */}
                        <div>
                            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                                Nama Lengkap
                            </label>
                            <input
                                type="text"
                                id="fullName"
                                name="fullName"
                                className={`w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                placeholder="Masukkan nama lengkap Anda"
                            />
                        </div>

                        {/* Email */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                className={`w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                placeholder="contoh@domain.com"
                            />
                        </div>

                        {/* Password */}
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                className={`w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                placeholder="Minimal 6 karakter"
                            />
                        </div>

                        {/* Age */}
                        <div>
                            <label htmlFor="age" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                                Umur
                            </label>
                            <input
                                type="number"
                                id="age"
                                name="age"
                                className={`w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                placeholder="Masukkan umur Anda"
                            />
                        </div>

                        {/* Bio (Textarea) - span full width on small screens */}
                        <div className="md:col-span-2">
                            <label htmlFor="bio" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                                Bio
                            </label>
                            <textarea
                                id="bio"
                                name="bio"
                                rows="4"
                                className={`w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                placeholder="Ceritakan sedikit tentang diri Anda..."
                            ></textarea>
                        </div>

                        {/* Country (Select) */}
                        <div>
                            <label htmlFor="country" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                                Negara
                            </label>
                            <select
                                id="country"
                                name="country"
                                className={`w-full px-4 py-2 borderborder-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                            >
                                <option value="">Pilih Negara</option>
                                <option value="ID">Indonesia</option>
                                <option value="US">Amerika Serikat</option>
                                <option value="CA">Kanada</option>
                                <option value="GB">Inggris</option>
                                <option value="AU">Australia</option>
                            </select>
                        </div>

                        {/* Gender (Radio Buttons) */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                                Jenis Kelamin
                            </label>
                            <div className="flex items-center space-x-6">
                                <div className="flex items-center">
                                    <input
                                        type="radio"
                                        id="male"
                                        name="gender"
                                        value="male"
                                        className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 dark:border-gray-600 dark:bg-gray-700"
                                    />
                                    <label htmlFor="male" className="ml-2 block text-sm text-gray-900 dark:text-gray-100">
                                        Pria
                                    </label>
                                </div>
                                <div className="flex items-center">
                                    <input
                                        type="radio"
                                        id="female"
                                        name="gender"
                                        value="female"
                                        className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 dark:border-gray-600 dark:bg-gray-700"
                                    />
                                    <label htmlFor="female" className="ml-2 block text-sm text-gray-900 dark:text-gray-100">
                                        Wanita
                                    </label>
                                </div>
                            </div>
                        </div>

                        {/* Profile Picture (File Input) - span full width on small screens */}
                        <div className="md:col-span-2">
                            <label htmlFor="profilePicture" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                                Gambar Profil (Opsional)
                            </label>
                            <div className={`mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 dark:border-gray-600 border-dashed rounded-md`}>
                                <div className="space-y-1 text-center">
                                    <UploadCloud className="mx-auto h-12 w-12 text-gray-400" />
                                    <div className="flex text-sm text-gray-600 dark:text-gray-300">
                                        <label
                                            htmlFor="profilePicture"
                                            className="relative cursor-pointer bg-white dark:bg-gray-700 rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                                        >
                                            <span>Unggah file</span>
                                            <input
                                                id="profilePicture"
                                                name="profilePicture"
                                                type="file"
                                                accept="image/*" // Hanya menerima gambar
                                                className="sr-only"
                                            />
                                        </label>
                                        <p className="pl-1">atau tarik dan lepas</p>
                                    </div>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                        PNG, JPG, GIF hingga 10MB
                                    </p>

                                </div>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="md:col-span-2 flex justify-end mt-4">
                            <button
                                type="submit"
                                className="inline-flex justify-center py-2 px-6 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                                Create User
                                <CheckCircle className="ml-2 w-5 h-5" />
                            </button>
                        </div>
                    </form>
                </div>
            </main>
        </>
    );
}