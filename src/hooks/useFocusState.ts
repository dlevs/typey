import { useState } from 'react'

const useFocusState = () => {
	const [focused, setFocused] = useState(false)

	return {
		focused,
		onFocus: () => setFocused(true),
		onBlur: () => setFocused(false)
	}
}

export default useFocusState
