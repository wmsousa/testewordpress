import ctEvents from 'ct-events'
import { select, useSelect } from '@wordpress/data'
import {
	updateVariableInStyleTags,
	overrideStylesWithAst,
} from 'customizer-sync-helpers'
import { getValueFromInput } from 'blocksy-options'
import { gutenbergVariables } from './variables'

let oldFn = wp.data.dispatch('core/edit-post')
	.__experimentalSetPreviewDeviceType

let oldFnToggleFeature = wp.data.dispatch('core/edit-post').toggleFeature

const performSelectorsReplace = () => {
	;[...document.querySelectorAll('style')].map((style) => {
		if (style.innerText.indexOf('narrow-container-max-width') === -1) {
			return
		}

		style.innerText = style.innerText.replace(
			/\.editor-styles-wrapper \.edit-post-visual-editor__content-area \> div/g,
			'.edit-post-visual-editor__content-area > div'
		)

		style.innerText = style.innerText.replace(
			'.editor-styles-wrapperroot',
			':root'
		)
	})

	const maybeIframe = document.querySelector(
		'.edit-post-visual-editor__content-area iframe'
	)

	if (maybeIframe) {
		;[...maybeIframe.contentDocument.querySelectorAll('style')].map(
			(style) => {
				style.innerHTML = style.innerHTML.replace(
					/\.editor-styles-wrapper \.edit-post-visual-editor__content-area \> div/g,
					':root'
				)

				style.innerHTML = style.innerHTML.replace(
					/\.edit-post-visual-editor__content-area \> div/g,
					':root'
				)

				style.innerHTML = style.innerHTML.replace(
					'.editor-styles-wrapperroot',
					':root'
				)
			}
		)
	}
}

if (oldFn) {
	setTimeout(() => {
		performSelectorsReplace()
	}, 1000)

	wp.data.dispatch('core/edit-post').__experimentalSetPreviewDeviceType = (
		...args
	) => {
		oldFn(...args)
		setTimeout(() => {
			overrideStylesWithAst()
			performSelectorsReplace()
		})
	}

	wp.data.dispatch('core/edit-post').toggleFeature = (...args) => {
		oldFnToggleFeature(...args)

		setTimeout(() => {
			const themeStyles = select('core/edit-post').isFeatureActive(
				'themeStyles'
			)

			document.body.classList.remove('ct-theme-editor-styles')

			if (themeStyles) {
				document.body.classList.add('ct-theme-editor-styles')
			}
		})
	}
}

const unsubscribe = wp.data.subscribe(() => {
	const themeStyles = select('core/edit-post').isFeatureActive('themeStyles')

	document.body.classList.remove('ct-theme-editor-styles')

	if (themeStyles) {
		document.body.classList.add('ct-theme-editor-styles')
	}

	unsubscribe()
})

const syncContentBlocks = ({ atts }) => {
	let page_structure_type = atts.content_block_structure || 'type-4'

	document.body.classList.remove('ct-structure-narrow', 'ct-structure-normal')

	if (atts.has_content_block_structure !== 'yes') {
		document.body.classList.add(`ct-structure-normal`)
		return
	}

	document.body.classList.add(
		`ct-structure-${page_structure_type === 'type-4' ? 'normal' : 'narrow'}`
	)
}

export const mountSync = (atts = {}) => {
	atts = {
		...(select('core/editor').getEditedPostAttribute('blocksy_meta') || {}),
		...atts,
	}

	if (document.body.classList.contains('post-type-ct_content_block')) {
		syncContentBlocks({ atts })
		return
	}

	let page_structure_type = atts.page_structure_type || 'default'

	if (page_structure_type === 'default') {
		page_structure_type = ct_editor_localizations.default_page_structure
	}

	document.body.classList.remove('ct-structure-narrow', 'ct-structure-normal')

	document.body.classList.add(
		`ct-structure-${page_structure_type === 'type-4' ? 'normal' : 'narrow'}`
	)
}

export const handleMetaboxValueChange = (optionId, optionValue) => {
	if (
		optionId === 'page_structure_type' ||
		optionId === 'has_content_block_structure' ||
		optionId === 'content_block_structure'
	) {
		mountSync({
			[optionId]: optionValue,
		})
	}

	const atts = {
		...getValueFromInput(
			ct_editor_localizations.post_options,
			wp.data
				.select('core/editor')
				.getEditedPostAttribute('blocksy_meta') || {}
		),
		[optionId]: optionValue,
	}

	if (gutenbergVariables[optionId]) {
		updateVariableInStyleTags({
			variableDescriptor: Array.isArray(gutenbergVariables[optionId])
				? gutenbergVariables[optionId]
				: [gutenbergVariables[optionId]],

			value: optionValue,
			fullValue: atts,
			tabletMQ: '(max-width: 800px)',
			mobileMQ: '(max-width: 370px)',
		})

		performSelectorsReplace()
	}
}
