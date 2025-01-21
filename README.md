---

# 💧 **Water Tracker App**

A modern React application designed to help users track their daily water intake, set hydration goals, and maintain healthy drinking habits. The app is built with **React**, **TypeScript**, and **Firebase** for real-time data synchronization, user authentication, and secure cloud storage.

---

## ✨ **Features**

### **User Authentication**
- Secure sign-up and login using Firebase Authentication.

### **Water Intake Tracking**
- **Log Water Intake**: Track water consumption with customizable amounts.
- **Real-time Updates**: Firebase-powered data sync to keep progress up to date.
- **Daily Progress Visualization**: See your hydration status with intuitive progress indicators.

### **Personalized Goals**
- **Set and Modify Goals**: Customize your daily water intake targets.
- **Progress Bar**: Visual indicator showing the percentage of your goal completed.

### **Statistics & History**
- **Visualization**: Interactive charts to track your drinking patterns.
- **Weekly Summaries**: Track your hydration habits over time.

---

## 🚀 **Technologies Used**

### **Frontend**
- **React 18**: For building a dynamic and interactive user interface.
- **TypeScript**: Adds static typing for better code quality and developer experience.
- **Tailwind CSS**: Utility-first CSS framework for efficient and modern styling.
- **Chart.js**: Interactive and customizable charts for hydration data visualization.
- **React Router**: Seamless navigation across app pages.

### **Backend & Database**
- **Firebase Authentication**: Secure user sign-in and authentication.
- **Cloud Firestore**: Real-time NoSQL database for storing water logs and user profiles.

### **Build Tools**
- **Vite**: Lightning-fast build tool and dev server.
- **PostCSS**: For CSS transformations and optimizations.

### **Linting & State Management**
- **ESLint**: Maintain consistent code quality.
- **React Context API** and/or **Zustand**: Manage global state efficiently.

---

## 📦 **Installation**

### Prerequisites
- Install [Node.js](https://nodejs.org/) (v14 or higher) and npm (or Yarn).

### 1. Clone the Repository
```bash
git clone https://github.com/youssefp2003/watertrackingapp.git
cd watertrackingapp
```

### 2. Install Dependencies
```bash
npm install
```
or
```bash
yarn install
```

### 3. Set Up Firebase
- Create a Firebase project in the [Firebase Console](https://console.firebase.google.com/).
- Enable **Authentication** methods (Email/Password, Google, etc.).
- Set up a **Firestore database**.
- Copy your Firebase configuration details into `src/firebase.ts`.

### 4. Start the Development Server
```bash
npm run dev
```
or
```bash
yarn dev
```

### 5. Build for Production
```bash
npm run build
```

---

## 🔧 **Configuration**

### Firebase Rules for Firestore
Add the following security rules to Firestore to ensure data privacy:

```plaintext
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    match /waterLogs/{logId} {
      allow read, write: if request.auth != null && resource.data.userId == request.auth.uid;
    }
  }
}
```

---

## 📱 **Usage**

### **Sign Up/Login**
1. Create an account or log in using existing credentials.

### **Set Daily Goal**
1. Navigate to **Settings**.
2. Set your daily water intake goal.
3. Save your changes.

### **Log Water Intake**
1. Click the **"+" button**.
2. Enter the water amount.
3. Submit to log your intake.

### **View Statistics**
1. Check your **daily progress** with a visual progress bar.
2. View **weekly** charts to track your hydration habits.
   
---

## 📂 **Project Structure**

```plaintext
youssefp2003-watertrackingapp/
├── README.md                # Project documentation
├── eslint.config.js         # ESLint configuration
├── index.html               # HTML entry point
├── package.json             # Node.js dependencies
├── postcss.config.js        # PostCSS configuration
├── tailwind.config.js       # Tailwind CSS configuration
├── tsconfig.*.json          # TypeScript configuration files
├── vite.config.ts           # Vite configuration
└── src/                     # Source code
    ├── App.tsx              # Main app component
    ├── firebase.ts          # Firebase setup
    ├── components/          # Reusable components
    ├── contexts/            # Context API files
    ├── store/               # State management
    ├── types.ts             # TypeScript types
    └── styles/              # Global styles
```

---

## 🤝 **Contributing**

We welcome contributions! Here's how you can get started:

1. **Fork** the repository.
2. **Create a feature branch**:
   ```bash
   git checkout -b feature/AmazingFeature
   ```
3. **Commit your changes**:
   ```bash
   git commit -m 'Add AmazingFeature'
   ```
4. **Push your changes**:
   ```bash
   git push origin feature/AmazingFeature
   ```
5. **Open a Pull Request**.

---

## 📄 **License**
This project is licensed under the **MIT License**. For more details, refer to the [LICENSE](LICENSE) file.

---

## 👥 **Authors**
- **Youssef Abdelmoumene** – [GitHub Profile](https://github.com/youssefp2003)

--- 
