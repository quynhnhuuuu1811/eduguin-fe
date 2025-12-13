// Cookie utility functions for authentication

export function setCookie(name: string, value: string, days: number = 7) {
  if (typeof window === "undefined") return;
  
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${encodeURIComponent(value)};expires=${expires.toUTCString()};path=/;SameSite=Lax`;
}

export function getCookie(name: string): string | null {
  if (typeof window === "undefined") return null;
  
  const nameEQ = name + "=";
  const ca = document.cookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) {
      return decodeURIComponent(c.substring(nameEQ.length, c.length));
    }
  }
  return null;
}

export function deleteCookie(name: string) {
  if (typeof window === "undefined") return;
  
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
}

// Auth-specific cookie functions
export function setAuthCookies(accessToken: string, user: any) {
  setCookie("accessToken", accessToken, 7); // 7 days
  setCookie("user", JSON.stringify(user), 7);
}

export function clearAuthCookies() {
  deleteCookie("accessToken");
  deleteCookie("user");
}
