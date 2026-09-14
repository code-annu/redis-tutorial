export function otpKey(phone: string) {
  return `otp:${phone}`;
}

export function userKey(id: string) {
  return `user:${id}`;
}
