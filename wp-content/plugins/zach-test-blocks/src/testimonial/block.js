/**
 * BLOCK: zach-test-blocks
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */

//  Import CSS.
import './style.scss';
import './editor.scss';

const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerBlockType, RichText } = wp.blocks; // Import registerBlockType() from wp.blocks

/**
 * Register: aa Gutenberg Block.
 *
 * Registers a new block provided a unique name and an object defining its
 * behavior. Once registered, the block is made editor as an option to any
 * editor interface where blocks are implemented.
 *
 * @link https://wordpress.org/gutenberg/handbook/block-api/
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */
registerBlockType( 'zach-test-blocks/testimonial', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __( 'TESTimonial Block' ), // Block title.
	icon: 'shield', // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: 'common', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	keywords: [
		__( 'zach-test-blocks — CGB Block' ),
		__( 'CGB Example' ),
		__( 'create-guten-block' ),
	],
	attributes: {
		quote: {
			type: 'array',
			source: 'children',
			selector: 'testimonial-quote'
		},
		name: {
			type: 'array',
			source: 'children',
			selector: 'testimonial-name'
		},
		title: {
			type: 'array',
			source: 'children',
			selector: 'testimonial-title'
		},
	},

	/**
	 * The edit function describes the structure of your block in the context of the editor.
	 * This represents what the editor will render when the block is used.
	 *
	 * The "edit" property must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 */
	edit: props => {
		const { attributes: { quote, name, title }, className, setAttributes } = props;
		const onChangeQuote = quote => { setAttributes( { quote } ) };
		const onChangeName = name => { setAttributes( { name } ) };
		const onChangeTitle = title => { setAttributes( { title } ) };

		return (
			<div className={ className }>
				<RichText
					tagName="div"
					multiline="p"
					placeholder={ __ ( 'Put the quote here' ) }
					onChange={ onChangeQuote }
					value={ quote }
				/>
				<RichText
					tagName="h2"
					placeholder={ __ ( 'name' ) }
					onChange={ onChangeName }
					value={ name }
				/>
				<RichText
					tagName="h3"
					placeholder={ __ ( 'title' ) }
					onChange={ onChangeTitle }
					value={ title }
				/>
			</div>
		);
	},

	/**
	 * The save function defines the way in which the different attributes should be combined
	 * into the final markup, which is then serialized by Gutenberg into post_content.
	 *
	 * The "save" property must be specified and must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 */
	save: props => {
		const { attributes: { quote, name, title }, className, setAttributes } = props;
		return (
			<div>
				<div>
					{ quote }
				</div>
				<div>
					{ name }
				</div>
				<div>
					{ title }
				</div>
			</div>
		);
	},
} );
