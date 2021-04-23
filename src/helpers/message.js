const SUCCESS = {
  usersFetched: "Users fetched successfully",
  userCreated: "User created successfully",
  userChanged: "User details changed successfully",
  userDeleted: "User deleted successfully",
  usercontactsFetched: "User's contact fetched successfully",
  userAuthenticated: "User logged in successfully",
  contactsFetched: "contacts fetched successfully",
  contactCreated: "contact created successfully",
  contactChanged: "contact details changed successfully",
  contactDeleted: "contact deleted successfully",
  commentsFetched: "comments fetched successfully",
  commentCreated: "comment created successfully",
  commentChanged: "comment details changed successfully",
  commentDeleted: "comment deleted successfully",
  success: "Action has been successfully executed",
  userLogOut: "User has been logged out",
}

const ERROR = {
  missingAuthHeader: "Missing Authorization Header",
  invalidCred: "Invalid Authentication Credentials",
  input: "Check input again",
  internalServerError: "Some internal server error",
  notFound: "User not found",
  contactsNotFound: "contacts not found",
  commentsNotFound: "comment not found",
  invalidUser: "Invalid user",
  invalidToken: "Invalid token",
  expiredToken: "Expired token",
  sessionExpired: "Your session is expired. Please login again",
  pageNotFound: "Page not found",
  notBearerToken: "Token is not Bearer"
}

const STATUS = {
  success: 200,
  created: 201,
  unAuthorized: 401,
  failed: 400,
  notFound: 404,
  badGateway: 500,
}

export { ERROR, STATUS, SUCCESS };
