import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useAuth } from '../context/AuthContext'
import { FaKey } from 'react-icons/fa'

function VerifyEmail() {
  const [verificationCode, setVerificationCode] = useState('')
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const { verifyEmail } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    if (location.state?.email) {
      setEmail(location.state.email)
    } else {
      navigate('/register')
    }
  }, [location, navigate])

  const handleChange = (e) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 6)
    setVerificationCode(value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (verificationCode.length !== 6) {
      toast.error('請輸入6位數字驗證碼')
      return
    }

    setLoading(true)

    try {
      await verifyEmail(email, verificationCode)
      toast.success('郵箱驗證成功！請登入')
      navigate('/login')
    } catch (error) {
      toast.error(error.response?.data?.message || '驗證碼錯誤，請重試')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* 背景装饰 */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-100 via-emerald-50 to-teal-50"></div>
      <div className="absolute top-0 left-0 w-72 h-72 bg-green-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
      <div className="absolute top-0 right-0 w-72 h-72 bg-teal-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-emerald-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>

      <div className="max-w-md w-full space-y-8 relative z-10">
        <div className="bg-white/90 backdrop-blur-xl p-8 rounded-3xl shadow-[0_20px_60px_-12px_rgba(0,0,0,0.25)] border border-white/30 transform transition-all duration-500 hover:shadow-[0_25px_70px_-12px_rgba(34,197,94,0.35)] hover:scale-[1.01]">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl mb-4 shadow-lg">
              <FaKey className="text-white text-2xl" />
            </div>
            <h2 className="text-4xl font-bold bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent">
              郵箱驗證
            </h2>
            <p className="mt-3 text-gray-600 text-base">
              請輸入發送到 <span className="font-semibold text-gray-900">{email}</span> 的6位驗證碼
            </p>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="verificationCode" className="block text-sm font-medium text-gray-700 mb-1">
              驗證碼
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaKey className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="verificationCode"
                name="verificationCode"
                type="text"
                required
                maxLength={6}
                className="appearance-none relative block w-full pl-12 pr-4 py-4 border-2 border-gray-200 placeholder-gray-400 text-gray-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500 bg-gray-50/80 transition-all duration-300 hover:border-green-300 hover:bg-gray-50 text-center text-3xl tracking-[0.5em] font-semibold"
                placeholder="000000"
                value={verificationCode}
                onChange={handleChange}
              />
            </div>
            <p className="mt-2 text-xs text-gray-500">
              請輸入6位數字驗證碼
            </p>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              disabled={loading || verificationCode.length !== 6}
              className="group relative w-full flex justify-center items-center py-4 px-6 border border-transparent text-base font-semibold rounded-xl text-white bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 hover:from-green-700 hover:via-emerald-700 hover:to-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500/50 disabled:opacity-50 disabled:cursor-not-allowed transform transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_10px_30px_-5px_rgba(34,197,94,0.4)] active:scale-[0.98]"
            >
              {loading ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  驗證中...
                </span>
              ) : (
                '驗證'
              )}
            </button>
          </div>
        </form>
        </div>
      </div>
    </div>
  )
}

export default VerifyEmail
