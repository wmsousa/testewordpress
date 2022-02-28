import { createElement, Component } from '@wordpress/element'
import classnames from 'classnames'
import { normalizeCondition, matchValuesWithCondition } from 'match-conditions'

const RadioInput = (props) => {
	const { inline = false } = props.option

	return (
		<div
			className="ct-radio-option"
			{...(inline ? { ['data-inline']: '' } : {})}
			{...(props.option.attr || {})}>
			{Object.keys(props.option.choices).map((choice) => (
				<label key={choice}>
					<input
						type="radio"
						checked={choice === props.value}
						onChange={() => props.onChange(choice)}
					/>

					{props.option.choices[choice]}
				</label>
			))}
		</div>
	)
}

const DefaultRadio = ({
	option,
	values,
	value,
	onChange,
	singleChoiceProps,
}) => {
	const { inline = false } = option

	return (
		<ul
			className="ct-radio-option ct-buttons-group"
			{...(inline ? { ['data-inline']: '' } : {})}
			{...(option.attr || {})}>
			{Object.keys(option.choices)
				.filter((choice) => {
					if (!option.conditions) {
						return true
					}

					if (!option.conditions[choice]) {
						return true
					}

					return matchValuesWithCondition(
						normalizeCondition(option.conditions[choice]),
						values
					)
				})
				.map((choice, index) => (
					<li
						className={classnames({
							active: choice === value,
						})}
						onClick={() => onChange(choice)}
						key={choice}
						dangerouslySetInnerHTML={{
							__html: option.choices[choice],
						}}
						{...(singleChoiceProps
							? singleChoiceProps(choice)
							: {})}
					/>
				))}
		</ul>
	)
}

const Radio = (props) => {
	const {
		option: { view },
	} = props

	if (view === 'radio') {
		return <RadioInput {...props} />
	}

	return <DefaultRadio {...props} />
}

export default Radio
