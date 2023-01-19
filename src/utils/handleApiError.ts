import Result from "./result";

export default function handleApiError(e: any): any {
  if (e.response !== null) {
    switch (e.response.status) {
      case 401:
        // unAuthorized
        return Result.unauthorized(["You are unauthorized!"]);
      case 403:
        // Forbidden
        return Result.forbidden([
          "You don’t have permission to access this service.",
        ]);
      case 400:
        // Bad_request
        return Result.invalid(e.response.data, ["Invalid Request."]);
      case 404:
        return Result.notFound(["Page not found!"]);
      case 500:
        // Internal_Server_Error
        return Result.internalServerError(["Internal Server Error."]);
      default:
        return Result.error([e.message]);
    }
  } else if (e.request !== null) {
    return Result.noResponse(["Unable to connect to the server"]);
  } else {
    return Result.error([
      "Unable to make a request, please check your connection.",
    ]);
  }
}
