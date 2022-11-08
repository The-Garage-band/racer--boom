import * as yup from 'yup'

import {
  MSG_LOGIN,
  MSG_PASSWORD,
  REGEX_LOGIN,
  REGEX_PASSWORD,
  MSG_REQUIRED,
} from '@/constants'

export default yup.object({
  login: yup
    .string()
    .required(MSG_REQUIRED)
    .min(3, MSG_LOGIN)
    .matches(new RegExp(REGEX_LOGIN), {
      excludeEmptyString: true,
      message: MSG_LOGIN,
    }),
  password: yup
    .string()
    .required(MSG_REQUIRED)
    .min(8, MSG_PASSWORD)
    .matches(new RegExp(REGEX_PASSWORD), {
      excludeEmptyString: true,
      message: MSG_PASSWORD,
    }),
})
