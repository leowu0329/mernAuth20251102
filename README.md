# MERN Authentication System

完整的 MERN 認證系統，包含用戶註冊、郵箱驗證、登入、登出和密碼重設功能。

## 功能

- ✅ 用戶註冊
- ✅ 郵箱驗證（6位隨機數字驗證碼）
- ✅ 用戶登入
- ✅ 受保護的頁面
- ✅ 登出功能
- ✅ 忘記密碼
- ✅ 重設密碼（使用6位驗證碼）

## 技術棧

### 前端
- React (Vite)
- React Router DOM
- TailwindCSS 4
- React Toastify
- React Icons
- Axios
- Google Fonts (Noto Sans TC + Roboto)

### 後端
- Node.js + Express
- MongoDB + Mongoose
- JWT (JSON Web Tokens)
- Bcrypt (密碼加密)
- Nodemailer (發送郵件)

## 安裝與運行

### 前端設置

```bash
cd frontend
npm install
npm run dev
```

前端將運行在 http://localhost:3000

### 後端設置

```bash
cd backend
npm install
npm run dev
```

後端將運行在 http://localhost:5000

## 環境變量配置

### 前端 (.env)

```
VITE_API_URL=http://localhost:5000/api
```

### 後端 (.env)

```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/mern-auth
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRE=7d

# Email Configuration
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
FROM_EMAIL=your-email@gmail.com
```

## 使用說明

1. **註冊**: 前往 `/register` 頁面創建新帳戶
2. **驗證郵箱**: 註冊後會收到包含6位數字驗證碼的郵件
3. **登入**: 驗證郵箱後，可以使用帳戶登入
4. **受保護頁面**: 登入後可以訪問 `/dashboard`
5. **忘記密碼**: 點擊登入頁面的「忘記密碼」連結
6. **重設密碼**: 輸入收到的6位驗證碼和新密碼

## 注意事項

- 確保 MongoDB 服務正在運行
- 配置郵箱設置以發送驗證碼（建議使用 Gmail App Password）
- 在生產環境中更改 JWT_SECRET 為強密鑰

## 項目結構

```
MERN-AUTH/
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   ├── context/
│   │   └── ...
│   └── package.json
├── backend/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── utils/
│   └── server.js
└── README.md
```

