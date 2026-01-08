import { message, App } from "antd";

// name started with small letter because it is a normal arrow function not a component
export const handleAxiosError = (error) => {
  // const { message } = App.useApp();
  if (error.response) {
    const { status, data } = error.response;

    switch (status) {
      case 400:
        message.error(data.message || "Bad Request!");
        break;
      case 401:
        message.error(data.message || "Unauthorized Access!");
        break;
      case 403:
        message.error(data.message || "Forbidden!");
        break;
      case 404:
        message.error(data.message || "Resource not found!");
        break;
      case 500:
        message.error("Internal Server Error. Please try again later!");
        break;
      default:
        console.error("Server error:", data);
        message.error("Something went wrong on the server!");
    }
  } else if (error.request) {
    console.error("Network error:", error.request);
    message.error(
      "Could not connect to the server. Please check your network connection."
    );
  } else {
    console.error("Request setup error:", error.message);
    message.error("An unexpected error occurred. Please try again.");
  }
};
