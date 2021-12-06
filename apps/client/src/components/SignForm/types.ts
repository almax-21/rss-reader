import { SIGN_FORM } from '../../schemas/types';

export interface SignInFormValues {
	[SIGN_FORM.USERNAME]: string;
	[SIGN_FORM.PASSWORD]: string;
}

export interface SignUpFormValues extends SignInFormValues {
	[SIGN_FORM.PASSWORD_CONFIRMATION]: string;
}
