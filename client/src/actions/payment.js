import axios from 'axios';
import { PAYMENT_SUCCESS, UPDATE_NEURONS, PAYMENT_ERROR } from './types';

export const handlePayment = (
	token,
	amountInUSDCents,
	chargeDescription,
	neuronsInBillionsToAdd
) => async dispatch => {
	const paymentInfo = {
		token: token,
		amountInUSDCents: amountInUSDCents,
		chargeDescription: chargeDescription,
		neuronsInBillionsToAdd: neuronsInBillionsToAdd
	};
	const response = await axios.post('api/stripe', paymentInfo);

	if (response.status === 200) {
		dispatch({ type: PAYMENT_SUCCESS });
		if (neuronsInBillionsToAdd === 88888888) {
			dispatch({
				type: UPDATE_NEURONS,
				neuronsInBillionsToAdd: neuronsInBillionsToAdd,
				infinityStatus: true
			});
		} else {
			dispatch({
				type: UPDATE_NEURONS,
				neuronsInBillionsToAdd: neuronsInBillionsToAdd,
				infinityStatus: false
			});
		}
	} else {
		dispatch({ type: PAYMENT_ERROR });
	}
};
