import { Dialog } from 'quasar'
import ConfirmPopUp from './components/ConfirmPopUp.vue'

class ShowDialog {
	static showConfirm = (title: string, message: string, color?: string): Promise<boolean> => {
		return new Promise((resolve) => {
			Dialog.create({
				component: ConfirmPopUp,

				componentProps: {
					title,
					message,
					color
				}
			}).onOk(() => {
				resolve(true)
			}).onCancel(() => {
				resolve(false)
			})
		})
	}
}

export function isValidNumber(value: string): boolean {
	return /^[0-9]+$/.test(value)
}

export { ShowDialog }
