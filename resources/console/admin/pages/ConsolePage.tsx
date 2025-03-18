import React from "react";
import { Link } from "@inertiajs/react";

const ConsolePage: React.FC = () => {
    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <div className="max-w-4xl mx-auto">
                <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <Link
                            href="/console/admin/user-creator"
                            className="px-6 py-4 bg-slate-500 text-white rounded-lg hover:bg-slate-600 transition-colors duration-200 flex items-center justify-center"
                        >
                            <span className="font-medium">ユーザー発行</span>
                        </Link>
                        <Link
                            href="/console/admin/restaurant-management"
                            className="px-6 py-4 bg-slate-500 text-white rounded-lg hover:bg-slate-600 transition-colors duration-200 flex items-center justify-center"
                        >
                            <span className="font-medium">飲食店管理</span>
                        </Link>
                        <Link
                            href="/console/admin/board-editor"
                            className="px-6 py-4 bg-slate-500 text-white rounded-lg hover:bg-slate-600 transition-colors duration-200 flex items-center justify-center"
                        >
                            <span className="font-medium">ボード編集</span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConsolePage;
