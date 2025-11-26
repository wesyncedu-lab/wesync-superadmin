export function setAuthCookie(res, token) {
  res.cookies.set("adminToken", token, {
    httpOnly: true,
    secure: true,
    path: "/",
    maxAge: 60 * 60 * 24, // 1 day
  });
}

export function clearAuthCookie(res) {
  res.cookies.set("adminToken", "", {
    maxAge: 0,
    path: "/",
  });
}
