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

export function transformRgbToArray (rgb: string): number[] {
	const rgbArray = rgb.replace(/[^\d,]/g, '').split(',').map(Number)
	if (rgbArray.length !== 3) {
		throw new Error('Invalid RGB format')
	}
	return rgbArray
}

export function intToPercentage(value: number): string {
	const percentage = value * 100
	return percentage.toFixed(2) + '%'
}

export function getProbabilityColor(value: number): string {
	const percentage = value * 100
	if (percentage >= 80) {
		return 'positive'
	} else if (percentage >= 30) {
		return 'warning'
	} else {
		return 'negative'
	}
}

export { ShowDialog }
