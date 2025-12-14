export const vi = {
  // Common
  common: {
    loading: "Đang tải...",
    error: "Có lỗi xảy ra",
    success: "Thành công",
    cancel: "Hủy",
    confirm: "Xác nhận",
    save: "Lưu",
    delete: "Xóa",
    edit: "Chỉnh sửa",
    search: "Tìm kiếm",
    logout: "Đăng xuất",
    login: "Đăng nhập",
    register: "Đăng ký",
    submit: "Gửi",
    back: "Quay lại",
    next: "Tiếp theo",
    previous: "Trước đó",
    seeMore: "Xem thêm",
    seeAll: "Xem tất cả",
  },

  // Navbar
  navbar: {
    home: "Trang chủ",
    findTutor: "Tìm gia sư",
    becomeTutor: "Trở thành gia sư",
    contact: "Liên hệ",
    profile: "Hồ sơ",
    myClasses: "Lớp học của tôi",
    classRequests: "Yêu cầu vào lớp",
    blog: "Blog",
  },

  // Home page
  home: {
    banner: {
      title: "Tìm gia sư phù hợp cho bạn",
      subtitle: "Nền tảng kết nối học sinh và gia sư hàng đầu Việt Nam",
      findTutor: "Tìm gia sư ngay",
      createCV: "Tạo CV ngay",
    },
    introduction: {
      title: "Giới thiệu về Eduguin",
      description:
        "Eduguin là nền tảng giáo dục trực tuyến kết nối học sinh với các gia sư chất lượng cao",
    },
    recommendTutor: {
      title: "Gia sư nổi bật",
      subtitle: "Những gia sư được đánh giá cao nhất",
    },
    roleOptions: {
      studentTitle: "Học sinh",
      studentDesc: "Tìm gia sư phù hợp với nhu cầu học tập của bạn",
      tutorTitle: "Gia sư",
      tutorDesc: "Đăng ký trở thành gia sư và chia sẻ kiến thức của bạn",
    },
  },

  // Find Tutor page
  findTutor: {
    title: "Tìm gia sư",
    searchPlaceholder: "Tìm kiếm theo tên, môn học...",
    filters: {
      subject: "Môn học",
      grade: "Khối lớp",
      price: "Mức giá",
      rating: "Đánh giá",
    },
    banner: {
      title: "Tìm gia sư phù hợp cho bạn",
    },
    noResults: "Không tìm thấy gia sư phù hợp",
    perMonth: "/tháng",
  },

  // Tutor Info page
  tutorInfo: {
    about: "Giới thiệu",
    classes: "Các lớp học",
    reviews: "Đánh giá",
    subscribe: "Đăng ký học",
    price: "Học phí",
    rating: "Đánh giá",
    students: "Học sinh",
    experience: "Kinh nghiệm",
    subjects: "Môn dạy",
  },

  // Profile page
  profile: {
    title: "Hồ sơ cá nhân",
    personalInfo: "Thông tin cá nhân",
    fullName: "Họ và tên",
    email: "Email",
    phone: "Số điện thoại",
    dateOfBirth: "Ngày sinh",
    gender: "Giới tính",
    male: "Nam",
    female: "Nữ",
    other: "Khác",
    address: "Địa chỉ",
    changePassword: "Đổi mật khẩu",
    updateProfile: "Cập nhật hồ sơ",
    settings: "Cài đặt",
    language: "Ngôn ngữ",
    vietnamese: "Tiếng Việt",
    english: "Tiếng Anh",
  },

  // My Classes page
  myClasses: {
    title: "Lớp học của tôi",
    createClass: "Tạo lớp mới",
    className: "Tên lớp",
    subject: "Môn học",
    schedule: "Lịch học",
    students: "Sĩ số",
    status: "Trạng thái",
    actions: "Hành động",
    active: "Đang hoạt động",
    inactive: "Ngưng hoạt động",
    pending: "Chờ duyệt",
    noClasses: "Bạn chưa có lớp học nào",
    draft: "Bản nháp",
    price: "Giá tiền",
  },

  // Class Subscription page
  classSubscription: {
    title: "Yêu cầu vào lớp",
    student: "Học sinh",
    class: "Lớp học",
    requestDate: "Ngày yêu cầu",
    status: "Trạng thái",
    approve: "Duyệt",
    reject: "Từ chối",
    approved: "Đã duyệt",
    rejected: "Đã từ chối",
    noRequests: "Không có yêu cầu nào",
  },

  // Auth pages
  auth: {
    login: {
      title: "Chào mừng bạn quay trở lại",
      email: "Email",
      password: "Mật khẩu",
      forgotPassword: "Quên mật khẩu?",
      noAccount: "Chưa có tài khoản?",
      registerNow: "Đăng ký ngay",
      loginFailed:
        "Đăng nhập thất bại! Vui lòng kiểm tra lại email và mật khẩu",
    },
    register: {
      title: "Đăng ký",
      fullName: "Họ và tên",
      email: "Email",
      password: "Mật khẩu",
      confirmPassword: "Nhập lại mật khẩu",
      dateOfBirth: "Ngày sinh",
      gender: "Giới tính",
      displayName: "Tên hiển thị",
      hasAccount: "Đã có tài khoản?",
      loginNow: "Đăng nhập ngay",
      registerFailed: "Đăng ký thất bại",
      registerSuccess: "Đăng ký thành công",
    },
    tutorRegister: {
      title: "Đăng ký trở thành Gia sư",
      subtitle: "Điền đầy đủ thông tin và chờ admin duyệt để bắt đầu dạy học",
      subject: "Môn dạy",
      grade: "Khối dạy",
      description: "Giới thiệu bản thân",
      submit: "Gửi đơn ứng tuyển",
      success: "Gửi đơn ứng tuyển thành công! Vui lòng chờ admin duyệt.",
      isStudent: "Bạn là học sinh?",
      registerStudent: "Đăng ký học sinh",
    },
  },

  // Contact page
  contact: {
    title: "Liên hệ",
    subtitle: "Liên hệ với chúng tôi",
    email: "Email",
    phone: "Số điện thoại",
    address: "Địa chỉ",
  },

  // Footer
  footer: {
    copyright: "Bản quyền © 2025 EduGuin",
    allRights: "Tất cả quyền được bảo lưu",
  },

  // Validation messages
  validation: {
    required: "Trường này là bắt buộc",
    invalidEmail: "Email không hợp lệ",
    passwordMin: "Mật khẩu phải có ít nhất 6 ký tự",
    passwordNotMatch: "Mật khẩu không khớp",
  },

  // Admin pages
  admin: {
    login: {
      title: "Đăng nhập Admin",
      fillInfo: "Vui lòng nhập đầy đủ thông tin",
      loginFailed: "Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin.",
    },
    sidebar: {
      tutorApproval: "Kiểm duyệt giáo viên",
      teacherManagement: "Quản lý giáo viên",
      studentManagement: "Quản lý học sinh",
      logout: "Đăng xuất",
    },
    tutorApply: {
      title: "Kiểm duyệt giáo viên",
      totalPending: "giáo viên chờ duyệt",
      teacher: "Giáo viên",
      registrationDate: "Ngày đăng ký",
      gender: "Giới tính",
      status: "Trạng thái",
      actions: "Hành động",
      pending: "Chờ duyệt",
      approved: "Đã duyệt",
      rejected: "Từ chối",
      approve: "Duyệt",
      reject: "Từ chối",
      processed: "Đã xử lý",
      approveSuccess: "Đã duyệt giáo viên thành công!",
      approveError: "Có lỗi xảy ra khi duyệt giáo viên!",
      rejectSuccess: "Đã từ chối giáo viên!",
      rejectError: "Có lỗi xảy ra khi từ chối giáo viên!",
      noTeachers: "Không có giáo viên nào cần duyệt",
    },
    teachers: {
      title: "Quản lý giáo viên",
      total: "Tổng số",
      teachers: "giáo viên",
      teacher: "Giáo viên",
      subject: "Môn dạy",
      birthDate: "Ngày sinh",
      gender: "Giới tính",
      rating: "Đánh giá",
      noTeachers: "Không có giáo viên nào",
      actions: "Hành động",
      block: "Khoá tài khoản",
      blockSuccess: "Đã khoá giáo viên!",
      blockError: "Khóa giáo viên thất bại",
    },
    students: {
      title: "Quản lý học sinh",
      total: "Tổng số",
      students: "học sinh",
      student: "Học sinh",
      email: "Email",
      sex: "Giới tính",
      male: "Nam",
      female: "Nữ",
      other: "Khác",
      birthDate: "Ngày sinh",
      status: "Trạng thái",
      actions: "Hành động",
      active: "Hoạt động",
      blocked: "Đã khoá",
      block: "Khoá tài khoản",
      unblock: "Mở khoá",
      blockSuccess: "Đã khoá học sinh!",
      blockError: "Khóa học sinh thất bại",
      unblockSuccess: "Đã mở khoá học sinh!",
      noStudents: "Không có học sinh nào",
    },
  },
};

export type TranslationKeys = typeof vi;
