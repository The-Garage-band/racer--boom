import * as yup from 'yup';

import {
    MSG_LOGIN,
    MSG_MAIL,
    MSG_PASSWORD,
    REGEX_LOGIN,
    REGEX_PASSWORD,
    REGEX_TEL,
    MSG_TEL,
    MSG_REQUIRED,
} from '../../constants';

export default yup.object({
    first_name: yup
        .string()
        .required(MSG_REQUIRED)
        .min(3, MSG_REQUIRED),
    second_name: yup
        .string()
        .required(MSG_REQUIRED)
        .min(3, MSG_REQUIRED),
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
    email: yup
        .string()
        .email(MSG_MAIL)
        .required(MSG_REQUIRED),
    phone: yup
        .string()
        .min(7, MSG_TEL)
        .matches(new RegExp(REGEX_TEL), {
            excludeEmptyString: true,
            message: MSG_TEL,
        }),
});