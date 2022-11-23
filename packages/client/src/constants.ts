// URLS
export const URL_API = 'https://ya-praktikum.tech/api/v2'

// PATH
export const PATH_SIGNUP = '/auth/signup'
export const PATH_LOGIN = '/auth/signin'
export const PATH_LOGOUT = '/auth/logout'
export const PATH_GET_AVATAR = '/resources'
export const PATH_GET_USER = '/auth/user'
export const PATH_AVATAR = '/user/profile/avatar'
export const PATH_UPDATE_PROFILE = '/user/profile'
export const PATH_GET_PROFILE = '/user'
export const PATH_GET_SERVICE_ID = '/oauth/yandex/service-id'
export const PATH_LOGIN_YANDEX = '/oauth/yandex'

// REGEX
export const REGEX_LOGIN = '^[-A-Za-z0-9_-]{3,16}$'
export const REGEX_PASSWORD = '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,40}$'
export const REGEX_TEL = '(\\+?[0-9])\\s?\\(?[0-9]{3}\\)?\\s?[0-9]{7}$'

// ERROR MESSAGE
export const MSG_PASSWORD = 'Добавьте заглавную букву или цифру'
export const MSG_TEL = 'Поле в формате: +79996431241'
export const MSG_LOGIN = 'Англ. буквы, от 3 до 16 символов'
export const MSG_MAIL = 'Поле в формате email. Пример: contact@org.ru'
export const MSG_REQUIRED = 'Обязательно поле'
