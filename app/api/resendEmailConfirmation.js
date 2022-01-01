import settings from "../config/settings";
import client from "./client";

const resendEmailConfirmation = (email) => client.post(settings.ResendConfirmationEmailURL, {'email':email});

export default {
  resendEmailConfirmation,
};
