import React, { PropTypes } from 'react';
import WCCSettingsStep from './settings-step';
import notices from 'notices';
import GlobalNotices from 'components/global-notices';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as FormActions from 'state/form/actions';
import { successNotice, errorNotice } from 'state/notices/actions';
import * as FormValueActions from 'state/form/values/actions';
import * as PackagesActions from 'state/form/packages/actions';
import { getFormErrors } from 'state/selectors';
import { translate as __ } from 'lib/mixins/i18n';
import FormButton from 'components/forms/form-button';
import FormButtonsBar from 'components/forms/form-buttons-bar';

const WCCSettingsForm = ( props ) => {
	const currentStep = props.form.currentStep;
	const currentStepLayout = props.layout[ currentStep ];

	const renderCurrentStep = () => {
		if ( ! currentStepLayout ) {
			return <span>...</span>;
		}

		return (
			<WCCSettingsStep
				{ ...props }
				layout={ currentStepLayout }
			/>
		);
	};

	const renderActionButton = () => {
		// TODO: extend <SaveForm> and use it in place of this
		const label = ( currentStepLayout || {} ).action_label || __( 'Next' );
		return (
			<FormButtonsBar>
				<FormButton type="button" onClick={ props.formActions.nextStep }>
					{ label }
				</FormButton>
			</FormButtonsBar>
		)
	};

	const renderMultiStepForm = () => {
		return (
			<div>
				<div>
					{ props.layout.map( ( step, idx ) => (
						<span key={ idx }>
							{ step.tab_title }
						</span>
					) ) }
				</div>
				{ renderCurrentStep() }
				{ renderActionButton() }
			</div>
		);
	};

	return (
		<div>
			<GlobalNotices id="notices" notices={ notices.list } />
			{ 'step' === props.layout[ 0 ].type
				? renderMultiStepForm()
				: <WCCSettingsStep
					{ ...props }
					layout={ { items: props.layout } }
					/>
			}
		</div>
	);
};

WCCSettingsForm.propTypes = {
	storeOptions: PropTypes.object.isRequired,
	schema: PropTypes.object.isRequired,
	layout: PropTypes.array.isRequired,
};

function mapStateToProps( state, props ) {
	return {
		form: state.form,
		errors: getFormErrors( state, props ),
	};
}

function mapDispatchToProps( dispatch ) {
	return {
		formActions: bindActionCreators( FormActions, dispatch ),
		noticeActions: bindActionCreators( { successNotice, errorNotice }, dispatch ),
		packagesActions: bindActionCreators( PackagesActions, dispatch ),
		formValueActions: bindActionCreators( FormValueActions, dispatch ),
	};
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)( WCCSettingsForm );
