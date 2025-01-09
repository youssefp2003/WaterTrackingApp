# 💧 **Water Tracker App**

A modern React application designed to help users track their daily water intake, set hydration goals, and maintain healthy drinking habits. The app is built with React and Firebase for real-time data synchronization, user authentication, and secure cloud storage.

---

## ✨ **Features**

### **User Authentication**
- **Secure Sign-up and Login**: Using Firebase Authentication for secure access.
- **Google Sign-in Integration**: Log in with Google for a seamless experience.
- **Password Reset**: Easily reset your password with email-based recovery.

### **Water Intake Tracking**
- **Log Water Intake**: Track water consumption with customizable amounts.
- **Real-time Updates**: Firebase-powered data sync to keep progress up to date.
- **Daily Progress Visualization**: See your hydration status with intuitive progress indicators.

### **Personalized Goals**
- **Set and Modify Goals**: Customize your daily water intake targets.
- **Progress Bar**: Visual indicator showing the percentage of your goal completed.
- **Smart Recommendations**: Receive hydration suggestions based on your profile.

### **Statistics & History**
- **Visualization**: Interactive charts to track your drinking patterns.
- **Weekly & Monthly Summaries**: Track your hydration habits over time.
- **Exportable History**: Download your hydration data for personal records.

### **Reminders**
- **Customizable Reminders**: Set personalized drinking reminders.
- **Browser Notifications**: Receive timely alerts to remind you to hydrate.
- **Smart Scheduling**: Schedule reminders based on your preferred time of day.

---

## 🚀 **Technologies Used**

### **Frontend**
- **React 18**: Powerful frontend framework for building interactive UIs.
- **Material-UI (MUI)**: Modern UI component library for responsive design.
- **Chart.js**: For rendering interactive hydration charts.
- **React Router**: Navigation management for smooth user experience.

### **Backend & Database**
- **Firebase Authentication**: Secure user sign-in and authentication.
- **Cloud Firestore**: Real-time NoSQL database for storing water logs and user profiles.
- **Firebase Hosting**: Scalable cloud hosting solution for your app.

---

## 📦 **Installation**

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/watertracker.git
cd watertracker
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Set Up Firebase
- Create a **Firebase project** in the [Firebase Console](https://console.firebase.google.com/).
- Enable **Authentication** methods (Email/Password, Google, etc.).
- Set up a **Firestore database**.
- Copy your Firebase configuration details and create a `.env` file in the project root:

```bash
REACT_APP_FIREBASE_API_KEY=your_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_storage_bucket
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id
```

### 4. Start the Development Server
```bash
npm start
```

### 5. Build for Production
```bash
npm run build
```

---

## 🔧 **Configuration**

### **Firebase Setup**
1. Go to the **Firebase Console** and create a new project.
2. Enable the following **Authentication methods**:
   - Email/Password
   - Google (optional)
3. Create a **Firestore database** and configure Firestore rules:
   
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
2. Optionally, use **Google Sign-in** for convenience.

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
2. View **weekly** and **monthly** charts to track your hydration habits.
3. Export your **drinking history** if needed.

### **Set Reminders**
1. Enable **notifications** to receive reminders.
2. Set the **frequency** and **customize reminder times** to suit your routine.

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
- **Youssef Abdelmoumene** – [GitHub Profile](https://github.com/youssef2003)

---
