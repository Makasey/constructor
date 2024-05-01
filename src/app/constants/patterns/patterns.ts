export const EQUALS_PATTERN = new RegExp("^.*(eq\\(([\u0020-\u007E]+)\\).*)$");

export const GREATER_OR_EQUAL_PATTERN = new RegExp("^.*(gte\\(([a-zA-Z0-9,-:]+)\\).*)$");

export const LESS_OR_EQUAL_PATTERN = new RegExp("^.*(lte\\(([a-zA-Z0-9,-:]+)\\).*)$");

export const PHONE_PATTERN = "\\+[0-9]{3} {0,1}[0-9]{2} {0,1}[0-9]{3} {0,1}[0-9]{2} {0,1}[0-9]{2}";

export const EMAIL_PATTERN = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";
