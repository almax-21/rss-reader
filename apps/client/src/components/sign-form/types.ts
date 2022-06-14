import { ObjectSchema } from 'yup';

import { SIGN_FORM } from '@/schemas/types';

export enum SIGN_FORM_TYPES {
	SIGN_IN = 'SIGN_IN',
	SIGN_UP = 'SIGN_UP',
}

export type SignFormType = typeof SIGN_FORM_TYPES[keyof typeof SIGN_FORM_TYPES];

export interface SignFormValues {
	[SIGN_FORM.USERNAME]: string;
	[SIGN_FORM.PASSWORD]: string;
	[SIGN_FORM.PASSWORD_CONFIRMATION]?: string;
}

export interface SignFormProps {
	type: SignFormType;
	initialValues: SignFormValues;
	validationSchema: ObjectSchema<any>;
	isLoading: boolean;
	handleSubmit: (values: SignFormValues) => void;
	apiError: string;
}
