import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";
import { FaSignOutAlt, FaKey, FaExclamationTriangle } from "react-icons/fa";

function Navbar() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const handleLogoutClick = () => {
    setShowLogoutConfirm(true);
  };

  const handleLogoutConfirm = () => {
    logout();
    toast.success("已成功登出");
    navigate("/login");
  };

  const handleLogoutCancel = () => {
    setShowLogoutConfirm(false);
  };

  const handleResetPassword = () => {
    navigate("/change-password");
  };

  return (
    <>
      <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-[0_20px_60px_-12px_rgba(0,0,0,0.25)] border border-white/30 p-8 mb-6 transform transition-all duration-500 hover:shadow-[0_25px_70px_-12px_rgba(99,102,241,0.35)] hover:scale-[1.01] hover:-translate-y-1">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-gradient">
              受保護的頁面
            </h1>
            <p className="text-gray-600 mt-2 font-medium">歡迎來到您的個人儀表板</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleResetPassword}
              className="group flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-white rounded-xl hover:from-amber-600 hover:via-orange-600 hover:to-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500/50 transform transition-all duration-300 hover:scale-105 hover:shadow-[0_10px_30px_-5px_rgba(245,158,11,0.4)] active:scale-95 shadow-[0_4px_15px_-3px_rgba(245,158,11,0.3)]"
            >
              <FaKey className="transition-transform duration-300 group-hover:rotate-12" />
              <span className="font-semibold">重設密碼</span>
            </button>
            <button
              onClick={handleLogoutClick}
              className="group flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-red-500 via-rose-500 to-red-600 text-white rounded-xl hover:from-red-600 hover:via-rose-600 hover:to-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500/50 transform transition-all duration-300 hover:scale-105 hover:shadow-[0_10px_30px_-5px_rgba(239,68,68,0.4)] active:scale-95 shadow-[0_4px_15px_-3px_rgba(239,68,68,0.3)]"
            >
              <FaSignOutAlt className="transition-transform duration-300 group-hover:rotate-12" />
              <span className="font-semibold">登出</span>
            </button>
          </div>
        </div>
      </div>

      {/* 登出确认对话框 */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-300">
          <div className="bg-white rounded-3xl shadow-[0_25px_70px_-12px_rgba(0,0,0,0.5)] max-w-md w-full p-6 transform transition-all animate-in zoom-in-95 duration-300">
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
                <FaExclamationTriangle className="text-red-600 text-2xl" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                確認登出
              </h3>
              <p className="text-gray-600">您確定要登出嗎？</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={handleLogoutCancel}
                className="flex-1 px-4 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 font-semibold transition-all duration-200"
              >
                取消
              </button>
              <button
                onClick={handleLogoutConfirm}
                className="flex-1 px-4 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl hover:from-red-600 hover:to-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 font-semibold transition-all duration-200 transform hover:scale-105 active:scale-95"
              >
                確定登出
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;

