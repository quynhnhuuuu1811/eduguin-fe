import { TranslationKeys } from "./vi";

export const en: TranslationKeys = {
  // Common
  common: {
    loading: "Loading...",
    error: "An error occurred",
    success: "Success",
    cancel: "Cancel",
    confirm: "Confirm",
    save: "Save",
    delete: "Delete",
    edit: "Edit",
    search: "Search",
    logout: "Logout",
    login: "Login",
    register: "Register",
    submit: "Submit",
    back: "Back",
    next: "Next",
    previous: "Previous",
    seeMore: "See more",
    seeAll: "See all",
  },

  // Navbar
  navbar: {
    home: "Home",
    findTutor: "Find Tutor",
    becomeTutor: "Become a Tutor",
    contact: "Contact",
    profile: "Profile",
    myClasses: "My Classes",
    classRequests: "Class Requests",
    blog: "Blog",
  },

  // Home page
  home: {
    banner: {
      title: "Find the right tutor for you",
      subtitle: "Vietnam's leading platform connecting students and tutors",
      findTutor: "Find a tutor now",
      createCV: "Create CV now",
    },
    introduction: {
      title: "About Eduguin",
      description:
        "Eduguin is an online education platform connecting students with high-quality tutors",
    },
    recommendTutor: {
      title: "Featured Tutors",
      subtitle: "Highest rated tutors",
    },
    roleOptions: {
      studentTitle: "Student",
      studentDesc: "Find a tutor that suits your learning needs",
      tutorTitle: "Tutor",
      tutorDesc: "Register to become a tutor and share your knowledge",
    },
  },

  // Find Tutor page
  findTutor: {
    title: "Find Tutor",
    searchPlaceholder: "Search by name, subject...",
    filters: {
      subject: "Subject",
      grade: "Grade",
      price: "Price",
      rating: "Rating",
    },
    banner: {
      title: "Find the right tutor for you",
    },
    noResults: "No tutors found",
    perMonth: "/month",
  },

  // Tutor Info page
  tutorInfo: {
    about: "About",
    classes: "Classes",
    reviews: "Reviews",
    subscribe: "Subscribe",
    price: "Price",
    rating: "Rating",
    students: "Students",
    experience: "Experience",
    subjects: "Subjects",
  },

  // Profile page
  profile: {
    title: "Personal Profile",
    personalInfo: "Personal Information",
    fullName: "Full Name",
    email: "Email",
    phone: "Phone Number",
    dateOfBirth: "Date of Birth",
    gender: "Gender",
    male: "Male",
    female: "Female",
    other: "Other",
    address: "Address",
    changePassword: "Change Password",
    updateProfile: "Update Profile",
    settings: "Settings",
    language: "Language",
    vietnamese: "Vietnamese",
    english: "English",
  },

  // My Classes page
  myClasses: {
    title: "My Classes",
    createClass: "Create New Class",
    className: "Class Name",
    subject: "Subject",
    schedule: "Schedule",
    students: "Students",
    status: "Status",
    actions: "Actions",
    active: "Active",
    inactive: "Inactive",
    pending: "Pending",
    noClasses: "You don't have any classes yet",
    draft: "Draft",
    price: "Price",
  },

  // Class Subscription page
  classSubscription: {
    title: "Class Requests",
    student: "Student",
    class: "Class",
    requestDate: "Request Date",
    status: "Status",
    approve: "Approve",
    reject: "Reject",
    approved: "Approved",
    rejected: "Rejected",
    noRequests: "No requests",
  },

  // Auth pages
  auth: {
    login: {
      title: "Welcome back",
      email: "Email",
      password: "Password",
      forgotPassword: "Forgot password?",
      noAccount: "Don't have an account?",
      registerNow: "Register now",
      loginFailed: "Login failed! Please check your email and password",
    },
    register: {
      title: "Register",
      fullName: "Full Name",
      email: "Email",
      password: "Password",
      confirmPassword: "Confirm Password",
      dateOfBirth: "Date of Birth",
      gender: "Gender",
      displayName: "Display Name",
      hasAccount: "Already have an account?",
      loginNow: "Login now",
      registerFailed: "Registration failed",
      registerSuccess: "Registration successful",
    },
    tutorRegister: {
      title: "Register as a Tutor",
      subtitle:
        "Fill in all information and wait for admin approval to start teaching",
      subject: "Subject",
      grade: "Grade",
      description: "About yourself",
      submit: "Submit Application",
      success:
        "Application submitted successfully! Please wait for admin approval.",
      isStudent: "Are you a student?",
      registerStudent: "Register as Student",
      bio: "Bio",
    },
  },

  // Contact page
  contact: {
    title: "Contact",
    subtitle: "Contact us",
    email: "Email",
    phone: "Phone",
    address: "Address",
  },

  // Footer
  footer: {
    copyright: "Copyright © 2025 EduGuin",
    allRights: "All Rights Reserved",
  },

  // Validation messages
  validation: {
    required: "This field is required",
    invalidEmail: "Invalid email",
    passwordMin: "Password must be at least 6 characters",
    passwordNotMatch: "Passwords do not match",
  },

  // Admin pages
  admin: {
    login: {
      title: "Admin Login",
      fillInfo: "Please fill in all information",
      loginFailed: "Login failed. Please check your information.",
    },
    sidebar: {
      tutorApproval: "Tutor Approval",
      teacherManagement: "Teacher Management",
      studentManagement: "Student Management",
      logout: "Logout",
    },
    tutorApply: {
      title: "Tutor Approval",
      totalPending: "tutors pending approval",
      teacher: "Teacher",
      registrationDate: "Registration Date",
      gender: "Gender",
      status: "Status",
      actions: "Actions",
      pending: "Pending",
      approved: "Approved",
      rejected: "Rejected",
      approve: "Approve",
      reject: "Reject",
      processed: "Processed",
      approveSuccess: "Teacher approved successfully!",
      approveError: "Error approving teacher!",
      rejectSuccess: "Teacher rejected!",
      rejectError: "Error rejecting teacher!",
      noTeachers: "No teachers to approve",
    },
    teachers: {
      title: "Teacher Management",
      total: "Total",
      teachers: "teachers",
      teacher: "Teacher",
      subject: "Subject",
      birthDate: "Birth Date",
      gender: "Gender",
      rating: "Rating",
      noTeachers: "No teachers found",
      actions: "Actions",
      block: "Block Account",
      blockSuccess: "Teacher blocked!",
      blockError: "Error blocking teacher!",
    },
    students: {
      title: "Student Management",
      total: "Total",
      students: "students",
      student: "Student",
      email: "Email",
      sex: "Gender",
      male: "Male",
      female: "Female",
      other: "Other",
      birthDate: "Birth Date",
      status: "Status",
      actions: "Actions",
      active: "Active",
      blocked: "Blocked",
      block: "Block Account",
      unblock: "Unblock",
      blockSuccess: "Student blocked!",
      blockError: "Error blocking student!",
      unblockSuccess: "Student unblocked!",
      noStudents: "No students found",
    },
  },
};
